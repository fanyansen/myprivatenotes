import { AppDataSource } from "./data-source";
import express from "express";
import { CONST } from "./constants/strings";
// import { User } from "./entity/User"
import cors from "cors";
import morgan from "morgan";

import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";

import { MyContext, UserResolver } from "./graphql/UserResolver";

import { buildSchema } from "type-graphql";
import { verify } from "jsonwebtoken";
import { User } from "./entity/User";
import { generateAccessToken, sendRefreshToken } from "./helpers/generateToken";
import cookieParser from "cookie-parser";

const LOCAL_PLAYGROUND = () =>
  ApolloServerPluginLandingPageGraphQLPlayground({
    settings: {
      "request.credentials": "same-origin", // to make cookie can be settable in browser storage
      "schema.polling.enable": false, // to stop repeatly fetch introspection query
    },
  });

const PRODUCTION_LANDING_PAGE = ApolloServerPluginLandingPageProductionDefault;

const RENDER_LOCAL =
  process.env.NODE_ENV === "production"
    ? PRODUCTION_LANDING_PAGE
    : LOCAL_PLAYGROUND;

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    // Express Middlewares
    app.use(
      cors({
        origin: ["http://localhost:3000", "http://localhost:3003"],
        credentials: true,
      })
    );
    app.use(cookieParser());
    app.use(morgan("dev"));

    app.get("/", (_req, res) => {
      res.send("Hello World");
    });

    app.post("/refresh-token", async (req, res) => {
      const token = req.cookies[CONST.JWT_COOKIE];
      // const failedRes = res.send({ success: false, access_token: "" });
      const sendTokenReq = (access_token: string) =>
        res.send({ success: false, access_token });

      if (!token) {
        return sendTokenReq("");
      }

      try {
        const data: any = verify(token, CONST.REFRESH_TOKEN_SECRET);
        const user = await User.findOne({ where: { id: data.userId } });
        if (!user) {
          return sendTokenReq("");
        }

        if (user.token_version !== data.tokenVersion) {
          return sendTokenReq("");
        }

        const access_token = generateAccessToken(user);
        sendRefreshToken(res, generateAccessToken(user));

        // return res.send({ success: false, access_token });
        return sendTokenReq(access_token);
      } catch (error) {
        return sendTokenReq("");
      }

      // if (user.token_version !== data.tokenVersion) {
      //   return res.send({ success: false, access_token: "" });
      // }
    });

    const apolloServer = new ApolloServer({
      // typeDefs: gql`
      //   type Query {
      //     hello: String!
      //   }
      // `,
      // resolvers: {
      //   Query: {
      //     hello: () => "HELLO WORLD",
      //   },
      // },

      schema: await buildSchema({
        resolvers: [UserResolver],
      }),
      context: ({ req, res }: MyContext): MyContext => ({ req, res }),
      introspection: process.env.NODE_ENV !== "production",

      plugins: [RENDER_LOCAL],
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(CONST.PORT, () =>
      console.log(`Server running on http://localhost:${CONST.PORT}/graphql`)
    );
  })
  .catch((error) => console.log(error));
