import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import router from "next/router";
import TextField from "@components/reusable/TextField";
import Button from "@components/reusable/Button";
import Logo from "@components/reusable/Logo";
import AmazeLoader from "@components/reusable/Loader";
import styles from "@styles/Signup.module.scss";

const LoginQuery = gql`
  mutation Login($userName: String, $password: String, $email: String) {
    Login(userName: $userName, email: $email, password: $password) {
      message
      shouldLogin
      token
    }
  }
`;

const SignUp: React.FunctionComponent = (): JSX.Element => {
  const [LoginInputVariables, { data, loading, error }] =
    useMutation(LoginQuery);
  const [userLoginDetails, setUserLoginDetails] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirm_password: "",
  });
  const [FormErros, setFormErrors] = useState<any>();

  const handleValidation = (): boolean => {
    let formIsValid = true;
    let errors = {
      userName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirm_password: "",
      passwordEqual: "",
    };

    if (!userLoginDetails["userName"]) {
      formIsValid = false;
      errors["userName"] = "userName Cannot be empty";
    }
    if (!userLoginDetails["email"]) {
      formIsValid = false;
      errors["email"] = "email Cannot be empty";
    }
    if (!userLoginDetails["phoneNumber"]) {
      formIsValid = false;
      errors["userName"] = "Phone number Cannot be empty";
    }
    if (!userLoginDetails["password"]) {
      formIsValid = false;
      errors["userName"] = "password Cannot be empty";
    }
    if (!userLoginDetails["userName"]) {
      formIsValid = false;
      errors["userName"] = "confirm password be empty";
    }

    if (userLoginDetails["password"] !== userLoginDetails["confirm_password"]) {
      formIsValid = false;
      errors["passwordEqual"] = "password & confirm password should be same";
    }

    setFormErrors(errors);
    return formIsValid;
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (handleValidation()) {
      alert("form submitted");
    } else {
      alert("form has errors");
    }
    console.log("register_Details => ");
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
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <TextField
              label="userName"
              type="text"
              Icon="user"
              name="userName"
              onChange={handleChange}
              value={userLoginDetails.userName}
            />
            <TextField
              label="Email"
              type="text"
              Icon="email"
              name="email"
              onChange={handleChange}
              value={userLoginDetails.email}
            />
            <TextField
              label="Phone number"
              type="number"
              Icon="phone"
              name="phoneNumber"
              onChange={handleChange}
              value={userLoginDetails.phoneNumber}
            />
            <TextField
              label="Password"
              type="password"
              Icon="password"
              name="password"
              onChange={handleChange}
              value={userLoginDetails.password}
            />
            <TextField
              label="Confirm password"
              type="password"
              Icon="password"
              name="confirm_password"
              onChange={handleChange}
              value={userLoginDetails.confirm_password}
            />
            <Button
              style={{ marginTop: "20px" }}
              type="submit"
              label="Submit"
              size="medium"
            />
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

export default SignUp;

// Object.keys(userLoginDetails).map((item) => {

// });
