import { Sidebar, Map } from "@main/components";
import styles from "./AppLayout.module.css";
import { User } from "@details/components";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <User />
      <Map />
    </div>
  );
}

export default AppLayout;
