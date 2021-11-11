import mongoose from "mongoose";
import { ApolloError } from "apollo-server-core";

import User from "../../db/schema/index";

export const user_Mutation_Operations = {
  RegisterUser: async (_parents: any, args: any) => {
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

  Login: async (_parents: any, args: any) => {
    const { email, userName, password } = args;

    if ((!email || !userName) && !password)
      return {
        message: "enter valid Login Creds",
        shouldLogin: false,
        token: "",
      };
    const filter = email || userName;
    
    console.log(filter);

    const checkUser = email
      ? await User.findOne({ email })
      : await User.findOne({ userName });

    console.log(checkUser);
    if (!checkUser)
      return { message: "user not found", shouldLogin: false, token: "" };

    try {
      await checkUser.comparePassword(password);
      return {
        message: "logged in successfully",
        shouldLogin: true,
        token: "",
      };
    } catch (error) {
      console.log("error =>>>> ", error);
      return {
        message: "enter valid Login Creds",
        shouldLogin: false,
        token: "",
      };
    }
  },
};
