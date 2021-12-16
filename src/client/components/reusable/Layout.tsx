import React, { useContext } from "react";
import { AmazeContext } from "utils/index";
import AddPost from "@components/general/AddPost";
import CommentModel from "@components/general/CommentModel";
import Navbar from "@components/general/Navbar";
import PostModel from "@components/general/PostModel";
import StandardView from "@components/general/StandardWidth";
import { useSelector } from "react-redux";
import { RootState } from "state/reducers";
import MetaData from "./MetaData";
import Auth from "./Auth";

interface ILayout {
  children: JSX.Element;
  title: string;
  refetchPosts?: any;
}

const Layout: React.FC<ILayout> = ({
  children,
  title,
  refetchPosts,
}): JSX.Element => {
  const { state } = useContext(AmazeContext);
  // toggleCreatePostModel();

  return (
    <>
      <Auth>
        <MetaData title={title} />
        <Navbar />
        <StandardView>
          <div>
            <h1 style={{ marginBottom: "37px" }}>Amaze View</h1>
            {children}
            <AddPost />
          </div>
        </StandardView>
        {state.openPostModel && <PostModel refetchPost={refetchPosts} />}
        {state.openCommentModel.shouldbe && (
          <CommentModel refetchPosts={refetchPosts} />
        )}
      </Auth>
    </>
  );
};

export default Layout;

// const toggleCreatePostModel = useSelector(
//   (state: RootState) => state.create_post_model_reducer.shouldOpen
// );
// const toggleCommentModel = useSelector(
//   (state: RootState) => state.comment_model_reducer
// );
// const All_Post = useSelector((state: RootState) => state.get_all_post_data);
