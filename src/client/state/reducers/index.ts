import { CombinedState, combineReducers, Reducer } from "redux";
import { create_post_model_reducer } from "./create_post_model_reducer";
import { comment_model_reducer } from "./comment_model_reducers";
import { get_all_post_data } from "./get_all_post_data";

export const reducers = combineReducers({
  create_post_model_reducer,
  comment_model_reducer,
  get_all_post_data,
});

export type RootState = ReturnType<typeof reducers>;
