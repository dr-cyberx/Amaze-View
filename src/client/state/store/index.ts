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
    comment_model_reducer: {
      shouldOpen: boolean;
      args: any;
    };
    get_all_post_data: {
      data: any;
      error: any;
      loading: any;
      refetchAll: any;
    };
  },
  any
> & {
  dispatch: unknown;
} = createStore(
  reducers,
  {
    create_post_model_reducer: { shouldOpen: false },
    comment_model_reducer: { shouldOpen: false, args: null },
    get_all_post_data: {
      data: null,
      error: null,
      loading: null,
      refetchAll: null,
    },
  },
  applyMiddleware(thunk)
);
