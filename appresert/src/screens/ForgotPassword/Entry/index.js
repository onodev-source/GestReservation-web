import React, { useState } from "react";
import cn from "classnames";
import styles from "./Entry.module.sass";
import TextInput from "../../../components/TextInput";
import Image from "../../../components/Image";
import { Link } from "react-router-dom";
import { Routes } from "../../../Constants";
import RequestDashboard from "../../../Services/Api/ApiServices";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import ErrorMessage from "../../../components/ErrorMessage";
import { useTranslation } from "react-i18next";
import { verifyInput } from "../../../Utils/verifyInput";

const Entry = ({ onConfirm }) => {
  const {t} = useTranslation()
  const [loader, setLoader] = useState(false)
  const [errorSubmit, setErrorSubmit] = useState('')
  const [form, setForm] = useState({
    email: '',
  })
  
  const textInputChange = (input) => {
    const target = input.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    switch (name) {
        case 'email':
          setForm({ ...form, email: value });
            break;
        default:
            break;
    }
  }
  
  const isFormFilled = () => {
      
    return (
      verifyInput(form.email) !== false
    )
  };

  const sendEmailResetPassword =  async() => {
    setLoader(true)
    const data = {
      email: form.email,
    }
    let res = await RequestDashboard('accounts/auth/users/reset_password/', 'POST', data);
    
    if (res.status === 201) {
      //setProduct(res.data);
      setForm({ ...form, email: ''});
      setLoader(false)
      setErrorSubmit(t('sign.send_a_verify_code')); 
      //onConfirm()
    }
    else if (res.status === 204) { 
      setForm({ ...form, email: ''});
      setLoader(false)
      setErrorSubmit(t('sign.send_a_verify_code'));  
      //onConfirm()
    }
    else if (res.status === 400) { 
      setLoader(false)
      setForm({ ...form, email: ''});
      setErrorSubmit("Incorrect Email or Password"); 
    }
    else if (res.status === 401) { 
      setLoader(false)
      setForm({ ...form, tel: '', email: ''});
      setErrorSubmit( "Your email address has not been verified "); 
    }
    else { 
      setLoader(false)
      setForm({ ...form, tel: '', email: ''});
      setErrorSubmit("An error has occurred please try again"); 
    }
  };
  
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
      {errorSubmit !== '' && (
        <ErrorMessage message={errorSubmit} onClose={() => setErrorSubmit('')}/>
      )}
      <div className={styles.subtitle}>{t('sign.enter_email_to_reset')}</div>
      <TextInput className={styles.field}  name="email"  type="email" value={form.email}
        placeholder={t('sign.email')}  required  icon="mail" onChange={textInputChange}
      />
      <button className={cn("button", styles.button, {[styles.disabled]: !isFormFilled()})} onClick={sendEmailResetPassword}  disabled={!isFormFilled() ? true : false}>{loader ? <Loader/> : t('words.send')}</button>
      <div className={styles.note}>
      {t('sign.protected_to_recaptcha')}
      </div>
      <div className={styles.info}>
        {t('sign.already_menber')}{"  "}
        <Link className={cn(styles.link, styles.linkPwd)} to={Routes.SIGN_IN}>
          {t('sign.sign_in')}
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Entry;
