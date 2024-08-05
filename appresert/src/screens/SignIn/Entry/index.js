import React from "react";
import cn from "classnames";
import styles from "./Entry.module.sass";
import TextInput from "../../../components/TextInput";
import Image from "../../../components/Image";
import { Link } from "react-router-dom";
import { Routes } from "../../../Constants";
import { useTranslation } from "react-i18next";

const Entry = ({ onConfirm }) => {
  const {t} = useTranslation()

 
  return (
    <div className={styles.entry}>
    <div className={styles.head}>
      <div className={styles.subtitle}>{t('sign.signin_with_open_account')}</div>
      <div className={styles.btns}>
        <button className={cn("button-stroke", styles.button)}>
          <img src="/images/content/google.svg" alt="Google" />
          Google
        </button>
        <button className={cn("button-stroke", styles.button)}>
          <Image
            className={styles.pic}
            src="/images/content/apple-dark.svg"
            srcDark="/images/content/apple-light.svg"
            alt="Apple"
          />
          Apple ID
        </button>
      </div>
    </div>
    <div className={styles.body}>
      <div className={styles.subtitle}>{t('sign.continue_with_email')}</div>
      <TextInput className={styles.field}  name="email"  type="email"
        placeholder={t('sign.email')}  required  icon="mail"
      />
      <TextInput className={styles.field}
        name="password" type="password"  placeholder={t('sign.password')}
        required icon="lock"
      />
      <Link className={cn(styles.link, styles.linkPwd)} to={Routes.FORGOT_PASS}>
        {t('sign.forgot_pass')}
      </Link>
      <button className={cn("button", styles.button)}>Sign in</button>
      <div className={styles.note}>
        {t('sign.protected_to_recaptcha')}
      </div>
      <div className={styles.info}>
        {t('sign.not_have_account')}{"  "}
        <Link className={cn(styles.link, styles.linkPwd)} to={Routes.SIGN_UP}>
          {t('sign.sign_up')}
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Entry;
