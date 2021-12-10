import React, { useContext, useState } from "react";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CREATE_POST from "@graphql-documents/CREATE_POST.graphql";
import Button from "@components/reusable/Button";
import AmazeModel from "@components/reusable/Model";
import styles from "@styles/AmazeModel.module.scss";
import AmazeLoader from "@components/reusable/Loader";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { createPostModelActions } from "state/actions";
import { AmazeContext } from "utils";

interface ipostModel {
  refetchPost?: any;
}

const PostModel: React.FC<ipostModel> = ({ refetchPost }): JSX.Element => {
  const { ClosePost } = useContext(AmazeContext);
  const [addPost, { loading }] = useMutation(CREATE_POST);
  const [ModelData, setModeldata] = useState({
    location: "",
    postContent: "",
  });

  const handleSubmit = async (_event: any): Promise<void> => {
    _event.preventDefault();
    await addPost({
      variables: {
        postContent: ModelData.postContent,
        location: ModelData.location,
      },
    });
  };

  return (
    <AmazeModel>
      <div className={styles.post_model_head}>
        {loading && <AmazeLoader data={loading} />}
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
            <p style={{ margin: "0", fontSize: "13px" }}>
              {ModelData?.location || "Sector 23, Mohali"}
            </p>
          </div>
        </div>
        <FontAwesomeIcon
          size="2x"
          icon={faTimes}
          style={{ cursor: "pointer" }}
          onClick={ClosePost}
        />
      </div>
      <form className={styles.post_model_form} onSubmit={handleSubmit}>
        <input
          placeholder="Add Location"
          onChange={(e) =>
            setModeldata((previousData) => ({
              ...previousData,
              location: e.target.value,
            }))
          }
        />

        <textarea
          style={{ padding: "10px" }}
          rows={15}
          cols={50}
          placeholder="Enter Post here"
          onChange={(e) =>
            setModeldata((previousdata) => ({
              ...previousdata,
              postContent: e.target.value,
            }))
          }
        />
        <Button
          label="Post your View"
          type="submit"
          size="medium"
          style={{ fontWeight: 900, width: "100%" }}
        />
      </form>
    </AmazeModel>
  );
};

export default PostModel;

// const dispatch = useDispatch();
// const actions = bindActionCreators(createPostModelActions, dispatch);
