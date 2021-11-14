import React, { useEffect } from "react";
import router from "next/router";
import Navbar from "@components/general/Navbar";
import StandardView from "@components/general/StandardWidth";
import PostCard from "@components/general/PostCard";

const Home: React.FunctionComponent = (): JSX.Element => {
  useEffect(() => {
    const token = localStorage.getItem("auth-Token");
    console.log(token);
    if (!token) {
      router.push("/auth/Login");
    }
  }, []);

  return (
    <>
      <Navbar />
      <StandardView>
        <PostCard />
      </StandardView>
    </>
  );
};

export default Home;
