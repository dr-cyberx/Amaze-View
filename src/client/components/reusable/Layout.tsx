import AddPost from "@components/general/AddPost";
import Navbar from "@components/general/Navbar";
import PostModel from "@components/general/PostModel";
import StandardView from "@components/general/StandardWidth";
import React, { useContext } from "react";
import { AmazeContext } from "utils";
import MetaData from "./MetaData";

interface ILayout {
  children: JSX.Element;
  title: string;
}

const Layout: React.FC<ILayout> = ({ children, title }): JSX.Element => {
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
      {state.openPostModel && <PostModel />}
    </>
  );
};

export default Layout;
