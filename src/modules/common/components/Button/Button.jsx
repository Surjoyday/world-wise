import styles from "./Button.module.css";

function Button({ children, type = "primary", ...props }) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
