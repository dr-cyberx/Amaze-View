import mongoose from "mongoose";
import User from "../db/schema/index";

const resolvers = {
  Query: {
    hello() {
      return "hello world";
    },
    getUser: async (_parents: any, args: any) => {
      const users = await User.find({});
      return users;
    },
  },

  Mutation: {
    createUser: async (_parents: any, args: any) => {
      const user = await new User(args);
      user.save();
      return user;
    },

    updateUser: async (_parents: any, args: any) => {
      const user = await User.findByIdAndUpdate(
        args.id,
        args?.data,
        (err: any, docs: any) => {
          if (!err) {
            console.log("docs => ", docs);
          }
        }
      );
      console.log("hello => ", user)
      // return user;
    },
  },
};

export default resolvers;
