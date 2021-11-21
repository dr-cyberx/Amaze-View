import Navbar from "@components/general/Navbar";
import StandardView from "@components/general/StandardWidth";
import ShowPosts from "@components/Pages/ShowPosts";
import React from "react";

const SearchFeed: React.FunctionComponent = (): JSX.Element => {
  return (
    <div>
      <Navbar />
      <StandardView>
        <div>
          <h1>hwllo world</h1>
          <h1>Search Feed</h1>
        </div>
      </StandardView>
    </div>
  );
};

export default SearchFeed;
