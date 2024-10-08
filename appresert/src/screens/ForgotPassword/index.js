import React from "react";
import cn from "classnames";
import styles from "./ForgotPassword.module.sass";
import { use100vh } from "react-div-100vh";
import { Link } from "react-router-dom";
import Image from "../../components/Image";
import Entry from "./Entry";
import Code from "./Code";
import { Routes } from "../../Constants";
import { useTranslation } from "react-i18next";
const items = [
  "Unlimited product uploads",
  "Pro tips",
  "Free forever",
  "Full author options",
];
const ForgotPassword = () => {
  const {t} = useTranslation()
  const [visible, setVisible] = React.useState(true);
  const heightWindow = use100vh();
  
  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <div className={styles.wrap}>
          <div className={styles.preview}>
            <img src="/images/content/login-pic.png" alt="Login" />
          </div>
          <div className={cn("h4", styles.subtitle)}>{t('sign.plan_include')}</div>
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
            {t('sign.already_menber')}{" "}
            <Link className={styles.link} to={Routes.SIGN_IN}>
              {t('sign.sign_in')}
            </Link>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={cn("h2", styles.title)}>{t('sign.forgot_password')}</div>
          {/*visible ? <Entry onConfirm={() => setVisible(false)} /> : <Code />*/}
          <Entry onConfirm={() => setVisible(false)} />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
