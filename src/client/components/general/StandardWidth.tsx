import React from "react";
import style from "../../styles/StandardView.module.scss";

interface IChildren {
  children: JSX.Element;
}

const StandardView: React.FC<IChildren> = ({ children }): JSX.Element => {
  return <div className={style.StandardView}>{children}</div>;
};

export default StandardView;
