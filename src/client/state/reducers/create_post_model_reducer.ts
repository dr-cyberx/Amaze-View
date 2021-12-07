export const create_post_model_reducer = (
  state = { shouldOpen: true },
  actions: any
) => {
  switch (actions.type) {
    case "OPEN_CREATE_POST_MODEL":
      return {
        ...state,
        shouldOpen: true,
      };
    case "CLOSE_CREATE_POST_MODEL":
      return {
        ...state,
        shouldOpen: false,
      };

    default:
      return state;
  }
};
