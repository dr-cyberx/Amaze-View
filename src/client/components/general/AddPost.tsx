import React, { useState, useContext } from "react";
import { AmazeContext } from "utils/index";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import styles from "@styles/Addpost.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddPost: React.FC = (): JSX.Element => {
  const { OpenPost } = useContext(AmazeContext);
  return (
    <div className={styles.plusIcon} onClick={OpenPost}>
      <div className={styles.icon_container}>
        <FontAwesomeIcon size="3x" style={{ color: "white" }} icon={faPen} />
      </div>
    </div>
  );
};

export default AddPost;
