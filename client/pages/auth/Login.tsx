import React, { useState } from "react";

const Login: React.FunctionComponent = (): JSX.Element => {
  const [userLoginDetails, setUserLoginDetails] = useState({
    email_userName: "",
    password: "",
  });

  const handleSubmit = (event: any): any => {
    event.preventDefault();
    const { email_userName, password } = userLoginDetails;
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email_userName)) {
      const userWithUsername = {
        userName: email_userName,
        password,
      };
      console.log(userWithUsername);
      return userWithUsername;
    }
    const userWithEmail = {
      email: email_userName,
      password,
    };
    console.log(userWithEmail);

    return userWithEmail;
  };

  const handleChange = (event: any): void => {
    setUserLoginDetails((previousData) => ({
      ...previousData,
      [event.target.name]: event.target.value,
    }));
  };
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
