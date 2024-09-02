import React, { useState } from "react";
import cn from "classnames";
import styles from "./Code.module.sass";
import Loader from "../../../components/Loader";
import TextInput from "../../../components/TextInput";
import RequestDashboard from "../../../Services/Api/ApiServices";
import ErrorMessage from "../../../components/ErrorMessage";

const Code = () => {
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
  
  const resetPasswordConfirm =  async() => {
    
    if(form.password !== form.passwordConfirm) {
      setErrorSubmit("Both passwords are different."); 
    } else {
      setLoader(true)
      const data = {
        uid: "string",
        token: "string",
        new_password: form.password
      }
      let res = await RequestDashboard('accounts/auth/users/reset_password_confirm/', 'POST', data);
      
      if (res.status === 201) {
        //setProduct(res.data);
        setForm({ ...form, passwordConfirm: '', password: '' });
        setLoader(false)
      }
      else if (res.status === 204) { 
        setForm({ ...form, passwordConfirm: '', password: '' });
        setLoader(false)
        //setErrorSubmit("Incorrect Email or Password"); 
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
    <div className={styles.code}>
      <div className={styles.body}>
        <div className={styles.info}>
          We just send you a verify link. Check your inbox to get them.
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
        {errorSubmit !== '' && (
          <ErrorMessage message={errorSubmit} onClose={() => setErrorSubmit('')}/>
        )}
        <div className={styles.bodyText}>
          <div className={styles.subtitle}>Reset password</div>
          <TextInput onChange={textInputChange} className={styles.field} name="password" type="password"  placeholder="Enter new password" required icon="lock" />
          <TextInput onChange={textInputChange} className={styles.field} name="passwordConfirm" type="password"  placeholder="Confirm new password" required icon="lock" />
        </div>
        <button className={cn("button", styles.button)} onClick={resetPasswordConfirm}>
          {loader ? <Loader className={styles.loader} black /> 
           : <span>Continue</span>}
        </button>
        <div className={styles.note}>
          This site is protected by reCAPTCHA and the Google Privacy Policy.
        </div>
      </div>
    </div>
  );
};

export default Code;
