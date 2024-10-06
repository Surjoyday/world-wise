import { useEffect, useState } from "react";
import { PageNavBar } from "@common/components";
import styles from "./Login.module.css";
import { useAuth } from "@main/context/FakeAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@common/components";
import { Message } from "@details/components";

export default function Login() {
  const { login, isAuthenticated, error } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("sagar@example.com");
  const [password, setPassword] = useState("P@ssw0rd");

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.login}>
      <PageNavBar />
      {error !== "" && <Message message={`❌${error}`} />}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          {/* <button className="cta" onClick={handleLogin}>
            Login
          </button> */}
          <Button>Login</Button>
        </div>
      </form>
    </main>
  );
}
