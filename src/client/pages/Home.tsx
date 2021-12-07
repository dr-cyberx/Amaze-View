import React, { useEffect, useContext } from "react";
import { AmazeContext } from "utils/index";
import router from "next/router";
import ShowPosts from "@components/Pages/ShowPosts";
import Layout from "@components/reusable/Layout";
import GET_ALL_POST from "@graphql-documents/GET_ALL_POST.graphql";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { get_all_post_data } from "state/actions";

const Home: React.FunctionComponent = (): JSX.Element => {
  // const { state } = useContext(AmazeContext);
  const { data, loading, error, refetch } = useQuery(GET_ALL_POST, {
    fetchPolicy: "cache-first", // Used for first execution
  });

  const setAllPostData_Dispatcher = useDispatch();
  const setAll_post_actions = bindActionCreators(
    get_all_post_data,
    setAllPostData_Dispatcher
  );

  useEffect(() => {
    setAll_post_actions.Add_all_post_data({
      data,
      error,
      loading,
      refetch,
    });
  }, [data, loading, error, refetch]);

  useEffect(() => {
    const token = localStorage.getItem("auth-Token");
    if (!token) {
      router.push("/auth/Login");
    }
  }, []);

  return (
    <>
      <Layout title="Home" refetchPosts={refetch}>
        <ShowPosts data={data} loading={loading} refetch={refetch} />
      </Layout>
    </>
  );
};

export default Home;
