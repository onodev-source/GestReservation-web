import React, { useState } from "react";
import cn from "classnames";
import styles from "./Entry.module.sass";
import TextInput from "../../../components/TextInput";
import Image from "../../../components/Image";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Routes } from "../../../Constants";
import { useTranslation } from "react-i18next";
import Loader from "../../../components/Loader";
import RequestDashboard from "../../../Services/Api/ApiServices";
import { useDispatch } from "react-redux";
import ErrorMessage from "../../../components/ErrorMessage";

const Entry = ({ onConfirm }) => {
  const {t} = useTranslation()
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false)
  const [errorSubmit, setErrorSubmit] = useState('')
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  
  const textInputChange = (input) => {
    const target = input.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    switch (name) {
        case 'email':
          setForm({ ...form, email: value });
            break;
        case 'password':
          setForm({ ...form, password: value });
            break;
        default:
            break;
    }
  }
  
  const login =  async() => {
    setLoader(true)
    const data = {
      password: form.password,
      email: form.email,
    }
    let res = await RequestDashboard('accounts/auth/token/login/', 'POST', data);
    console.log('resss',res);
    
    if (res.status === 200) {
      let action = {
          type: "LOGIN",
          value: {
              users: res.response.user,
              access_token: res.response.auth_token
          },
      };
      dispatch(action);
      if(location.pathname === '/sign-in'){
        navigate(Routes.HOME);
      } else {
        navigate(location.pathname)
      }
      setLoader(false)
    }
    else if (res.status === 400) { 
      setLoader(false)
      setForm({ ...form, email: '', password: '' });
      setErrorSubmit("Incorrect Email or Password"); 
    }
    else if (res.status === 401) { 
      setLoader(false)
      setForm({ ...form, email: '', password: '' });
      setErrorSubmit( "Your email address has not been verified "); 
    }
    else { 
      setLoader(false)
      setForm({ ...form, email: '', password: '' });
      setErrorSubmit("An error has occurred please try again"); 
    }
  };

 
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
      {errorSubmit !== '' && (
        <ErrorMessage message={errorSubmit} onClose={() => setErrorSubmit('')}/>
      )}
      <div className={styles.subtitle}>{t('sign.continue_with_email')}</div>
      <TextInput onChange={textInputChange} className={styles.field}  name="email"  type="email"
        placeholder={t('sign.email')}  required  icon="mail"
      />
      <TextInput onChange={textInputChange} className={styles.field}
        name="password" type="password"  placeholder={t('sign.password')}
        required icon="lock"
      />
      <Link className={cn(styles.link, styles.linkPwd)} to={Routes.FORGOT_PASS}>
        {t('sign.forgot_pass')}
      </Link>
      <button className={cn("button", styles.button)} onClick={login}>
        {!loader ? 'Sign in' : <Loader className={styles.loader} />}
      </button>
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
