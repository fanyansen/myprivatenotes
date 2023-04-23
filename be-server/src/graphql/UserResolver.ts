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
} from "type-graphql";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helpers/generateToken";
import { Request, Response } from "express";
import { CONST } from "../constants/strings";

export interface MyContext {
  req: Request;
  res: Response;
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
    } catch (error: any) {
      throw new Error(error);
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

      res.cookie(CONST.JWT_COOKIE, refreshToken, {
        httpOnly: true,
      });

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
