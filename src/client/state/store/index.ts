import {
  createStore,
  applyMiddleware,
  EmptyObject,
  Store,
  AnyAction,
} from "redux";
import thunk from "redux-thunk";
import { reducers } from "state/reducers";

export const store: Store<
  EmptyObject & {
    create_post_model_reducer: {
      shouldOpen: boolean;
    };
  },
  AnyAction
> & {
  dispatch: unknown;
} = createStore(
  reducers,
  { create_post_model_reducer: { shouldOpen: false } },
  applyMiddleware(thunk)
);
