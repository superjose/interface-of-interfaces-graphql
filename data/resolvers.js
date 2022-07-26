const { PubSub, withFilter } = require("apollo-server");
const channels = require("./data");

let nextId = 3;
let nextMessageId = 5;

const CHANNEL_ADDED = "CHANNEL_ADDED";

const pubsub = new PubSub();

const base = () => ({
  id: Math.random() + "-hola",
  name: "A name",
  description: "A description",
});

const resolvers = {
  IActivity: {
    __resolveType(activity) {
      if ("format" in activity) {
        return "Video";
      }
      if ("bitrate" in activity) {
        return "Audio";
      }
      if ("url" in activity) {
        return "Image";
      }
      if ("content" in activity) {
        return "Post";
      }
      if ("rating" in activity) {
        return "FlashNews";
      }
      return "IActivity";
    },
  },
  IMedia: {
    __resolveType(activity) {
      if ("format" in activity) {
        return "Video";
      }
      if ("bitrate" in activity) {
        return "Audio";
      }
      if ("url" in activity) {
        return "Image";
      }
      return "IActivity";
    },
  },
  INews: {
    __resolveType(activity) {
      if ("content" in activity) {
        return "Post";
      }
      if ("rating" in activity) {
        return "FlashNews";
      }
    },
  },
  Query: {
    channels: () => {
      return channels;
    },
    channel: (root, { id }) => {
      return channels.find((channel) => channel.id === id);
    },
    getUsers: async (_source, _args, { dataSources }) => {
      return dataSources.usersAPI.getUsers();
    },
    activityFeed() {
      return [
        {
          // Media
          ...base(),
          url: "http://google.com",
          format: "jpeg",
          type: "Image",
        },
        {
          ...base(),
          date: new Date(),
          author: "Minmi",
          content: "Hola 😁",
        },
        {
          // Media
          ...base(),
          type: ".h264",
          format: "mkv",
          codec: "x266",
          length: 900,
        },
      ];
    },
  },
  Mutation: {
    addChannel: (root, args) => {
      const newChannel = {
        id: String(nextId++),
        messages: [],
        name: args.name,
      };
      channels.push(newChannel);

      pubsub.publish(CHANNEL_ADDED, { channelAdded: newChannel });
      return newChannel;
    },
    addMessage: (root, { message }) => {
      const channel = channels.find(
        (channel) => channel.id === message.channelId
      );
      if (!channel) throw new Error("Channel does not exist");

      const newMessage = { id: String(nextMessageId++), text: message.text };
      channel.messages.push(newMessage);

      pubsub.publish("messageAdded", {
        messageAdded: newMessage,
        channelId: message.channelId,
      });

      return newMessage;
    },
  },
  Subscription: {
    messageAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("messageAdded"),
        (payload, variables) => {
          //
          // The `messageAdded` channel includes events for all channels, so we filter to only
          // pass through events for the channel specified in the query
          return payload.channelId === variables.channelId;
        }
      ),
    },
    channelAdded: {
      subscribe: () => pubsub.asyncIterator([CHANNEL_ADDED]),
    },
  },
};

module.exports = resolvers;
