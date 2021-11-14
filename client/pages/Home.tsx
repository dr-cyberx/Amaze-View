import React, { useEffect } from "react";
import router from "next/router";
import Navbar from "../components/general/Navbar";
import StandardView from "../components/general/StandardWidth";

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
        <h1>Home Page</h1>
      </StandardView>
    </>
  );
};

export default Home;
