import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import AmazeModel from "@components/reusable/Model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { AmazeContext } from "utils";
import ADD_COMMENTS from "@graphql-documents/ADD_COMMENTS.graphql";
import styles from "@styles/CommentModel.module.scss";
import Button from "@components/reusable/Button";
import { commentModel } from "state/actions";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { RootState } from "state/reducers";
import { NetworkStatus } from "@apollo/client";
import AmazeLoader from "@components/reusable/Loader";

interface ICommentModel {
  commentData: any;
  refetchPost?: any;
  postId?: any;
}

const CommentModel: React.FunctionComponent<ICommentModel> = ({
  children,
  commentData,
  postId,
}) => {
  const [commentContent, setCommentContent] = useState();
  const [addComment] = useMutation(ADD_COMMENTS);

  const toggleCommentModelDispatcher = useDispatch();
  const commentModelActions = bindActionCreators(
    commentModel,
    toggleCommentModelDispatcher
  );

  const { refetchAll, data, loading, networkStatus } = useSelector(
    (state: RootState) => state.get_all_post_data
  );

  console.log("--->>>>>> loading ", refetchAll);

  const handleCommentModelClick = async () => {
    await addComment({
      variables: {
        commentContent,
        postId,
      },
      notifyOnNetworkStatusChange: true,
    }).then(() => refetchAll());
    // () => refetchPost && refetchPost()
  };

  return (
    <AmazeModel>
      {networkStatus === NetworkStatus.refetch && <AmazeLoader data={data} />}
      <div className={styles.CommentModel__parent}>
        <div className={styles.CommentModel__header}>
          <h2 style={{ marginTop: "15px", marginBottom: "15px" }}>Comments</h2>
          <FontAwesomeIcon
            size="2x"
            icon={faTimes}
            onClick={commentModelActions.CloseCommentModel}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className={styles.CommentModel__comments}>
          <textarea
            style={{ padding: "10px" }}
            onChange={(e: any) => setCommentContent(e.target.value)}
            rows={5}
            cols={55}
            placeholder="Comment here..."
          />
        </div>
        <div className={styles.CommentModel__otherComments}>
          {commentData?.map((d: any) => (
            <div key={d.id} className={styles.CommentModel__singleComment}>
              <div>
                <h4>{d.user.userName}</h4>
                <p>“ {d.commentContent} ”</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.CommentModel__AddBtn__section}>
          <Button
            type="button"
            label="Add Your Comment"
            size="medium"
            style={{ fontWeight: 900, width: "100%" }}
            handleClick={handleCommentModelClick}
          />
        </div>
      </div>
    </AmazeModel>
  );
};

export default CommentModel;
