import React, { useContext, useState } from "react";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faComment,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { AmazeContext } from "utils";
import ADD_LIKES from "@graphql-documents/ADD_LIKES.graphql";
import ADD_COMMENTS from "@graphql-documents/ADD_COMMENTS.graphql";
import style from "@styles/PostCard.module.scss";

interface IPostCard {
  postData: any;
  location: string;
}

const PostCard: React.FunctionComponent<IPostCard> = ({
  postData,
  location,
}): JSX.Element => {
  const { openCommentModel, CloseCommentModel } = useContext(AmazeContext);
  const [postdata, setPostData] = useState(postData);
  const [likeLength, setLikeLength] = useState(postData.likes.length);

  const [addLikes] = useMutation(ADD_LIKES);
  const [addComments] = useMutation(ADD_COMMENTS);

  const handleLikes = async () => {
    setLikeLength((previousVal: number) => previousVal + 1);
    await addLikes({
      variables: {
        postId: postdata?.id,
      },
    });
  };

  const handleComment = async () => {
    openCommentModel(postData.comments);
  };

  return (
    <div className={style.Post_Card}>
      <div className={style.Post_card_head}>
        <div className={style.userIcon}>
          <Image
            alt="Mountains"
            src="/userIcon.png"
            objectFit="cover"
            height="50px"
            width="50px"
          />
        </div>
        <div style={{ cursor: "pointer" }}>
          <p style={{ margin: "0", fontWeight: 450 }}>
            {postdata?.publisher?.userName}
          </p>
          <p style={{ margin: "0", fontSize: "13px" }}>{location}</p>
        </div>
      </div>
      <div className={style.Post_card_body}>
        <p style={{ marginTop: "0px" }}>{postdata?.postContent}</p>
      </div>
      <div className={style.Post_card_foot}>
        <p onClick={handleLikes}>
          {likeLength} <FontAwesomeIcon size="1x" icon={faThumbsUp} /> Likes
        </p>
        <p onClick={handleComment}>
          {postdata?.comments.length === 0 ? "" : postdata?.comments.length}{" "}
          <FontAwesomeIcon size="1x" icon={faComment} /> comment
        </p>
        <p>
          <FontAwesomeIcon size="1x" icon={faShare} /> share
        </p>
      </div>
    </div>
  );
};

export default PostCard;
