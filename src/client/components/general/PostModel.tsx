import React, { useContext } from "react";
import Image from "next/image";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AmazeContext } from "utils/index";
import Button from "@components/reusable/Button";
import styles from "@styles/PostModel.module.scss";

const PostModel: React.FC = (): JSX.Element => {
  const { ClosePost } = useContext(AmazeContext);
  return (
    <div className={styles.postModel}>
      <div className={styles.post_model_container}>
        <div className={styles.post_model_head}>
          <div className={styles.userIcon}>
            <Image
              alt="Mountains"
              src="/userIcon.png"
              objectFit="cover"
              height="50px"
              width="50px"
            />
            <div style={{ cursor: "pointer", marginLeft: "12px" }}>
              <p style={{ margin: "0", fontWeight: 450 }}>Raghav</p>
              <p style={{ margin: "0", fontSize: "13px" }}>Sector 23, Mohali</p>
            </div>
          </div>
          <FontAwesomeIcon
            size="2x"
            icon={faTimes}
            style={{ cursor: "pointer" }}
            onClick={ClosePost}
          />
        </div>
        <form className={styles.post_model_form}>
          <textarea
            style={{ padding: "10px" }}
            rows={20}
            cols={50}
            placeholder="Enter Post here"
          />
          <Button
            label="Post your View"
            type="submit"
            size="medium"
            style={{ fontWeight: 900, width: "100%" }}
          />
        </form>
      </div>
    </div>
  );
};

export default PostModel;
