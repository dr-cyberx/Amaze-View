import React from "react";
import AmazeModel from "@components/reusable/Model";
import styles from "@styles/CommentModel.module.scss";

interface ICommentModel {
  commentData: any;
}

const CommentModel: React.FunctionComponent<ICommentModel> = ({
  children,
  commentData,
}) => {
  React.useEffect(() => {
    console.log("inside the model =>> ", commentData);
  }, [commentData]);

  return (
    <AmazeModel>
      <h1>hello comments</h1>
    </AmazeModel>
  );
};

export default CommentModel;
