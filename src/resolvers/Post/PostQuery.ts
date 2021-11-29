import { ApolloError } from "apollo-server-core";
import mongoose from "mongoose";
import { JwtPayload, verify } from "jsonwebtoken";
import User from "../../db/schema/index";
import Post from "../../db/schema/Post";

export const Post_Query = {
  getAllPost: async (
    _parent: any,
    args: any,
    context: any
  ): Promise<
    | {
        id: string;
        postContent: string;
        location: string;
        publisher: () => Promise<any>;
      }[]
    | undefined
  > => {
    try {
      if (context.token) {
        const resToken: string | JwtPayload = verify(
          context.token,
          `${process.env.TOKEN_STRING}`
        );
        const isValidUser = await User.findById({
          _id: (<any>resToken).userId,
        });
        try {
          if (isValidUser.email || isValidUser.userName) {
            const res = await Post.find({}).sort([["updatedAt", -1]]);
            if (res) {
              const data: {
                id: any;
                postContent: any;
                location: string;
                publisher: () => Promise<any>;
              }[] = await Promise.all(
                res.map((item: any) => {
                  return {
                    id: item._id,
                    postContent: item.postContent,
                    location: item.location,
                    publisher: async () =>
                      await User.findById({ _id: item.publisher }),
                  };
                })
              );
              return data;
            }
          }
        } catch (error) {
          throw new ApolloError(
            "failed to get Posts",
            "findAll Post query failed"
          );
        }
      } else {
        throw new ApolloError("Access denied 1", "getAllpost failed");
      }
    } catch (err) {
      throw new ApolloError("Access denied", "getAllpost failed");
    }
  },
};
