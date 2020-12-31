import { ApolloError } from "apollo-server-koa";
import { AuthService } from "../../core/services/auth.service";
import { Service } from "typedi";
import { User, userModel } from "../models/user.model";
import { DocumentType } from "@typegoose/typegoose";

@Service()
export class UserService {
  constructor(private authService: AuthService) {}

  /**
   * getById
   * @param id an valid mongo db uuid
   */
  public async getById(id: string): Promise<User> {
    return userModel.findById(id);
  }

  /**
   * createUser
   * @param user dto for new user
   */
  public async createUser(ctx: any, user: Partial<User>): Promise<any> {
    return this.authService.register(ctx, user);
  }

  /**
   * getMyConnections
   *  @param userId: string
   */
  public async getMyConnections(userId: string): Promise<Partial<User>[]> {
    const me = await userModel
      .findById(userId)
      .populate("friends", ["name", "id"]);
    return me.friends;
  }

  /**
   * getUsers
   */
  public async getUsers(context: any): Promise<DocumentType<User>[]> {
    const users = await userModel.find().populate("friends", ["name", "id"]);
    return context.user
      ? users.filter(({ id }) => id !== context.user.id)
      : users;
  }

  public async addFriend(
    userId: string,
    user: Partial<User>
  ): Promise<boolean> {
    if (userId === user.id) {
      throw new ApolloError("Can't connect to your self", "400");
    }
    const [me, friend] = await Promise.all([
      userModel.findById(user?.id),
      userModel.findById(userId),
    ]);

    const exists = me.friends.some((id) => id.toString() === userId.toString());

    let error: ApolloError;
    error = (!user || !me) && new ApolloError("Unauthorized", "403");
    error =
      !friend && new ApolloError(`No user found with id ${userId}`, "400");
    error =
      exists && new ApolloError(`Already connected to user ${userId}`, "400");
    if (error) {
      throw error;
    }

    me.friends = [...me.friends, friend];
    await me.save();
    return true;
  }

  /**
   * removeFriend
   */
  public async removeFriend(userId: string, user: Partial<User>) {
    const [me, friend] = await Promise.all([
      userModel.findById(user?.id),
      userModel.findById(userId),
    ]);

    let error: ApolloError;
    error = (!user || !me) && new ApolloError("Unauthorized", "403");
    error =
      !friend && new ApolloError(`No user found with id ${userId}`, "400");
    if (error) {
      throw error;
    }

    me.friends = me.friends.filter((id) => id.toString() !== userId.toString());
    await me.save();
    return true;
  }
}
