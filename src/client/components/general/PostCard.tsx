import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faComment,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import style from "@styles/PostCard.module.scss";

const PostCard: React.FunctionComponent = (): JSX.Element => {
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
          <p style={{ margin: "0", fontWeight: 450 }}>Raghav</p>
          <p style={{ margin: "0", fontSize: "13px" }}>Sector 23, Mohali</p>
        </div>
      </div>
      <div className={style.Post_card_body}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique
          sed ad recusandae saepe dicta minus iusto mollitia inventore optio
          quae repellat, obcaecati animi at ducimus quo modi sit, voluptate
          nesciunt autem ipsum magni voluptates, officiis rerum nemo. Est cum
          recusandae ex ab, dignissimos adipisci. Fuga fugiat mollitia
          temporibus provident distinctio.
        </p>
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
