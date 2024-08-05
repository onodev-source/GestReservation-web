import React from "react";
import cn from "classnames";
import styles from "./Code.module.sass";
import Loader from "../../../components/Loader";
import { Link } from "react-router-dom";
import { Routes } from "../../../Constants";
import { useTranslation } from "react-i18next";

const Success = () => {
  const {t} = useTranslation()

  return (
    <div className={styles.code}>
      <div className={styles.body}>
        <div className={styles.info}> {t('sign.account_created_successfully')}
        </div>
        {/*<div className={styles.fieldset}>
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
          The code you entered is incorrect.
        </div>*/}
        <Link className={cn("button", styles.button)} to={Routes.SIGN_IN}>
          <Loader className={styles.loader} white />
          <span>{t('sign.sign_in')}</span>
        </Link>
        <div className={styles.note}>{t('sign.protected_to_recaptcha')}</div>
      </div>
    </div>
  );
};

export default Success;
