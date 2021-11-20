import React from "react";
import StandardView from "./StandardWidth";
import Logo from "@components/reusable/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faBell,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import styles from "@styles/Navbar.module.scss";
import router from "next/router";

const Navbar: React.FunctionComponent = (): JSX.Element => {
  return (
    <div className={styles.navbar_container}>
      <StandardView>
        <div className={styles.navbar}>
          <div className={styles.navbar_logo}>
            <Logo size="small" />
          </div>
          <ul className={styles.nav_links}>
            <li onClick={() => router.push("/Home")}>
              <FontAwesomeIcon size="1x" icon={faHome} /> Home
            </li>
            <li onClick={() => router.push("/SearchFeed")}>
              <FontAwesomeIcon size="1x" icon={faSearch} /> Search
            </li>
            <li onClick={() => router.push("/SearchFeed")}>
              <FontAwesomeIcon size="1x" icon={faBell} /> Notification
            </li>
            <li onClick={() => router.push("/SearchFeed")}>
              <FontAwesomeIcon size="1x" icon={faUser} /> Profile
            </li>
          </ul>
        </div>
      </StandardView>
    </div>
  );
};

export default Navbar;
