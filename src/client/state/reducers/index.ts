import { AnyAction, CombinedState, combineReducers, Reducer } from "redux";
import { create_post_model_reducer } from "./create_post_model_reducer";

export const reducers: Reducer<
  CombinedState<{
    create_post_model_reducer: {
      shouldOpen: boolean;
    };
  }>,
  AnyAction
> = combineReducers({
  create_post_model_reducer,
});

export type RootState = ReturnType<typeof reducers>;
