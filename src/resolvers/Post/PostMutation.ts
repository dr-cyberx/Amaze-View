import mongoose from "mongoose";
import Post from "../../db/schema/Post";
import User from "../../db/schema/index";

export const PostMutation = {
  CreatePost: async (
    _parent: any,
    args: any
  ): Promise<{
    data: unknown;
    error: boolean;
    status: number;
  }> => {
    const id = args?.publisher;
    try {
      const newPost = await new Post(args).save();
      await User.findByIdAndUpdate(
        { _id: id },
        { $push: { posts: newPost._id } }
      );
      const user = await User.findById({ _id: id });

      const { location, likes, comments, postContent } = newPost;
      return {
        data: {
          id: newPost._id,
          location,
          likes,
          comments,
          postContent,
          publisher: user,
        },
        error: false,
        status: 200,
      };
    } catch (error) {
      return {
        data: error,
        error: true,
        status: 401,
      };
    }
  },

  DeletePost: async (
    _parent: any,
    args: any
  ): Promise<
    | {
        data: unknown;
        error: boolean;
        status: number;
      }
    | undefined
  > => {
    const PostId = args?.PostId;
    try {
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
            publisher: async (): Promise<any> =>
              await User.findById({ _id: userId }),
          },
          error: false,
          status: 200,
        };
      }
    } catch (error) {
      return {
        data: error,
        error: true,
        status: 401,
      };
    }
  },
  AddLike: async (_parent: any, args: any, context: any) => {},
};
