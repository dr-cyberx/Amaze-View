import React from "react";
import { useQuery } from "@apollo/client";
import AmazeLoader from "@components/reusable/Loader";
import GET_ALL_POST from "@graphql-documents/GET_ALL_POST.graphql";
import PostCard from "@components/general/PostCard";

const ShowPosts: React.FC = (): JSX.Element => {
  const { data, loading, error } = useQuery(GET_ALL_POST, {
    fetchPolicy: "cache-first", // Used for first execution
  });
  React.useEffect(() => {
    console.log("data =>>>> ", data?.getAllPost);
  }, [data]);
  return (
    <div>
      <AmazeLoader data={loading} />
      {data?.getAllPost?.map((item: any) => (
        <div key={item.id}>
          <PostCard
            postContent={item.postContent}
            location={item.location}
            publisher={item.publisher}
          />
        </div>
      ))}
    </div>
  );
};

export default ShowPosts;
