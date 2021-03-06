import React from "react";
import Image from "next/image";

interface ILogo {
  size: string;
}

const handleHeight = (size: string): string => {
  switch (size) {
    case "small":
      return "60px";
    case "medium":
      return "100px";
    case "large":
      return "150px";
    default:
      return "100px";
  }
};

const handleWidth = (size: string): string => {
  switch (size) {
    case "small":
      return "200";
    case "medium":
      return "350px";
    case "large":
      return "400";
    default:
      return "350";
  }
};

const Logo: React.FunctionComponent<ILogo> = ({ size }): JSX.Element => {
  return (
    <Image
      alt="Mountains"
      src="/amazeViewLogo.jpg"
      objectFit="cover"
      height={handleHeight(size)}
      width={handleWidth(size)}
      // height="100px"
      // width="350px"
    />
  );
};

Logo.defaultProps = {
  size: "medium",
};

export default Logo;
