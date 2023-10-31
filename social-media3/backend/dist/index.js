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
    followerCount: Int
      @cypher(
        statement: """
        MATCH (this)<-[:FOLLOWS]-()
        RETURN count(*) as followerCount
        """
        columnName: "followerCount"
      )
    posts: [Post!]! @relationship(type: "AUTHOR_OF", direction: OUT)
    postCount: Int
      @cypher(
        statement: """
        MATCH (this)-[:AUTHOR_OF]->()
        RETURN count(*) as postCount
        """
        columnName: "postCount"
      )
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
    visitedUsers: [User!]!
      @relationship(
        type: "VISITS"
        properties: "VisitedUsersProps"
        direction: OUT
      )
    visitedBy: [User!]!
      @relationship(
        type: "VISITS"
        properties: "VisitedUsersProps"
        direction: IN
      )
    viewedPost: [Post!]!
      @relationship(
        type: "VIEWS"
        properties: "ViewedPostProps"
        direction: OUT
      )
    sharedPost: [Post!]!
      @relationship(
        type: "SHARES"
        properties: "SharedPostProps"
        direction: OUT
      )
  }

  type Post {
    postId: ID! @id @unique
    author: User! @relationship(type: "AUTHOR_OF", direction: IN)
    createdAt: DateTime! @timestamp(operations: [CREATE])
    text: String
    imagePaths: [String!]
    mentions: [String!]
    links: [Link!]! @relationship(type: "CONTAINS", direction: OUT)
    hashtags: [Hashtag!]! @relationship(type: "CONTAINS", direction: OUT)
    categories: [PostCategory!]
    likeCount: Int
      @cypher(
        statement: """
        MATCH (this)<-[:LIKES]-()
          RETURN count(*) as likeCount
        """
        columnName: "likeCount"
      )
    replyCount: Int
      @cypher(
        statement: """
        MATCH (this)<-[:REPLIES_TO]-()
          RETURN count(*) as replyCount
        """
        columnName: "replyCount"
      )
    shareCount: Int
      @cypher(
        statement: """
        MATCH (this)<-[:SHARES]-()
        MATCH (this)<-[:QUOTES]-()
          RETURN count(*) as shareCount
        """
        columnName: "shareCount"
      )
    likedBy: [User!]!
      @relationship(type: "LIKES", properties: "LikedPostsProps", direction: IN)
    repliesTo: [Post!]! @relationship(type: "REPLIES_TO", direction: OUT)
    replies: [Post!]! @relationship(type: "REPLIES_TO", direction: IN)
    quotes: [Post!]! @relationship(type: "QUOTES", direction: OUT)
    quotedBy: [Post!]! @relationship(type: "QUOTES", direction: IN)
    viewedBy: [User!]!
      @relationship(
        type: "VIEWED"
        properties: "ViewedPostProps"
        direction: OUT
      )
    sharedBy: [User!]!
      @relationship(
        type: "SHARES"
        properties: "SharedPostProps"
        direction: IN
      )
  }

  type Link {
    url: String!
    post: [Post!]! @relationship(type: "CONTAINS", direction: IN)
  }

  type Hashtag {
    tag: String!
    post: [Post!]! @relationship(type: "CONTAINS", direction: IN)
  }

  interface SharedPostProps @relationshipProperties {
    createdAt: DateTime! @timestamp(operations: [CREATE])
  }

  interface ViewedPostProps @relationshipProperties {
    createdAt: DateTime! @timestamp(operations: [CREATE])
    updatedAt: DateTime! @timestamp(operations: [UPDATE])
    times: Int!
  }

  interface VisitedUsersProps @relationshipProperties {
    createdAt: DateTime! @timestamp(operations: [CREATE])
    updatedAt: DateTime! @timestamp(operations: [UPDATE])
    times: Int!
  }

  interface LikedPostsProps @relationshipProperties {
    createdAt: DateTime! @timestamp(operations: [CREATE])
  }

  interface FollowedUsersProps @relationshipProperties {
    createdAt: DateTime! @timestamp(operations: [CREATE])
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
    app.use("/graphql", cors({
        origin: process.env.CLIENT_URI,
        credentials: true,
    }), bodyParser.json(), expressMiddleware(server, {
        context: async ({ req }) => ({
            token: req.headers.authorization,
            driver: driver,
        }),
    }));
    const port = process.env.PORT;
    httpServer.listen(port, () => {
        console.log(`Server is now running on http://localhost:${port}/graphql`);
    });
}
main();
