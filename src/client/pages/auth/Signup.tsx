import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import router from "next/router";
import TextField from "@components/reusable/TextField";
import Button from "@components/reusable/Button";
import Logo from "@components/reusable/Logo";
import AmazeLoader from "@components/reusable/Loader";
import styles from "@styles/Signup.module.scss";

const RegisterUserQuery = gql`
  mutation RegisterUser(
    $userName: String!
    $password: String!
    $phoneNumber: String!
    $email: String!
  ) {
    RegisterUser(
      userName: $userName
      password: $password
      phoneNumber: $phoneNumber
      email: $email
    ) {
      token
      data {
        id
        userName
        firstName
        lastName
        email
        gender
        age
        password
        phoneNumber
      }
    }
  }
`;

const user = {
  userName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirm_password: "",
};

const SignUp: React.FunctionComponent = (): JSX.Element => {
  const [RegisterUserInput, { data, loading, error }] =
    useMutation(RegisterUserQuery);
  const [userLoginDetails, setUserLoginDetails] = useState({
    ...user,
  });
  const [FormErros, setFormErrors] = useState<any>({
    ...user,
  });

  useEffect(() => {
    const token = localStorage.getItem("auth-Token");
    if (token) {
      router.push("/Home");
    }
  }, []);

  useEffect(() => {
    if (data?.RegisterUser?.token) {
      localStorage.setItem("auth-Token", data?.RegisterUser?.token);
      router.push("/Home");
    }
  }, [data]);

  const handleValidation = (): boolean => {
    let formIsValid = true;
    let errors = {
      ...user,
      passwordEqual: "password should be equal",
    };

    if (!userLoginDetails["userName"]) {
      formIsValid = false;
      errors["userName"] = "userName Cannot be empty";
    }
    if (
      !userLoginDetails["email"] ||
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        userLoginDetails["email"]
      )
    ) {
      formIsValid = false;
      errors["email"] = "email Cannot be empty";
    }
    if (!userLoginDetails["phoneNumber"]) {
      formIsValid = false;
      errors["phoneNumber"] = "Phone number Cannot be empty";
    }
    if (!userLoginDetails["password"]) {
      formIsValid = false;
      errors["password"] = "password Cannot be empty";
    }
    if (!userLoginDetails["confirm_password"]) {
      formIsValid = false;
      errors["confirm_password"] = "confirm password be empty";
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
      try {
        RegisterUserInput({
          variables: {
            ...userLoginDetails,
          },
        });
        alert("form submitted");
      } catch (err) {
        console.log(err);
      }
    }
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
            <span style={{ color: "red" }}>{FormErros["userName"]}</span>
            <TextField
              label="Email"
              type="text"
              Icon="email"
              name="email"
              onChange={handleChange}
              value={userLoginDetails.email}
            />
            <span style={{ color: "red" }}>{FormErros["email"]}</span>
            <TextField
              label="Phone number"
              type="number"
              Icon="phone"
              name="phoneNumber"
              onChange={handleChange}
              value={userLoginDetails.phoneNumber}
            />
            <span style={{ color: "red" }}>{FormErros["phoneNumber"]}</span>
            <TextField
              label="Password"
              type="password"
              Icon="password"
              name="password"
              onChange={handleChange}
              value={userLoginDetails.password}
            />
            <span style={{ color: "red" }}>{FormErros["password"]}</span>
            <TextField
              label="Confirm password"
              type="password"
              Icon="password"
              name="confirm_password"
              onChange={handleChange}
              value={userLoginDetails.confirm_password}
            />
            <span style={{ color: "red" }}>
              {FormErros["confirm_password"]}
            </span>

            <div>
              <Button
                style={{ marginTop: "20px" }}
                type="submit"
                label="Submit"
                size="medium"
              />
            </div>
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
