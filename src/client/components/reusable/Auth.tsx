import React, { useEffect } from "react";
import cookie from "cookie";
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
      document.cookie = cookie.serialize("authToken", "");
      router.push("/auth/Login");
    }
  }, [data]);

  return <>{children}</>;
};

export default Auth;
