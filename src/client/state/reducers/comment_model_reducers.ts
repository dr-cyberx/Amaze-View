export const comment_model_reducer = (
  state = { shouldOpen: true, args: null },
  actions: any
) => {
  switch (actions.type) {
    case "OPEN_COMMENT_MODEL":
      return {
        ...state,
        shouldOpen: true,
        args: actions.payload.data,
      };
    case "CLOSE_COMMENT_MODEL":
      return {
        ...state,
        shouldOpen: false,
        args: null,
      };

    default:
      return state;
  }
};
