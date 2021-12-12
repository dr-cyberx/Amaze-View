import React, { useEffect, useContext } from "react";
import { AmazeContext } from "utils/index";
import router from "next/router";
import ShowPosts from "@components/Pages/ShowPosts";
import Layout from "@components/reusable/Layout";
import GET_ALL_POST from "@graphql-documents/GET_ALL_POST.graphql";
import { useQuery } from "@apollo/client";

const Home: React.FunctionComponent = (): JSX.Element => {
  const { state } = useContext(AmazeContext);
  const { data, loading, error, refetch, fetchMore, networkStatus } = useQuery(
    GET_ALL_POST,
    {
      variables: {
        offset: 0,
        limit: 10,
      },
      fetchPolicy: "cache-first", // Used for first execution
    }
  );

  useEffect(() => {
    const token = localStorage.getItem("auth-Token");
    if (!token) {
      router.push("/auth/Login");
    }
  }, []);

  return (
    <>
      <Layout title="Home" refetchPosts={refetch}>
        <ShowPosts
          data={data}
          loading={loading}
          refetch={refetch}
          fetchMore={fetchMore}
        />
      </Layout>
    </>
  );
};

export default Home;

// const setAllPostData_Dispatcher = useDispatch();
// const setAll_post_actions = bindActionCreators(
//   get_all_post_data,
//   setAllPostData_Dispatcher
// );
