import React from "react";
import cn from "classnames";
import styles from "./Code.module.sass";
import Loader from "../../../components/Loader";
import { useTranslation } from "react-i18next";

const Code = ({onConfirm}) => {
  const {t} = useTranslation()
  return (
    <div className={styles.code}>
      <div className={styles.body}>
        <div className={styles.info}>
          {t('sign.send_a_verify_code')}
        </div>
        <div className={styles.fieldset}>
          <div className={styles.field}>
            <input
              className={styles.input}
              name="number1"
              type="tel"
              autocomplete="off"
              required
            />
          </div>
          <div className={styles.field}>
            <input
              className={styles.input}
              name="number2"
              type="tel"
              autocomplete="off"
              required
            />
          </div>
          <div className={styles.field}>
            <input  className={styles.input}   name="number3" type="tel"  autocomplete="off"  required/>
          </div>
          <div className={styles.field}>
            <input className={styles.input} name="number4"
              type="tel"
              autocomplete="off"
              required
            />
          </div>
        </div>
        <div className={styles.errorNote}>
        {t('sign.incorrect_code')}
        </div>
        <button className={cn("button", styles.button)} onClick={onConfirm}>
          <Loader className={styles.loader} white />
          <span>{t('sign.continue')}</span>
        </button>
        <div className={styles.note}>
          {t('sign.protected_to_recaptcha')}
        </div>
      </div>
    </div>
  );
};

export default Code;
