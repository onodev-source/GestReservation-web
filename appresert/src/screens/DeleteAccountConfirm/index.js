import React, { useState } from "react";
import styles from "./DeleteAccountConfirm.module.sass";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import RequestDashboard from "../../Services/Api/ApiServices";
import { Routes } from "../../Constants";
import Loader from "../../components/Loader";

const DeleteAccountConfirm = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const [loader, setLoader] = useState(false)
  
 
  const deleteAccountMe =  async() => {
    setLoader(true)
    let res = await RequestDashboard(`accounts/auth/users/me/`, 'DELETE', '', users.access_token);
    if (res.status === 204) {
      setLoader(false)
      // Si la requête est réussie, effectue la déconnexion
      dispatch({ type: 'LOGOUT' });
      navigate(Routes.SIGN_IN); // Redirige vers la page de connexion
    }
  };

  return (
    <div className={styles.success}>
      <div className={styles.icon}>
        <span role="img" aria-label="firework">
          📴
        </span>
      </div>
      <div className={styles.info}>Delete ?</div>
      <div className={cn("h2", styles.price)}>Delete Account</div>
      <div className={styles.text}>
        Are you sure you want to delete the <span>{users.users.email}</span> account?
      </div>
      <button onClick={deleteAccountMe} className={cn("button", styles.button)}>{!loader ? 'Confirm' : <Loader className={styles.loader} />}</button>
    </div>
  );
};

export default DeleteAccountConfirm;
