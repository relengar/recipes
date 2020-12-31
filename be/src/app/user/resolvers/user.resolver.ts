import { AuthService } from "../../core/services/auth.service";
import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { UserService } from "../services/user.service";
import { User } from "./../models/user.model";

@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Query(() => User)
  async user(@Arg("id", () => ID) id: string) {
    return this.userService.getById(id);
  }

  @Query(() => [User])
  async users(@Ctx() context: any) {
    return this.userService.getUsers(context);
  }

  @Authorized()
  @Query(() => User)
  async currentUser(@Ctx() context: any) {
    return context.user;
  }

  @Authorized()
  @Query(() => [User])
  async myConnections(@Ctx() context: any) {
    return this.userService.getMyConnections(context.user.id);
  }

  @Mutation(() => User)
  async createUser(
    @Arg("name", () => String) name: string,
    @Arg("password", () => String) password: string,
    @Ctx() ctx: any
  ) {
    return this.userService.createUser(ctx, { name, password });
  }

  @Mutation(() => User)
  async logIn(
    @Arg("name", () => String) name: string,
    @Arg("password", () => String) password: string,
    @Ctx() ctx: any
  ): Promise<User> {
    return this.authService.logIn(ctx, name, password);
  }

  @Mutation(() => Boolean)
  async logOut(@Ctx() ctx: any): Promise<boolean> {
    return this.authService.logOut(ctx);
  }

  @Mutation(() => Boolean)
  async addFriend(
    @Arg("userId", () => String) userId: string,
    @Ctx() context: any
  ) {
    return this.userService.addFriend(userId, context.user);
  }

  @Mutation(() => Boolean)
  async removeFriend(
    @Arg("userId", () => String) userId: string,
    @Ctx() context: any
  ) {
    return this.userService.removeFriend(userId, context.user);
  }
}
