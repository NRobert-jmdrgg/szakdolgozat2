import { gql } from "graphql-tag";
export default ;
const post = gql `
  type Post {
    postId: ID!
    dateCreated: Date!
    likesCount: Int!
    sharesCount: Int!
    text: String
    imagePaths: [String]
    mentions: [String]
    hashtags: [String]
    categories: [String]
    shares: Post
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

  extend type Query {
    getPost(postId: String!): Post
  }

  extend type Mutation {
    createPost(text: String): Post
  }
`;
