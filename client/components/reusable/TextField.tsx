import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faUser,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

import style from "./TextField.module.scss";

interface ITextField {
  label: string;
  type: string;
  onChange?: any;
  value?: number | string | undefined;
  name?: string;
  length?: number;
  Icon?: string;
}

const handleIcon = (Icon: string) => {
  switch (Icon) {
    case "eye":
      return faEye;
    case "hideEye":
      return faEyeSlash;
    case "user":
      return faUser;
    case "password":
      return faLock;

    default:
      return faEye;
  }
};

const TextField: React.FunctionComponent<ITextField> = ({
  label,
  type,
  onChange,
  value,
  name,
  length,
  Icon,
}): JSX.Element => {
  return (
    <div className={style.text_area}>
      <label>{label}</label>
      <div className={style.input_container}>
        <input
          type={type}
          name={name}
          onChange={onChange}
          value={value}
          maxLength={length}
        />
        {Icon ? <FontAwesomeIcon size="1x" icon={handleIcon(Icon)} /> : null}
      </div>
    </div>
  );
};

export default TextField;
