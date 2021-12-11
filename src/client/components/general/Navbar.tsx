import React from "react";
import {NextRouter, useRouter} from 'next/router';
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
  const router: NextRouter = useRouter();
  console.log("current path => ", router.pathname.includes("/Home"));

  const handleLinkColor = (path: string) : {color: string} => {
    if(router.pathname.includes(path)){
      return {color: 'rgb(29, 154, 212)'};
    }
    return {color: '#696969'}
  }; 

  return (
    <div className={styles.navbar_container}>
      <StandardView>
        <div className={styles.navbar}>
          <div className={styles.navbar_logo}>
            <Logo size="small" />
          </div>
          <ul className={styles.nav_links}>
            <li onClick={() => router.push("/Home")} style={handleLinkColor("/Home")}>
              <FontAwesomeIcon size="1x" icon={faHome} /> Home
            </li>
            <li onClick={() => router.push("/SearchFeed")} style={handleLinkColor("/SearchFeed")}>
              <FontAwesomeIcon size="1x" icon={faSearch} /> Search
            </li>
            <li onClick={() => router.push("/notification")} style={handleLinkColor("/notification")}>
              <FontAwesomeIcon size="1x" icon={faBell} /> Notification
            </li>
            <li onClick={() => router.push("/Profile")} style={handleLinkColor("/Profile")}>
              <FontAwesomeIcon size="1x" icon={faUser} /> Profile
            </li>
          </ul>
        </div>
      </StandardView>
    </div>
  );
};

export default Navbar;
