import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.scss";
import AmazeLoader from "@components/reusable/Loader";

const Home: NextPage = () => {
  const [isUserVerified, setIsUserVerified] = useState(false);
  const router = useRouter();

  const verifyUser = async () => {
    const token = await localStorage.getItem("auth-Token");
    return new Promise((resolve: any, reject: any) => {
      if (token) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  };

  useEffect(() => {
    verifyUser()
      .then((data) => {
        setIsUserVerified(true);
        router.push("/Home");
      })
      .catch((err) => {
        setIsUserVerified(false);
        router.push("/auth/Login");
      });
  }, []);

  return <AmazeLoader data={true} />;
};

export default Home;
