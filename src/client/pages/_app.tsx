import Head from "next/head";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "@graphql-documents/gql-client/index";
import { AmazeProvider } from "../utils/index";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AmazeProvider>
        <Component {...pageProps} />
      </AmazeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
