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
  
  const logout =  async() => {

    try {
        setLoader(true); // Affiche le loader pendant la requête
        
        // Exécution de la requête de déconnexion
        await RequestDashboard('accounts/auth/token/logout/', 'POST', '', users.access_token);      

        // Si la requête est réussie, effectue la déconnexion
        dispatch({ type: 'LOGOUT' });
        navigate(Routes.SIGN_IN); // Redirige vers la page de connexion
    } catch (error) {
        // En cas d'erreur, affiche un message ou effectue une autre action
        console.error('Erreur lors de la déconnexion:', error);
    } finally {
        // Quoi qu'il arrive (succès ou erreur), arrête le loader
        setLoader(false);
    }   
  };
  return (
    <div className={styles.success}>
      <div className={styles.icon}>
        <span role="img" aria-label="firework">
          📴
        </span>
      </div>
      <div className={styles.info}>{t('words.quit')}</div>
      <div className={cn("h2", styles.price)}>{t('words.logout_account')}</div>
      <div className={styles.text}>
        {t('words.sure_to_logout')} <span>{users.users.email}</span> ? 
      </div>
      <button onClick={logout} className={cn("button", styles.button)}>{!loader ? t('words.logout') : <Loader className={styles.loader} />}</button>
    </div>
  );
};

export default Logout;
