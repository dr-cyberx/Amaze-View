import React from "react";
import Head from "next/head";

interface IMetaData {
  title: string;
}

const MetaData: React.FunctionComponent<IMetaData> = ({ title }: IMetaData) => (
  <Head>
    <title>{title}</title>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
    <meta name="theme-color" content="#00C5EE" />
    <link rel="shortcut icon" href="/favicon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
  </Head>
);

export default MetaData;
