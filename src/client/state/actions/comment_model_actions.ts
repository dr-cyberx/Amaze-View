export const openCommentModel = (args: any) => {
  return (dispatch: any) => {
    dispatch({
      type: "OPEN_COMMENT_MODEL",
      payload: { data: args },
    });
  };
};

export const CloseCommentModel = () => {
  return (dispatch: any) => {
    dispatch({ type: "CLOSE_COMMENT_MODEL" });
  };
};
