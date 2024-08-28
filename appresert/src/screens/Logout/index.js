import React, { useState } from "react";
import styles from "./logout.module.sass";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import RequestDashboard from "../../Services/Api/ApiServices";
import { Routes } from "../../Constants";
import Loader from "../../components/Loader";

const Logout = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const [loader, setLoader] = useState(false)
  
  console.log('token',users.access_token);
  
  const logout =  async() => {

    setLoader(true)
    let res = await RequestDashboard('accounts/auth/token/logout/', 'POST', '', users.access_token).then(response => {

      if (response.status === 204) {
        dispatch({ type: 'LOGOUT' });
        navigate(Routes.SIGN_IN);
        setLoader(false)
      }
    })
    console.log('resss logout',res);
    
  };
  return (
    <div className={styles.success}>
      <div className={styles.icon}>
        <span role="img" aria-label="firework">
          📴
        </span>
      </div>
      <div className={styles.info}>Quit ?</div>
      <div className={cn("h2", styles.price)}>Logout Account</div>
      <div className={styles.text}>
        Are you sure wan’t logout from <span>tam@ui8.net </span>account ? 
      </div>
      <button onClick={logout} className={cn("button", styles.button)}>{!loader ? 'Logout' : <Loader className={styles.loader} />}</button>
    </div>
  );
};

export default Logout;
