import AddPost from "@components/general/AddPost";
import Navbar from "@components/general/Navbar";
import PostModel from "@components/general/PostModel";
import StandardView from "@components/general/StandardWidth";
import ShowPosts from "@components/Pages/ShowPosts";
import Layout from "@components/reusable/Layout";
import MetaData from "@components/reusable/MetaData";
import React, { useContext } from "react";
import { AmazeContext } from "utils";

const Profile: React.FC = (): JSX.Element => {
  const { state } = useContext(AmazeContext);
  return (
    <>
      <Layout title="Profile">
        <h1>Profile Page</h1>
      </Layout>
    </>
  );
};

export default Profile;
