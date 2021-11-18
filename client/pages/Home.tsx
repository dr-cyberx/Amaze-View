import React, { useEffect } from "react";
import router from "next/router";
import Navbar from "@components/general/Navbar";
import StandardView from "@components/general/StandardWidth";
import ShowPosts from "@components/Pages/ShowPosts";

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
          <ShowPosts />
        </StandardView>
    </>
  );
};

export default Home;
