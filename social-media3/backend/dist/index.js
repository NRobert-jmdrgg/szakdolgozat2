import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import { gql } from "graphql-tag";
import { Neo4jGraphQL } from "@neo4j/graphql";
import { driver } from "./db.js";
const typeDefs = gql `
  type User {
    userId: ID! @id @unique
    email: String! @unique
    createdAt: DateTime! @timestamp(operations: [CREATE])
    displayName: String
    handleName: String @unique
    description: String
    profileImage: String
    profileBannerImage: String
    posts: [Post!]!
      @relationship(type: "POSTED", properties: "PostedProps", direction: OUT)
    likedPosts: [Post!]!
      @relationship(
        type: "LIKES"
        properties: "LikedPostsProps"
        direction: OUT
      )
    followedUsers: [User!]!
      @relationship(
        type: "FOLLOWS"
        properties: "FollowedUsersProps"
        direction: OUT
      )
    followedBy: [User!]!
      @relationship(
        type: "FOLLOWS"
        properties: "FollowedUsersProps"
        direction: IN
      )
  }

  interface PostedProps @relationshipProperties {
    createdAt: DateTime! @timestamp(operations: [CREATE])
  }

  interface LikedPostsProps @relationshipProperties {
    createdAt: DateTime! @timestamp(operations: [CREATE])
  }

  interface FollowedUsersProps @relationshipProperties {
    createdAt: DateTime! @timestamp(operations: [CREATE])
  }

  type Post {
    postId: ID! @id @unique
    author: User!
      @relationship(type: "POSTED", properties: "PostedProps", direction: IN)
    text: String
    imagePaths: [String!]
    mentions: [String!]
    links: [String!]
    hashtags: [String!]
    categories: [PostCategory!]
    likedBy: [User!]!
      @relationship(type: "LIKES", properties: "LikedPostsProps", direction: IN)
    repliesTo: Post! @relationship(type: "REPLIES_TO", direction: OUT)
    replies: [Post!]! @relationship(type: "REPLIES_TO", direction: IN)
    quotes: Post! @relationship(type: "QUOTES", direction: OUT)
    quotedBy: [Post!]! @relationship(type: "QUOTES", direction: IN)
  }

  enum PostCategory {
    ARTS_AND_CULTURE
    FASHION_AND_STYLE
    LEARNING_AND_EDUCATIONAL
    SCIENCE_AND_TECHNOLOGY
    BUSINESS_AND_ENTREPRENEURS
    FILM_TV_AND_VIDEO
    MUSIC
    SPORTS
    CELEBRITY_AND_POP_CULTURE
    FITNESS_AND_HEALTH
    NEWS_AND_SOCIAL_CONCERN
    TRAVEL_AND_ADVENTURE
    DIARIES_AND_DAILY_LIFE
    FOOD_AND_DINING
    OTHER_HOBBIES
    YOUTH_AND_STUDENT_LIFE
    FAMILY
    GAMING
    RELATIONSHIPS
  }

  type Query {
    users: [User]
    posts: [Post]
  }
`;
const neoSchema = new Neo4jGraphQL({
    driver,
    typeDefs,
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
    let schema;
    try {
        schema = await neoSchema.getSchema();
    }
    catch (error) {
        console.log(error);
    }
    const serverCleanup = useServer({
        schema,
        context: (ctx) => {
            return ctx;
        },
    }, wsServer);
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
    try {
        await server.start();
    }
    catch (error) {
        console.log(error);
    }
    app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(server, {
        context: async ({ req }) => ({ req }),
    }));
    const port = process.env.PORT;
    httpServer.listen(port, () => {
        console.log(`Server is now running on http://localhost:${port}/graphql`);
    });
}
main();
