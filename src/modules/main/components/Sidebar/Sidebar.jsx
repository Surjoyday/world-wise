import { Logo, Footer } from "@common/components";
import { AppNavBar } from "@main/components";

import styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Sidebar;
