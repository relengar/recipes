import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { ApolloError } from "apollo-server-koa";
import { Context } from "koa";
import { Service } from "typedi";
import { User, userModel } from "../../user/models/user.model";

@Service()
export class AuthService {
  private privKey = this.processKey(process.env.JWT_PRIV_KEY);
  private pubKey = this.processKey(process.env.JWT_PUB_KEY);
  private algorithm = process.env.JWT_ALG as jwt.Algorithm;
  private authCookieName = "uid";

  public authenticate(ctx: Context): User {
    const token = ctx?.cookies.get(this.authCookieName);
    if (!token) {
      return null;
    }
    const algorithm = this.algorithm;
    const user = jwt.verify(token, this.pubKey, { algorithms: [algorithm] });
    return user as User;
  }

  public authenticateWebsocket(socket: any) {
    const cookies: string[] = socket.request.headers.cookie.split(";");
    const tokenArr = cookies.filter((c) =>
      c.trim().startsWith(`${this.authCookieName}=`)
    );
    if (!tokenArr.length) {
      return null;
    }
    const token = tokenArr.pop().split("=").pop();
    const algorithm = this.algorithm;
    const user = jwt.verify(token, this.pubKey, { algorithms: [algorithm] });
    return user as User;
  }

  public async logIn(
    { ctx }: Context,
    username: string,
    password: string
  ): Promise<any> {
    const user = await userModel.findOne({ name: username });
    if (!user) {
      throw new ApolloError("User not found", "404");
    }

    await this.checkPassword(password, user.password);

    const token = this.makeToken(user);
    this.setTokenCookie(ctx, token);
    return user;
  }

  public logOut({ ctx }: Context): boolean {
    ctx.cookies.set(this.authCookieName, "", {
      expires: new Date(),
      httpOnly: true,
      path: "/",
      signed: true,
    });
    return true;
  }

  public async register(
    { ctx }: Context,
    userData: Partial<User>
  ): Promise<any> {
    const existingUser = await userModel.findOne({
      name: userData.name,
    });
    if (existingUser) {
      throw new ApolloError("User already exists", "409");
    }
    const hash = await this.hashPassword(userData.password);
    const user: User = await userModel.create({
      ...userData,
      password: hash,
    });
    const token = this.makeToken(user);
    this.setTokenCookie(ctx, token);
    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private async checkPassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    const isValid = await bcrypt.compare(password, hash);
    if (!isValid) {
      throw new ApolloError("Invalid password", "401");
    }
    return isValid;
  }

  private makeToken(data: any): string {
    const algorithm = this.algorithm;
    return jwt.sign({ ...data.toObject(), id: data._id }, this.privKey, {
      algorithm,
      expiresIn: 64000 * 1000 * 7,
    });
  }

  private processKey(key: string): string {
    const beginKey = "KEY-----";
    const endKey = "-----END";
    return key
      .replace(/\n/g, "")
      .replace(beginKey, `${beginKey}\n`)
      .replace(endKey, `\n${endKey}`);
  }

  private setTokenCookie(ctx: Context, token: string): void {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    ctx.cookies.set(this.authCookieName, token, {
      expires,
      httpOnly: true,
      path: "/",
      signed: true,
    });
  }
}
