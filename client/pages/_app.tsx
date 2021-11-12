import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "../gql/gql-client/index";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
