import mongoose from "mongoose";
import { ApolloError } from "apollo-server-core";

import User from "../../db/schema/index";

export const user_Query = {
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
};