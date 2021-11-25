import mongoose from "mongoose";
import Post from "../../db/schema/Post";
import User from "../../db/schema/index";

export const PostMutation = {
  CreatePost: async (_parent: any, args: any) => {
    const id = args?.publisher;
    try{
      const newPost = await new Post(args).save();
      await User.findByIdAndUpdate(
        { _id: id },
        { $push: { posts: newPost._id } }
      );
      const user = await User.findById({ _id: id });
  
      return {
        data: {
          id: newPost._id,
          postContent: newPost.postContent,
          publisher: user,
        },
        error: false,
        status: 200,
      };
    }catch(error){
      return {
        data: error,
        error: true,
        status: 401,
      }
    }
  },

  DeletePost: async (_parent: any, args: any) => {
    const PostId = args?.PostId;
    try{
      const post = await Post.findById({ _id: PostId });
      if (post) {
        await Post.deleteOne({ _id: PostId });
        const userId = post.publisher;
        await User.findByIdAndUpdate(
          { _id: userId },
          { $pull: { posts: PostId } }
        );
        return {
          data: {
            id: post._id,
            postContent: post.postContent,
            publisher: async () => await User.findById({ _id: userId }),
          },
          error: false,
          status: 200,
        };
      }
    }catch(error){
      return {
        data: error,
        error: true,
        status: 401,
      }
    }
  },
};
