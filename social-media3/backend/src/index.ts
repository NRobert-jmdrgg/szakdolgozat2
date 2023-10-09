import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import { gql } from "graphql-tag";
import { Neo4jGraphQL } from "@neo4j/graphql";
import { driver } from "./db.js";

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    bookByAuthor(author: String!): [Book]
  }
`;

const resolvers = {
  Query: {
    bookByAuthor: async (_, args) => {
      const { author } = args;
      console.log(author);
      const session = driver.session();
      const result = await session.run(
        "MATCH(b:Book {author: $authorParam}) RETURN b",
        {
          authorParam: author,
        }
      );

      await session.close();

      return result.records;
    },
  },
};

const neoSchema = new Neo4jGraphQL({
  driver,
  typeDefs,
  resolvers,
  features: {
    subscriptions: true,
  },
});

async function main() {
  const app = express();
  const httpServer = createServer(app);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
  const schema = await neoSchema.getSchema();
  const serverCleanup = useServer(
    {
      schema,
      context: (ctx) => {
        return ctx;
      },
    },
    wsServer
  );

  const server = new ApolloServer({
    schema,
    status400ForVariableCoercionErrors: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({
        httpServer,
      }),
      {
        async serverWillStart() {
          return Promise.resolve({
            async drainServer() {
              await serverCleanup.dispose();
            },
          });
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ req }),
    })
  );

  const port = process.env.PORT as string;
  httpServer.listen(port, () => {
    console.log(`Server is now running on http://localhost:${port}/graphql`);
  });
}

main();
