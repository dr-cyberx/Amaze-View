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

  DeletePost: async (_parent: any, args: any) => {
    const PostId = args?.PostId;
    const post = await Post.findById({ _id: PostId });
    if (post) {
      await Post.deleteOne({ _id: PostId });
      const userId = post.publisher;
      await User.findByIdAndUpdate(
        { _id: userId },
        { $pull: { posts: PostId } }
        );
      return {
        id: post._id,
        postContent: post.postContent,
        publisher: async () => await User.findById({ _id: userId }),
      };
    }
  },
};
