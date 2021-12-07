export const openCreatePostModel = () => {
  return (dispatch: (arg0: { type: string; payload: boolean }) => void) => {
    dispatch({
      type: "OPEN_CREATE_POST_MODEL",
      payload: true,
    });
  };
};

export const closeCreatePostModel = () => {
  return (dispatch: (arg0: { type: string; payload: boolean }) => void) => {
    dispatch({
      type: "CLOSE_CREATE_POST_MODEL",
      payload: false,
    });
  };
};
