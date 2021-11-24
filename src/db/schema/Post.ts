import { model, Schema } from "mongoose";

const PostSchema = new Schema(
  {
    postContent: {
      type: String,
      required: true,
    },
    publisher: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
const Post = model("Post", PostSchema);

export default Post;
