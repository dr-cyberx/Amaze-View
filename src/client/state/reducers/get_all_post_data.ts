export const get_all_post_data = (
  state= {
    data: null,
    error: null,
    loading: null,
    refetchAll: null,
  },
  actions: any
) => {
  switch (actions.type) {
    case "SET_ALL_POST_DATA":
      return {
        ...state,
        data: actions.payload.data,
        error: actions.payload.error,
        loading: actions.payload.loading,
        refetchAll: actions.payload.refetch,
      };

    default:
      return state;
  }
};
