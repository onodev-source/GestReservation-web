import React from "react";
import cn from "classnames";
import styles from "./Entry.module.sass";
import TextInput from "../../../components/TextInput";
import Image from "../../../components/Image";
import { useTranslation } from "react-i18next";

const Entry = ({ onConfirm }) => {
  const {t} = useTranslation()
   
  return (
    <div className={styles.entry}>
      <div className={styles.head}>
        <div className={styles.info}>{t('sign.signup_with_open_account')}</div>
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
        <div className={styles.info}>{t('sign.continue_with_email')}</div>
        <TextInput className={styles.field} name="name"  type="text" placeholder={t('sign.name')} required />
        <TextInput  className={styles.field}  name="tel"  type="tel" placeholder={t('sign.phone_number')} required  icon="phone" />
        <TextInput className={styles.field}  name="email" type="email" placeholder={t('sign.email')} required  icon="mail"/>
        <TextInput className={styles.field} name="password" type="password"  placeholder={t('sign.password')} required icon="lock" />
        <button className={cn("button", styles.button)} onClick={onConfirm}>
          {t('sign.continue')}
        </button>
        <div className={styles.note}>
          {t('sign.protected_to_recaptcha')}
        </div>
      </div>
    </div>
  );
};

export default Entry;
