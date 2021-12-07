import React from "react";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import styles from "@styles/Addpost.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { createPostModelActions } from "state/actions";

const AddPost: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(createPostModelActions, dispatch);

  return (
    <div className={styles.plusIcon} onClick={actions.openCreatePostModel}>
      <div className={styles.icon_container}>
        <FontAwesomeIcon size="3x" style={{ color: "white" }} icon={faPen} />
      </div>
    </div>
  );
};

export default AddPost;
