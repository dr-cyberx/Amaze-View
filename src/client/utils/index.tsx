import React, { createContext, useEffect, useReducer } from "react";

export const AmazeContext: React.Context<any> = createContext(null);

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "OPEN_MODEL":
      return {
        ...state,
        openPostModel: true,
      };
    case "CLOSE_MODEL":
      return {
        ...state,
        openPostModel: false,
      };
    case "OPEN_COMMENT_MODEL":
      return {
        ...state,
        openCommentModel: {
          shouldbe: true,
          postId: action.payload.postId,
        },
      };
    case "CLOSE_COMMENT_MODEL":
      return {
        ...state,
        openCommentModel: {
          shouldbe: false,
          postId: null,
        },
      };
    default:
      break;
  }
};

export const AmazeProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, {
    openPostModel: false,
    openCommentModel: { shouldbe: false, postId: null },
  });


  const OpenPost = () => dispatch({ type: "OPEN_MODEL" });

  const ClosePost = () => dispatch({ type: "CLOSE_MODEL" });

  const openCommentModel = ( postId: any): void => {
    dispatch({
      type: "OPEN_COMMENT_MODEL",
      payload: { postId },
    });
  };

  const CloseCommentModel = (): void =>
    dispatch({ type: "CLOSE_COMMENT_MODEL" });

  return (
    <AmazeContext.Provider
      value={{
        OpenPost,
        ClosePost,
        openCommentModel,
        CloseCommentModel,
        state,
      }}
    >
      {children}
    </AmazeContext.Provider>
  );
};
