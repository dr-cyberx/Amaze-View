import mongoose from "mongoose";
import { ApolloError } from "apollo-server-core";

import User from "../db/schema/index";

const resolvers = {
  Query: {
    hello() {
      return "hello world";
    },
    getUser: async (_parents: any, args: any) => {
      try {
        const users = await User.find({});
        return users;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    createUser: async (_parents: any, args: any) => {
      try {
        const user = await new User(args);
        user.save();
        return user;
      } catch (error) {
        console.log(error);
      }
    },

    updateUser: async (_parents: any, args: any) => {
      const { id, data } = args;
      try {
        const checkUser = await User.findById(id);
        if (checkUser) {
          await User.findByIdAndUpdate(id, data, { lean: true });
          const updatedUser = await User.findById(id);
          return { id: updatedUser._doc._id, ...updatedUser._doc };
        }
      } catch (error) {
        throw new ApolloError("user not found!", "PERSISTED_QUERY_NOT_FOUND");
      }
    },
  },
};

export default resolvers;
