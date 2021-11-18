import React from "react";
import PostCard from "@components/general/PostCard";

const ShowPosts: React.FC = (): JSX.Element => {
  return (
    <div>
      {[...Array(20)].map((item) => (
        <div key={item}>
          <PostCard />
        </div>
      ))}
    </div>
  );
};

export default ShowPosts;
