import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import router from "next/router";
import TextField from "../../components/reusable/TextField";
import Button from "../../components/reusable/Button";
import Logo from "../../components/reusable/Logo";
import AmazeLoader from "../../components/reusable/Loader";
import styles from "../../styles/Login.module.scss";

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
    <div className={styles.Login_container}>
      <div className={styles.Logo_wrapper}>
        <Logo size="medium" />
      </div>
      <div className={styles.Login_form_container}>
        <div className={styles.form}>
          <div>
            <h1>Login</h1>
            <p>
              Welcome! Please fill userName/Email and your Password to sign in
              into your account
            </p>
          </div>
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
              type="password"
              name="password"
              onChange={handleChange}
              Icon="password"
              value={userLoginDetails.password}
            />
            <Button type="submit" label="Submit" size="medium" />
          </form>
        </div>
      </div>
      <div className={styles.Login_right_wallpaper}>
        <div className={styles.Login_right_wallpaper_children}>
          <h2>
            <div className={styles.heading_line}></div>Start Exploring Now
          </h2>
          <p>
            Amaze-View is a platform gives you a change to share your exploring
            views to the world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
