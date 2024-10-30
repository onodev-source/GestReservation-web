import React, { useState } from "react";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { use100vh } from "react-div-100vh";
import styles from "./SignUp.module.sass";
import { Link, useNavigate, useParams } from "react-router-dom";
import Image from "../../components/Image";
import { Routes } from "../../Constants";
import Loader from "../../components/Loader";
import RequestDashboard from "../../Services/Api/ApiServices";
import ErrorMessage from "../../components/ErrorMessage";
import TextInput from "../../components/TextInput";

const items = [
  "Unlimited product uploads",
  "Pro tips",
  "Free forever",
  "Full author options",
];

const VerifyEmailResetPass = () => {
  const {t} = useTranslation()
  const {uid, token} = useParams()
  const navigate = useNavigate();
  const heightWindow = use100vh();
  
  const [loader, setLoader] = useState('')
  const [errorSubmit, setErrorSubmit] = useState('')
  const [form, setForm] = useState({
    passwordConfirm: '',
    password: ''
  })
  
  const textInputChange = (input) => {
    const target = input.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    switch (name) {
        case 'password':
          setForm({ ...form, password: value });
            break;
        case 'passwordConfirm':
          setForm({ ...form, passwordConfirm: value });
            break;
        default:
            break;
    }
  }
  
  const isFormFilled = () => {
      
    return (
      form.password !== '' &&
      form.passwordConfirm !== '' 
    )
  };

  const resetPasswordConfirm =  async() => {
    
    if(form.password !== form.passwordConfirm) {
      setErrorSubmit("Both passwords are different."); 
    } else {
      setLoader(true)
      const data = {
        uid: uid,
        token: token,
        new_password: form.password
      }
      let res = await RequestDashboard('accounts/auth/users/reset_password_confirm/', 'POST', data);
      
      
      if (res.status === 204) { 
        setForm({ ...form, passwordConfirm: '', password: '' });
        setLoader(false)
        navigate(Routes.SIGN_IN);
      }
      else if (res.status === 400) { 
        setLoader(false)
        setForm({ ...form, passwordConfirm: '', password: '' });
        setErrorSubmit("Incorrect Email or Password"); 
      }
      else if (res.status === 401) { 
        setLoader(false)
        setForm({ ...form, passwordConfirm: '', password: '' });
        setErrorSubmit( "Your email address has not been verified "); 
      }
      else { 
        setLoader(false)
        setForm({ ...form, passwordConfirm: '', password: '' });
        setErrorSubmit("An error has occurred please try again"); 
      }
    }
  };


  return (
    <>
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
          <div className={cn(styles.wrapper)}>
            <div className={cn("h2", styles.title)}>
              {t('sign.reset_pass')}
            </div>
            {errorSubmit !== '' && (
              <ErrorMessage message={errorSubmit} onClose={() => setErrorSubmit('')}/>
            )}
            <div className={styles.bodyText}>
              <TextInput onChange={textInputChange} className={styles.field} name="password" type="password"  placeholder={t('form.new_password')} required icon="lock" />
              <TextInput onChange={textInputChange} className={styles.field} name="passwordConfirm" type="password"  placeholder={t('form.confirm_password')} required icon="lock" />
            </div>
            <button className={cn("button", styles.button, {[styles.disabled]: !isFormFilled()})} onClick={resetPasswordConfirm} disabled={!isFormFilled() ? true : false}>
              {loader ? <Loader /> : <span>{t('sign.continue')}</span>}
            </button>
            <div className={styles.note}>
              {t('sign.protected_to_recaptcha')}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmailResetPass;
