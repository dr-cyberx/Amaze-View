import Navbar from "@components/general/Navbar";
import StandardView from "@components/general/StandardWidth";
import ShowPosts from "@components/Pages/ShowPosts";
import Layout from "@components/reusable/Layout";
import MetaData from "@components/reusable/MetaData";
import React from "react";

const SearchFeed: React.FunctionComponent = (): JSX.Element => {
  return (
    <>
      <Layout title="Search">
        <h1>Search Feed</h1>
      </Layout>
    </>
  );
};

export default SearchFeed;
