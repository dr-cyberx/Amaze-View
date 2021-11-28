import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faComment,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import style from "@styles/PostCard.module.scss";

interface IPostCard {
  postContent: string;
  location: string;
  publisher: {
    age: number;
    email: string;
    firstName: string;
    gender: string;
    id: string;
    lastName: string;
    phoneNumber: string;
    userName: string;
  };
}

const PostCard: React.FunctionComponent<IPostCard> = ({
  postContent,
  location,
  publisher,
}): JSX.Element => {
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
          <p style={{ margin: "0", fontWeight: 450 }}>{publisher?.userName}</p>
          <p style={{ margin: "0", fontSize: "13px" }}>{location}</p>
        </div>
      </div>
      <div className={style.Post_card_body}>
        <p style={{ marginTop: "0px" }}>{postContent}</p>
      </div>
      <div className={style.Post_card_foot}>
        <p>
          5k <FontAwesomeIcon size="1x" icon={faThumbsUp} /> Like
        </p>
        <p>
          6k <FontAwesomeIcon size="1x" icon={faComment} /> comment
        </p>
        <p>
          3k <FontAwesomeIcon size="1x" icon={faShare} /> share
        </p>
      </div>
    </div>
  );
};

export default PostCard;
