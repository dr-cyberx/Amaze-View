import React, { useContext, useState } from "react";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CREATE_POST from "@graphql-documents/CREATE_POST.graphql";
import { AmazeContext } from "utils/index";
import Button from "@components/reusable/Button";
import styles from "@styles/PostModel.module.scss";
import AmazeLoader from "@components/reusable/Loader";

interface ipostModel {
  refetchPost?: any;
}

const PostModel: React.FC<ipostModel> = ({ refetchPost }): JSX.Element => {
  const [addPost, { loading }] = useMutation(CREATE_POST);
  const [ModelData, setModeldata] = useState({
    location: "",
    postContent: "",
  });

  const { ClosePost } = useContext(AmazeContext);

  const handleSubmit = async (_event: any): Promise<void> => {
    _event.preventDefault();
    await addPost({
      variables: {
        postContent: ModelData.postContent,
        location: ModelData.location,
      },
    }).then(() => {
      refetchPost && refetchPost();
    });
  };

  return (
    <div className={styles.postModel}>
      <div className={styles.post_model_container}>
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
      </div>
    </div>
  );
};

export default PostModel;
