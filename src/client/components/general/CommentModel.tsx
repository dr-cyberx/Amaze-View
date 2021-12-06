import React, { useContext } from "react";
import AmazeModel from "@components/reusable/Model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "@styles/CommentModel.module.scss";
import { AmazeContext } from "utils";
interface ICommentModel {
  commentData: any;
}

const CommentModel: React.FunctionComponent<ICommentModel> = ({
  children,
  commentData,
}) => {
  const { CloseCommentModel } = useContext(AmazeContext);

  React.useEffect(() => {
    console.log("inside the model =>> ", commentData);
  }, [commentData]);

  return (
    <AmazeModel>
      <div className={styles.CommentModel__parent}>
        <div className={styles.CommentModel__header}>
          <h2 style={{ marginTop: "15px", marginBottom: "15px" }}>Comments</h2>
          <FontAwesomeIcon
            size="2x"
            icon={faTimes}
            onClick={() => CloseCommentModel()}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className={styles.CommentModel__comments}>
          <textarea
            style={{ padding: "10px" }}
            rows={5}
            cols={55}
            placeholder="Comment here..."
          />
        </div>
        <div className={styles.CommentModel__otherComments}>
          {commentData?.map((d: any) => (
            <div
              key={d.commentContent}
              className={styles.CommentModel__singleComment}
            >
              <div>
                <h4>{d.user.userName}</h4>
                <p>“ {d.commentContent} ”</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AmazeModel>
  );
};

export default CommentModel;
