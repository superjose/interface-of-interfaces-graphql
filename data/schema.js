const { gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Location {
    lat: Float
    lng: Float
  }

  type Address {
    street: String
    suite: String
    city: String
    zipcode: String
    geo: Location
  }

  type Company {
    name: String
    catchPhrase: String
    bs: String
  }

  type User {
    id: ID!
    name: String
    username: String
    email: String
    phone: String
    website: String
    company: Company
    address: Address
  }

  type Channel {
    id: ID!
    messages: [Message!]!
    name: String!
  }
  input MessageInput {
    channelId: ID!
    text: String!
  }
  type Message {
    id: ID!
    text: String!
  }

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
    channels: [Channel!]!
    channel(id: ID!): Channel
    getUsers: [User]
    activityFeed: [IActivity]
    activity: IActivity
  }
  type Mutation {
    addChannel(name: String!): Channel
    addMessage(message: MessageInput!): Message
  }
  type Subscription {
    messageAdded(channelId: ID!): Message
    channelAdded: Channel
  }
`;

module.exports = typeDefs;
