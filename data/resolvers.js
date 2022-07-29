const { withFilter } = require("apollo-server");
const channels = require("./data");

let nextId = 3;
let nextMessageId = 5;

const CHANNEL_ADDED = "CHANNEL_ADDED";

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
      if ("message" in activity) {
        return "Comment";
      }
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
  // Audio: {
  //   __isTypeOf(activity) {
  //     return "bitrate" in activity;
  //   },
  // },
  // Image: {
  //   __isTypeOf(activity) {
  //     return "url" in activity;
  //   },
  // },
  // Post: {
  //   __isTypeOf(activity) {
  //     return "comments" in activity;
  //   },
  // },
  // Comment: {
  //   __isTypeOf(activity) {
  //     return "message" in activity;
  //   },
  // },
  // Video: {
  //   __isTypeOf(activity) {
  //     return "content" in activity;
  //   },
  // },
  // FlashNews: {
  //   __isTypeOf(activity) {
  //     return "rating" in activity;
  //   },
  // },
  Query: {
    activityFeed(_, __, ___, info) {
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
};

module.exports = resolvers;
