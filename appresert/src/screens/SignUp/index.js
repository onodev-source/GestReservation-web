import React, { useState } from "react";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { use100vh } from "react-div-100vh";
import styles from "./SignUp.module.sass";
import { Link } from "react-router-dom";
import Entry from "./Entry";
import Code from "./Code";
import Image from "../../components/Image";
import { Routes } from "../../Constants";
import Success from "./Success";

const items = [
  "Unlimited product uploads",
  "Pro tips",
  "Free forever",
  "Full author options",
];

const SignUp = () => {
  const {t} = useTranslation()
  const [visible, setVisible] = useState(true);
  const [success, setSuccess] = useState(false);
  const heightWindow = use100vh();

  const changeState = () => {
    setVisible(false)
    setSuccess(true)
  }


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
        <div className={cn(styles.wrapper, {[styles.success] : success})}>
          <div className={cn("h2", styles.title)}>
            {success ? (
              <> {t('sign.congratulation')} ! 🎉🎉 </>
            ) : (
              <> {t('sign.sign_up')}</>
            )}
          </div>
          {/*!visible && !success  &&
                <Code onConfirm={() => setSuccess(true)}/>
              :*/}
          {visible ? 
            <Entry onConfirm={changeState} />
            : ( success  &&
                <Success/>
            )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
