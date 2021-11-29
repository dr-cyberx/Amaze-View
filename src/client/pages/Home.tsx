import React, { useEffect, useContext } from "react";
import { AmazeContext } from "utils/index";
import router from "next/router";
import ShowPosts from "@components/Pages/ShowPosts";
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
