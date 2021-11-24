import mongoose from "mongoose";
import Post from "../../db/schema/Post";
import User from "../../db/schema/index";

export const PostMutation = {
  CreatePost: async (_parent: any, args: any) => {
    const id = args?.publisher;
    const newPost = await new Post(args).save();
    await User.findByIdAndUpdate(
      { _id: id },
      { $push: { posts: newPost._id } }
    );
    const user = await User.findById({ _id: id });

    return {
      id: newPost._id,
      postContent: newPost.postContent,
      publisher: user,
    };
  },
};
