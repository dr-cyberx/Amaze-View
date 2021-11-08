import { gql } from "apollo-server-express";

const resolvers = {
  Query: {
    hello() {
      return "hello world";
    },
  },
};

export default resolvers;
