import { useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";

export default function Login() {
  const [email, setEmail] = useState("sagar@example.com");
  const [password, setPassword] = useState("justrandom");

  return (
    <main className={styles.login}>
      <PageNav />
      <form>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
    </main>
  );
}
