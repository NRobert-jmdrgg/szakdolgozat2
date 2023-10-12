import { gql } from "graphql-tag";
export const user = gql `
  type User {
    displayName: String!
    handleName: String!
    email: String!
    emailVerified: Boolean!
    dateCreated: Date!
    followerCount: Int!
    description: String
    profileImagePath: String
    profileBannerPath: String
    follows: [User!]
    posts: [Post!]
    likedPosts: [Like!]
  }

  type Like {
    post: Post!
    dateLiked: Date!
  }

  extend type Query {
    isHandleNameTaken(handleName: String!): Boolean
    user(handleName: String!): User
    userFollowers(handleName: String!, limit: Int): [User]
    posts(handleName: String!, limit: Int): [Post]
    likedPosts(handleName): 
  }

  extend type Mutation {
    createUser(displayName: String!, handleName: String!, email: String!, description: String): User
    verifyUserEmail(displayName: String!): User
  }
`;
