import React from "react";
import cn from "classnames";
import styles from "./FaqView.module.sass";
import { use100vh } from "react-div-100vh";
import { Link } from "react-router-dom";
import Image from "../../components/Image";
import { Routes } from "../../Constants";
import { useTranslation } from "react-i18next";
import Faq from "./Faq";

const FaqView = () => {
  const {t} = useTranslation()
  const heightWindow = use100vh();

  const items = [
    t("sign.include.text1"),
    t("sign.include.text2"),
    t("sign.include.text3"),
  ];

  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <div className={styles.wrap}>
          <div className={styles.preview}>
            <img src="/images/content/login-pic.png" alt="Login" />
          </div>
          <div className={cn("h4", styles.subtitle)}>{t('sign.plan_include')}</div>
          <ul className={styles.list}>
            {items?.map((x, index) => (
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
            {t('sign.not_have_account')}{" "}
            <Link className={styles.link} to={Routes.SIGN_UP}>
              {t('sign.sign_up')}
            </Link>
          </div>
        </div>
        <div className={styles.wrapper}>
          {/*<div className={cn("h2", styles.title)}>{t('sign.sign_in')}</div>*/}
          <Faq/>
        </div>
      </div>
    </div>
  );
};

export default FaqView;
