import { useNavigate } from "react-router-dom";
import styles from "./User.module.css";
import { useAuth } from "@main/context/FakeAuth";

function User() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Log out</button>
    </div>
  );
}

export default User;
