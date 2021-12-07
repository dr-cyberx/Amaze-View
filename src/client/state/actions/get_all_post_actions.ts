export const Add_all_post_data = (args: any) => {
  return (dispatch: any) => {
    dispatch({
      type: "SET_ALL_POST_DATA",
      payload: {
        data: args.data,
        error: args.error,
        loading: args.loading,
        networkStatus: args.networkStatus,
        refetchAll: args.refetch,
      },
    });
  };
};
