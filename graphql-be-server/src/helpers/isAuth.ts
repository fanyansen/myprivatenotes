import { verify } from "jsonwebtoken";
import { CONST } from "../constants/strings";
import { MiddlewareFn } from "type-graphql";
import { MyContext, TokenPayload } from "../graphql/UserResolver";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  try {
    const bearer = context.req.headers["authorization"];
    const token = bearer!.split(" ")[1];

    if (!token) throw new Error("Not Authenticated");

    const tokenPayload = verify(token, CONST.ACCESS_TOKEN_SECRET);
    if (!tokenPayload) throw new Error("Not Authenticated");

    context.tokenPayload = tokenPayload as TokenPayload;
  } catch (error) {
    throw new Error("Not Authenticated");
  }

  return next();
};
