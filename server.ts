import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./src/db/db";
import typeDefs from "./src/typeDefs/index";
import resolvers from "./src/resolvers/index";

async function startApolloServer(typeDefs: any, resolvers: any) {
  const app: express.Application = express();
  const httpServer: http.Server = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/",
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  
  await connectDB(`${process.env.MONGO_URI}`)
    .then((data) => {
      console.log(data);
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

startApolloServer(typeDefs, resolvers);
