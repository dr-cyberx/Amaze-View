import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth/Login");
  }, []);

  return null;
};

export default Home;
