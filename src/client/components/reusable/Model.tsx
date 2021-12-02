import React from "react";
import styles from "@styles/AmazeModel.module.scss";

const AmazeModel: React.FunctionComponent = ({ children }) => {
  return (
    <div className={styles.postModel}>
      <div className={styles.post_model_container}>{children}</div>
    </div>
  );
};

export default AmazeModel;
