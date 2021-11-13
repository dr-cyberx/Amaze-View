import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import router from "next/router";
import TextField from "../../components/reusable/TextField";
import Button from "../../components/reusable/Button";
import AmazeLoader from "../../components/reusable/Loader";

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
    const token = localStorage.getItem("auth-Token");
    if (token) {
      router.push("/Home");
    }
  }, []);

  useEffect(() => {
    console.log("server response => ", data);
    if (data?.Login?.shouldLogin) {
      localStorage.setItem("auth-Token", data?.Login?.token);
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

      try {
        LoginInputVariables({
          variables: {
            userName: userWithUsername.userName,
            password: userWithUsername.password,
          },
        });
      } catch (error) {
        console.log(error);
      }

      return userWithUsername;
    }

    const userWithEmail = {
      email: email_userName,
      password,
    };

    try {
      LoginInputVariables({
        variables: {
          email: userWithEmail.email,
          password: userWithEmail.password,
        },
      });
    } catch (error) {
      console.log(error);
    }

    return userWithEmail;
  };

  const handleChange = (event: any): void => {
    setUserLoginDetails((previousData) => ({
      ...previousData,
      [event.target.name]: event.target.value,
    }));
  };

  if (loading) return <AmazeLoader data={data} />;

  return (
    <div>
      <h1>login Page</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email or userName"
          type="text"
          Icon="user"
          name="email_userName"
          onChange={handleChange}
          value={userLoginDetails.email_userName}
        />
        <TextField
          label="Password"
          type="text"
          name="password"
          onChange={handleChange}
          Icon="password"
          value={userLoginDetails.password}
        />
        <Button type="submit" label="Submit" size="medium" />
      </form>
    </div>
  );
};

export default Login;
