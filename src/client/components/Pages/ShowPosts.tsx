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
  const [PostData, setPostData] = useState([]);

  React.useEffect(() => {
    if (data) {
      setPostData(data?.getAllPost);
    }
  }, [data]);


  React.useEffect(() => {
    console.log("length ----> ", PostData?.length);
  }, [PostData]);

  return (
    <div>
      <AmazeLoader data={loading} />
      {PostData && (
        <InfiniteScroll
          next={() =>
            fetchMore({
              variable: {
                offset: PostData?.length,
                limit: 10,
              },
            })
          }
          hasMore={true}
          loader={<AmazeLoader data={true} />}
          dataLength={PostData?.length}
        >
          {PostData?.map((item: any) => (
            <div key={item.id}>
              <PostCard postData={item} location={item.location} />
            </div>
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default React.memo(ShowPosts);
