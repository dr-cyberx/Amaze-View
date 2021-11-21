import React from "react";
import Loader from "react-loader-spinner";

interface IAmazeLoader {
  data?: boolean;
}

const AmazeLoader: React.FC<IAmazeLoader> = ({ data }): JSX.Element => {
  console.log(data);
  return (
    <div style={{ position: "absolute", top: "45%", left: "45%" }}>
      <Loader
        type="ThreeDots"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
        visible={data}
        // color
      />
    </div>
  );
};

AmazeLoader.defaultProps = {
  data: true,
};

export default AmazeLoader;
