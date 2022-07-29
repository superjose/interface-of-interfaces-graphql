const { gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  interface IActivity {
    id: ID!
    name: String!
    description: String
  }

  interface IMedia {
    id: ID!
    name: String!
    description: String
    type: String
    format: String
  }
  interface INews {
    id: ID!
    name: String!
    description: String
    date: String
    author: String
    content: String
  }

  type Video implements IActivity & IMedia {
    id: ID!
    name: String!
    description: String
    type: String
    format: String
    codec: String
    length: Int
  }
  type Image implements IActivity & IMedia {
    id: ID!
    name: String!
    description: String
    url: String
    type: String
    format: String
    compressed: Boolean
    codec: String
    extension: String
  }

  type Audio implements IActivity & IMedia {
    id: ID!
    name: String!
    description: String
    url: String
    type: String
    format: String
    bitrate: Boolean
  }

  type Post implements INews & IActivity {
    id: ID!
    name: String!
    description: String
    date: String
    author: String
    content: String
    comments: [Comment]
  }

  type Comment {
    author: String
    message: String
  }

  type FlashNews implements INews & IActivity {
    id: ID!
    name: String!
    description: String
    date: String
    author: String
    content: String
    rating: Int
  }

  type Query {
    activityFeed: [IActivity]
  }
`;

module.exports = typeDefs;
