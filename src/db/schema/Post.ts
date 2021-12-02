import { Model, model, Schema } from "mongoose";

const PostSchema: Schema<any, Model<any, any, any, any>, {}> = new Schema(
  {
    postContent: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    comments: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
        commentContent: {
          type: String,
          requried: true
        },
      },
    ],
    publisher: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
const Post = model("Post", PostSchema);

export default Post;
