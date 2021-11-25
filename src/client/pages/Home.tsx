import React, { useEffect, useContext } from "react";
import { AmazeContext } from "utils/index";
import router from "next/router";
import Navbar from "@components/general/Navbar";
import StandardView from "@components/general/StandardWidth";
import ShowPosts from "@components/Pages/ShowPosts";
import AddPost from "@components/general/AddPost";
import MetaData from "@components/reusable/MetaData";
import PostModel from "@components/general/PostModel";
import Layout from "@components/reusable/Layout";

const Home: React.FunctionComponent = (): JSX.Element => {
  const { state } = useContext(AmazeContext);

  useEffect(() => {
    const token = localStorage.getItem("auth-Token");
    if (!token) {
      router.push("/auth/Login");
    }
  }, []);

  return (
    <>
      <Layout title="Home">
        <ShowPosts />
      </Layout>
    </>
  );
};

export default Home;
