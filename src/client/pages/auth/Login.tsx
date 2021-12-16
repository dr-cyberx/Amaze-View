/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import router from "next/router";
import Link from "next/link";
import LOGIN from "@graphql-documents/LOGIN.graphql";
import TextField from "@components/reusable/TextField";
import Button from "@components/reusable/Button";
import Logo from "@components/reusable/Logo";
import AmazeLoader from "@components/reusable/Loader";
import styles from "@styles/Login.module.scss";

const loginCreds = {
  email_userName: "",
  password: "",
};

const Login: React.FunctionComponent = (): JSX.Element => {
  const [LoginInputVariables, { data, loading, error }] = useMutation(LOGIN);
  const [userLoginDetails, setUserLoginDetails] = useState({
    ...loginCreds,
  });
  const [FormErros, setFormErrors] = useState<any>({
    ...loginCreds,
  });

  // useEffect(() => {
  //   const token = localStorage.getItem("auth-Token");
  //   if (token) {
  //     router.push("/Home");
  //   }
  // }, []);

  useEffect(() => {
    if (data?.Login?.shouldLogin) {
      const res = localStorage.setItem("auth-Token", data?.Login?.token);
      console.log("res ---> ", res);
      window.location.replace('/Home');
    }
  }, [data]);

  const validateLoginCreds = (): boolean => {
    let isFormValid = true;
    let errors = {
      ...loginCreds,
    };
    if (!userLoginDetails["email_userName"]) {
      isFormValid = false;
      errors["email_userName"] = "Email or userName is required!";
    }
    if (!userLoginDetails["password"]) {
      isFormValid = false;
      errors["password"] = "Password is required!";
    }

    setFormErrors(errors);
    return isFormValid;
  };

  const handleSubmit = (event: any): any => {
    event.preventDefault();
    if (validateLoginCreds()) {
      const { email_userName, password } = userLoginDetails;

      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email_userName)
      ) {
        const userWithUsername = {
          userName: email_userName,
          password,
        };

        try {
          console.log("tired");
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
    }
  };

  const handleChange = (event: any): void => {
    setUserLoginDetails((previousData) => ({
      ...previousData,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className={styles.Login_container}>
      {loading && <AmazeLoader data={data} />}
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
            <span style={{ color: "red", marginTop: "-13px" }}>
              {FormErros["email_userName"]}
            </span>
            <TextField
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
              Icon="password"
              value={userLoginDetails.password}
            />
            <span style={{ color: "red", marginTop: "-13px" }}>
              {FormErros["password"]}
            </span>
            <Button type="submit" label="Submit" size="medium" />
          </form>

          <Link href={"/auth/Signup"} passHref>
            <span className={styles.linkSpan} style={{ cursor: "pointer" }}>
              Don't have Account?
            </span>
          </Link>
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

export default React.memo(Login);
