import mongoose from "mongoose";
import { ApolloError } from "apollo-server-core";
import jwt from "jsonwebtoken";

import User from "../../db/schema/index";

export const user_Mutation_Operations = {
  RegisterUser: async (_parents: any, args: any) => {
    try {
      const user = await new User(args);
      user.save();

      const token = await jwt.sign(
        { userId: user._id },
        `${process.env.TOKEN_STRING}`
      );

      return { data: user, token };
    } catch (error) {
      console.log(error);
      return { data: null, token: "" };
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

    console.log(args);

    if ((!email || !userName) && !password)
      return {
        message: "enter valid Login Creds",
        shouldLogin: false,
        token: "",
      };

    const checkUser = email
      ? await User.findOne({ email })
      : await User.findOne({ userName });

    if (!checkUser)
      return { message: "user not found", shouldLogin: false, token: "" };

    try {
      await checkUser.comparePassword(password);
      const token = await jwt.sign(
        { userId: checkUser._id },
        `${process.env.TOKEN_STRING}`
      );

      return {
        message: "logged in successfully",
        shouldLogin: true,
        token,
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
