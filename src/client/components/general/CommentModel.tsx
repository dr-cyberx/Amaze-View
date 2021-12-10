import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, NetworkStatus } from "@apollo/client";
import AmazeModel from "@components/reusable/Model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { AmazeContext } from "utils";
import ADD_COMMENTS from "@graphql-documents/ADD_COMMENTS.graphql";
import GET_COMMENT_BY_POST_ID from "@graphql-documents/GET_COMMENT_BY_POST_ID.graphql";
import styles from "@styles/CommentModel.module.scss";
import Button from "@components/reusable/Button";
import AmazeLoader from "@components/reusable/Loader";

interface ICommentModel {
  postId?: any;
  refetchPosts?: any;
}

const CommentModel: React.FunctionComponent<ICommentModel> = ({
  children,
  refetchPosts,
}): JSX.Element => {
  const { CloseCommentModel, state } = useContext(AmazeContext);
  const { openCommentModel } = state;
  const [commentContent, setCommentContent] = useState([]);
  const [commentText, setCommentText] = useState<string>("");
  const { data, loading, error, refetch, networkStatus } = useQuery(
    GET_COMMENT_BY_POST_ID,
    {
      variables: {
        postId: openCommentModel.postId,
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-first",
    }
  );
  const [addComment] = useMutation(ADD_COMMENTS);

  useEffect(() => {
    setCommentContent(data?.getCommentsByPostId?.comments);
  }, [data]);

  const handleCommentModelClick = async () => {
    await addComment({
      variables: {
        commentContent: commentText,
        postId: openCommentModel.postId,
      },
    }).then(() => {
      refetch();
      refetchPosts();
      setCommentText("");
    });
  };

  return (
    <AmazeModel>
      {(loading || networkStatus === NetworkStatus.refetch) && (
        <AmazeLoader data={loading} />
      )}
      <div className={styles.CommentModel__parent}>
        <div className={styles.CommentModel__header}>
          <h2 style={{ marginTop: "15px", marginBottom: "15px" }}>Comments</h2>
          <FontAwesomeIcon
            size="2x"
            icon={faTimes}
            onClick={CloseCommentModel}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className={styles.CommentModel__comments}>
          <textarea
            style={{ padding: "10px" }}
            onChange={(e: any) => setCommentText(e.target.value)}
            rows={5}
            cols={55}
            value={commentText}
            placeholder="Comment here..."
          />
        </div>
        <div className={styles.CommentModel__otherComments}>
          {commentContent?.map((d: any) => (
            <div
              key={`${d.id} ${Math.random()}`}
              className={styles.CommentModel__singleComment}
            >
              <div>
                <h4>{d.user.userName}</h4>
                <p style={{ wordBreak: "break-word" }}>
                  “ {d.commentContent} ”
                </p>
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
