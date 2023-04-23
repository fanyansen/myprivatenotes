import { AppDataSource } from "./data-source";
import express from "express";
import { CONST } from "./constants/strings";
// import { User } from "./entity/User"
import cors from "cors";
import morgan from "morgan";

import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServerPluginLandingPageProductionDefault } from "apollo-server-core";

import { MyContext, UserResolver } from "./graphql/UserResolver";

import { buildSchema } from "type-graphql";

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
    app.use(cors());
    app.use(morgan("dev"));

    app.get("/", (_req, res) => {
      res.send("Hello World");
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
      context: ({ req, res }): MyContext => ({ req, res }),
      introspection: process.env.NODE_ENV !== "production",

      plugins: [RENDER_LOCAL],
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    app.listen(CONST.PORT, () =>
      console.log(`Server running on http://localhost:${CONST.PORT}/graphql`)
    );
  })
  .catch((error) => console.log(error));
