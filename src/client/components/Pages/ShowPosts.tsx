import React from "react";
import PostCard from "@components/general/PostCard";

const ShowPosts: React.FC = (): JSX.Element => {
  return (
    <div>
      {[1, 2, 3, 4, 5, 6, 7].map((item) => (
        <div key={item}>
          <PostCard />
        </div>
      ))}
    </div>
  );
};

export default ShowPosts;
