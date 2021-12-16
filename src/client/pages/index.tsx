import { useEffect, useState } from "react";
import type { NextPage } from "next";
import cookie from "cookie";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import AmazeLoader from "@components/reusable/Loader";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  const router = useRouter();

  const verifyUser = async () => {
    const token = await cookie.parse(document.cookie)?.authToken;
    return new Promise((resolve: any, reject: any) => {
      if (token) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  };
// asd
  useEffect(() => {
    verifyUser()
      .then((data) => {
        router.push("/Home");
      })
      .catch((err) => {
        router.push("/auth/Login");
      });
  }, []);

  return <AmazeLoader data={true} />;
};

export default Home;
