import { compare, hash } from "bcrypt";
import { User } from "../entity/User";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
} from "../helpers/generateToken";
import { Request, Response } from "express";
import { AppDataSource } from "../lib/dataSource";
import { isAuth } from "../helpers/isAuth";
import { JwtPayload } from "jsonwebtoken";
import { CONST } from "../constants/strings";
// import { getConnection } from "typeorm";
// import { JwtPayload } from "jsonwebtoken";

export interface TokenPayload extends JwtPayload {
  userId: string;
  tokenVersion?: number;
}

export interface MyContext {
  req: Request;
  res: Response;
  tokenPayload?: TokenPayload;
}

@ObjectType()
class LoginResponse {
  @Field(() => String)
  access_token: string;

  @Field(() => String)
  refresh_token: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "Hello WORLD11";
  }

  @Query(() => [User])
  @UseMiddleware(isAuth)
  async listUser() {
    return User.find({});
  }

  @Query(() => User)
  @UseMiddleware(isAuth)
  async me(@Ctx() ctx: MyContext) {
    const payload = ctx.tokenPayload;
    if (!payload) return null;
    try {
      const user = await User.findOne({ where: { id: payload.userId } });
      return user;
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => Boolean)
  async signUp(@Arg("email") email: string, @Arg("password") password: string) {
    try {
      const findUser = await User.findOne({ where: { email } });
      if (findUser) throw new Error("User with that email is already exist");

      await User.insert({
        email,
        password: await hash(password, 12),
        username: email.split("@")[0],
      });

      return true;
    } catch (error) {
      const catchError = error as Error;
      throw new Error(catchError.message);
    }
  }

  @Mutation(() => LoginResponse!)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ) {
    try {
      const findUser = await User.findOne({ where: { email } });
      if (!findUser) throw new Error("User with that email is doesn't exist");

      const isPasswordValid = await compare(password, findUser!.password); // Non-null Assertion Operator
      if (!isPasswordValid) throw new Error("Password is invalid");

      const accessToken = generateAccessToken(findUser);
      const refreshToken = generateRefreshToken(findUser);

      sendRefreshToken(res, refreshToken);

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error) {
      const catchError = error as Error;
      throw new Error(catchError.message);
    }
  }

  @Mutation(() => Boolean)
  async revokeUserSession(@Arg("userId") userId: string) {
    // await getConnection().getRepository(User).increment(
    //   { id: userId! },
    //   "token_version", // one of user column
    //   1
    // );
    await AppDataSource.getRepository(User).increment(
      { id: userId! },
      "token_version", // one of user column
      1
    );
    return true;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext) {
    ctx.res.clearCookie(CONST.JWT_COOKIE);
    return true;
  }
}
