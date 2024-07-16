import React from "react";
import cn from "classnames";
import styles from "./Code.module.sass";
import Loader from "../../../components/Loader";
import { Link } from "react-router-dom";
import { Routes } from "../../../Constants";

const Success = () => {
  return (
    <div className={styles.code}>
      <div className={styles.body}>
        <div className={styles.info}> 
          Your account has been successfully created. Click on the button below to connect to your space
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
          <span>Sign in</span>
        </Link>
        <div className={styles.note}>
          This site is protected by reCAPTCHA and the Google Privacy Policy.
        </div>
      </div>
    </div>
  );
};

export default Success;
