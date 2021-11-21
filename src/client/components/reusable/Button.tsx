import React from "react";
import styles from "./Button.module.scss";

interface IButton {
  label?: string;
  type: "submit" | "button";
  style?: any;
  size?: "small" | "medium" | "large";
}

const handleBtnSize = (
  size: "small" | "medium" | "large" | undefined
): { height: string; width: string; fontSize: string } => {
  switch (size) {
    case "small":
      return { height: "35px", width: "100px", fontSize: "1rem" };

    case "medium":
      return { height: "50px", width: "180px", fontSize: "1.6rem" };

    case "large":
      return { height: "60px", width: "230px", fontSize: "2rem" };

    default:
      return { height: "80px", width: "200px", fontSize: "1rem" };
  }
};

const Button: React.FunctionComponent<IButton> = ({
  label,
  type,
  style,
  size,
}): JSX.Element => {
  return (
    <button
      className={styles.btn}
      type={type}
      style={{ ...handleBtnSize(size), ...style }}
    >
      {label}
    </button>
  );
};

Button.defaultProps = {
  label: "Amaze View",
  type: "button",
  size: "small",
};

export default Button;
