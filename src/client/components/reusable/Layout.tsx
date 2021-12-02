import AddPost from "@components/general/AddPost";
import CommentModel from "@components/general/CommentModel";
import Navbar from "@components/general/Navbar";
import PostModel from "@components/general/PostModel";
import StandardView from "@components/general/StandardWidth";
import React, { useContext } from "react";
import { AmazeContext } from "utils";
import MetaData from "./MetaData";

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
      {state.openPostModel && <PostModel refetchPost={refetchPosts} />}
      {state.openCommentModel.shouldbe && (
        <CommentModel commentData={state.openCommentModel.CommentData} />
      )}
    </>
  );
};

export default Layout;
