import React from "react";
import cn from "classnames";
import styles from "./ForgotPassword.module.sass";
import { use100vh } from "react-div-100vh";
import { Link } from "react-router-dom";
import Image from "../../components/Image";
import Entry from "./Entry";
import Code from "./Code";
import { Routes } from "../../Constants";
const items = [
  "Unlimited product uploads",
  "Pro tips",
  "Free forever",
  "Full author options",
];
const ForgotPassword = () => {
  const [visible, setVisible] = React.useState(false);
  const heightWindow = use100vh();

  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <div className={styles.wrap}>
          <div className={styles.preview}>
            <img src="/images/content/login-pic.png" alt="Login" />
          </div>
          <div className={cn("h4", styles.subtitle)}>Plan includes</div>
          <ul className={styles.list}>
            {items.map((x, index) => (
              <li key={index}>{x}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.col} style={{ minHeight: heightWindow }}>
        <div className={styles.head}>
          <Link className={styles.logo} >
            <Image
              className={styles.pic}
              src="/images/logo_onograph.png"
              srcDark="/images/logo-onograph-blanc.png"
              alt="Core"
            />
          </Link>
          <div className={styles.info}>
          Already a member?{" "}
            <Link className={styles.link} to={Routes.SIGN_IN}>
              Sign in
            </Link>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={cn("h2", styles.title)}>Forgot password</div>
          {visible ? <Entry onConfirm={() => setVisible(false)} /> : <Code />}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
