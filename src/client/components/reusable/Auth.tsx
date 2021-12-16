import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import IS_AUTH from "@graphql-documents/IS_AUTH.graphql";

interface IAuth {
  children: React.ReactNode;
}

const Auth: React.FC<IAuth> = ({ children }): JSX.Element => {
  const { data, loading, error } = useQuery(IS_AUTH);
  const router = useRouter();

  useEffect(() => {
    if (data?.isUserAuth === false) {
      localStorage.removeItem("auth-Token");
      router.push("/auth/Login");
      // return;
    }
    console.log(data?.isUserAuth);
  }, [data]);

  return <>{children}</>;
};

export default Auth;
