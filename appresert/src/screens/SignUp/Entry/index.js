import React, { useState } from "react";
import cn from "classnames";
import styles from "./Entry.module.sass";
import TextInput from "../../../components/TextInput";
import Image from "../../../components/Image";
import { useTranslation } from "react-i18next";
import RequestDashboard from "../../../Services/Api/ApiServices";
import Loader from "../../../components/Loader";
import ErrorMessage from "../../../components/ErrorMessage";
import { verifyInput } from "../../../Utils/verifyInput";

const Entry = ({ onConfirm }) => {
  const {t} = useTranslation()
  const [loader, setLoader] = useState(false)
  const [errorSubmit, setErrorSubmit] = useState('')
  const [form, setForm] = useState({
    tel: '',
    email: '',
    password: ''
  })
  
  const textInputChange = (input) => {
    const target = input.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    switch (name) {
        case 'tel':
          setForm({ ...form, tel: value });
            break;
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
  
  const isFormFilled = () => {
      
    return (
      verifyInput(form.tel, 'tel') !== false &&
      verifyInput(form.email) !== false &&
      form.password !== ''
    )
  };
  
  const register =  async() => {
    setLoader(true)
    const data = {
      //first_name: form.name,
      phone_number: form.tel,
      email: form.email,
      password: form.password,
      re_password: form.password
    }
    let res = await RequestDashboard('accounts/auth/users/', 'POST', data);
    console.log('res.response', res.response);
    console.log('res.messagedata', res.response.data);
    console.log('res.message content', res.response.message);
    
    
    if (res.status === 201) {
      //setProduct(res.data);
      setForm({ ...form, tel: '', email: '', password: '' });
      onConfirm()
      setLoader(false)
    }
    else if (res.status === 400) { 
      const errorData = res.response;
      if (errorData?.email) {
        console.log(errorData.email[0]); 
        setErrorSubmit(errorData.email[0]);
      } else {
        setErrorSubmit(errorData?.phone_number ? errorData?.phone_number[0] : errorData?.password[0]);
      }
      setLoader(false)
    }
    else if (res.status === 401) { 
      setLoader(false)
      //setForm({ ...form, tel: '', email: '', password: '' });
      setErrorSubmit( "Your email address has not been verified "); 
    }
    else { 
      setLoader(false)
      //setForm({ ...form, tel: '', email: '', password: '' });
      setErrorSubmit("An error has occurred please try again"); 
    }
  };
  
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
        {errorSubmit !== '' && (
          <ErrorMessage message={errorSubmit} onClose={() => setErrorSubmit('')}/>
        )}
        <div className={styles.info}>{t('sign.continue_with_email')}</div>
        {/*<TextInput onChange={textInputChange} className={styles.field} name="name"  type="text" placeholder={t('sign.name')} required />*/}
        <TextInput onChange={textInputChange} value={form.tel}  className={styles.field}  name="tel"  type="tel" placeholder='2376xxxxxxxx' required  icon="phone" />
        <TextInput onChange={textInputChange} value={form.email} className={styles.field}  name="email" type="email" placeholder={t('sign.email')} required  icon="mail"/>
        <TextInput onChange={textInputChange} value={form.password} className={styles.field} name="password" type="password"  placeholder={t('sign.password')} required icon="lock" />
        <button className={cn("button", styles.button, {[styles.disabled]: !isFormFilled()})} onClick={register} disabled={!isFormFilled() ? true : false}>
          {!loader ? t('sign.continue') : <Loader className={styles.loader} />}
        </button>
        <div className={styles.note}>
          {t('sign.protected_to_recaptcha')}
        </div>
      </div>
    </div>
  );
};

export default Entry;
