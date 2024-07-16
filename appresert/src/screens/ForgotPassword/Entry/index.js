import React from "react";
import cn from "classnames";
import styles from "./Entry.module.sass";
import TextInput from "../../../components/TextInput";
import Image from "../../../components/Image";
import { Link } from "react-router-dom";
import { Routes } from "../../../Constants";

const Entry = ({ onConfirm }) => {
  return (
    <div className={styles.entry}>
    <div className={styles.head}>
      {/*<div className={styles.subtitle}>Sign in with Open account</div>
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
      </div>*/}
    </div>
    <div className={styles.body}>
      <div className={styles.subtitle}>Enter your email address to reset</div>
      <TextInput className={styles.field}  name="email"  type="email"
        placeholder="Your email"  required  icon="mail"
      />
      <button className={cn("button", styles.button)} onClick={onConfirm}>Send</button>
      <div className={styles.note}>
        This site is protected by reCAPTCHA and the Google Privacy Policy.
      </div>
      <div className={styles.info}>
        Already a member?{"  "}
        <Link className={cn(styles.link, styles.linkPwd)} to={Routes.SIGN_IN}>
          Sign in
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Entry;
