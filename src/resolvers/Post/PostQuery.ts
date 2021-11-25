import { ApolloError } from "apollo-server-core";
import mongoose from "mongoose";
import User from "../../db/schema/index";
import Post from "../../db/schema/Post";

export const Post_Query = {
  getAllPost: async (
    _parent: any,
    args: any
  ): Promise<
    | {
        id: string;
        postContent: string;
        publisher: () => Promise<any>;
      }[]
    | undefined
  > => {
    try {
      const res = await Post.find({});
      if (res) {
        const data: {
          id: any;
          postContent: any;
          publisher: () => Promise<any>;
        }[] = await Promise.all(
          res.map((item: any) => {
            return {
              id: item._id,
              postContent: item.postContent,
              publisher: async () =>
                await User.findById({ _id: item.publisher }),
            };
          })
        );
        return data;
      }
    } catch (error) {
      throw new ApolloError("failed to get Posts", "findAll Post query failed");
    }
  },
};
