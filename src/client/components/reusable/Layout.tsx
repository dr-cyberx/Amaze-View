import React from "react";
import AddPost from "@components/general/AddPost";
import CommentModel from "@components/general/CommentModel";
import Navbar from "@components/general/Navbar";
import PostModel from "@components/general/PostModel";
import StandardView from "@components/general/StandardWidth";
import { useSelector } from "react-redux";
import { RootState } from "state/reducers";
import MetaData from "./MetaData";

interface ILayout {
  children: JSX.Element;
  title: string;
  refetchPosts?: any;
}

const Layout: React.FC<ILayout> = ({ children, title }): JSX.Element => {
  const toggleCreatePostModel = useSelector(
    (state: RootState) => state.create_post_model_reducer.shouldOpen
  );
  const toggleCommentModel = useSelector(
    (state: RootState) => state.comment_model_reducer
  );
  // toggleCreatePostModel();
  const All_Post = useSelector((state: RootState) => state.get_all_post_data);

  return (
    <>
      <MetaData title={title} />
      <Navbar />
      <StandardView>
        <div>
          <h1>Amaze View</h1>
          {children}
          <AddPost />
        </div>
      </StandardView>
      {toggleCreatePostModel && <PostModel refetchPost={All_Post.refetchAll} />}
      {toggleCommentModel.shouldOpen && (
        <CommentModel
          commentData={toggleCommentModel?.args?.comments}
          postId={toggleCommentModel?.args?.id}
          refetchPost={All_Post.refetchAll}
        />
      )}
    </>
  );
};

export default Layout;
