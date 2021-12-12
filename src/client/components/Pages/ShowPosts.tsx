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

  return (
    <div>
      <AmazeLoader data={loading} />
      <InfiniteScroll
        next={fetchMore}
        hasMore={true}
        loader={<AmazeLoader data={true} />}
        dataLength={PostData?.getAllPost.length}
      >
        {PostData?.getAllPost?.map((item: any) => (
          <div key={item.id}>
            <PostCard postData={item} location={item.location} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default ShowPosts;
