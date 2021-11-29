import React, { useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import AmazeLoader from "@components/reusable/Loader";
import GET_ALL_POST from "@graphql-documents/GET_ALL_POST.graphql";
import PostCard from "@components/general/PostCard";
import { AmazeContext } from "utils";

const ShowPosts: React.FC = (): JSX.Element => {
  const { state } = useContext(AmazeContext);
  const { openPostModel } = state;
  const [PostData, setPostData] = useState<any>();
  const { data, loading, refetch } = useQuery(GET_ALL_POST, {
    fetchPolicy: "cache-first", // Used for first execution
  });

  React.useEffect(() => {
    setPostData(data);
  }, [data]);

  React.useEffect(() => {
    refetch();
  }, [openPostModel]);

  return (
    <div>
      <AmazeLoader data={loading} />
      {PostData?.getAllPost?.map((item: any) => (
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
