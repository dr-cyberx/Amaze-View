import React from "react";
import StandardView from "./StandardWidth";
import styles from "../../styles/Navbar.module.scss";

const Navbar: React.FunctionComponent = (): JSX.Element => {
  return (
    <div className={styles.navbar_container}>
      <StandardView>
        <div className={styles.navbar}>
          <h4>hello</h4>
        </div>
      </StandardView>
    </div>
  );
};

export default Navbar;
