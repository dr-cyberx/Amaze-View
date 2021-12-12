import React, { useState, useContext } from "react";
import AmazeLoader from "@components/reusable/Loader";
import PostCard from "@components/general/PostCard";
import { AmazeContext } from "utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { RootState } from "state/reducers";

interface IShowPosts {
  data: any;
  loading: any;
  refetch: any;
  fetchMore: any;
}

const ShowPosts: React.FC<IShowPosts> = ({
  data,
  refetch,
  loading,
  fetchMore,
}): JSX.Element => {
  const { state } = useContext(AmazeContext);
  const [PostData, setPostData] = useState<any>();

  React.useEffect(() => {
    setPostData(data);
  }, [data]);
  console.log("length -----> ", data?.getAllPost?.length);
  return (
    <div>
      <AmazeLoader data={loading} />
      {data?.getAllPost && (
        <InfiniteScroll
          next={() =>
            fetchMore({
              variable: {
                offset: data?.getAllPost?.length,
                limit: 5,
              },
            })
          }
          hasMore={true}
          loader={<AmazeLoader data={true} />}
          dataLength={data?.getAllPost?.length}
        >
          {data?.getAllPost?.map((item: any) => (
            <div key={item.id}>
              <PostCard postData={item} location={item.location} />
            </div>
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ShowPosts;
