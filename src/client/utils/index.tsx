import React, { createContext, useReducer } from "react";

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
    default:
      break;
  }
};

export const AmazeProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, {
    openPostModel: false,
  });

  const OpenPost = () => {
    dispatch({ type: "OPEN_MODEL" });
  };

  const ClosePost = () => {
    dispatch({ type: "CLOSE_MODEL" });
  };

  return (
    <AmazeContext.Provider value={{ OpenPost, ClosePost, state }}>
      {children}
    </AmazeContext.Provider>
  );
};
