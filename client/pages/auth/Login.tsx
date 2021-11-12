import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import router from "next/router";

const LoginQuery = gql`
  mutation Login($userName: String, $password: String, $email: String) {
    Login(userName: $userName, email: $email, password: $password) {
      message
      shouldLogin
      token
    }
  }
`;

const Login: React.FunctionComponent = (): JSX.Element => {
  const [LoginInputVariables, { data, loading, error }] =
    useMutation(LoginQuery);
  const [userLoginDetails, setUserLoginDetails] = useState({
    email_userName: "",
    password: "",
  });

  useEffect(() => {
    console.log("server response => ", data);
    if (data?.Login?.shouldLogin) {
      router.push("/Home");
    }
  }, [data]);

  const handleSubmit = (event: any): any => {
    event.preventDefault();
    const { email_userName, password } = userLoginDetails;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email_userName)) {
      const userWithUsername = {
        userName: email_userName,
        password,
      };
      console.log(userWithUsername);
      LoginInputVariables({
        variables: {
          userName: userWithUsername.userName,
          password: userWithUsername.password,
        },
      });
      return userWithUsername;
    }
    const userWithEmail = {
      email: email_userName,
      password,
    };
    LoginInputVariables({
      variables: {
        email: userWithEmail.email,
        password: userWithEmail.password,
      },
    });
    console.log(userWithEmail);
    return userWithEmail;
  };

  const handleChange = (event: any): void => {
    setUserLoginDetails((previousData) => ({
      ...previousData,
      [event.target.name]: event.target.value,
    }));
  };

  if (loading) return <h3>Loading...</h3>;

  return (
    <div>
      <h1>login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email or userName"
          type="text"
          name="email_userName"
          onChange={handleChange}
        />
        <input
          placeholder="password"
          type="text"
          name="password"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
