import React, { useEffect } from "react";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { use100vh } from "react-div-100vh";
import styles from "./SignUp.module.sass";
import { Link, useNavigate, useParams } from "react-router-dom";
import Image from "../../components/Image";
import { Routes } from "../../Constants";
import Loader from "../../components/Loader";
import RequestDashboard from "../../Services/Api/ApiServices";

const items = [
  "Unlimited product uploads",
  "Pro tips",
  "Free forever",
  "Full author options",
];

const VerifyAccount = () => {
  const {t} = useTranslation()
  const {uid, token} = useParams()
  const navigate = useNavigate();
  const heightWindow = use100vh();
  
  
  useEffect(() => {
    const VerifyAccount =  async() => {
      const data = {
        uid: uid,
        token: token,
      }
      let res = await RequestDashboard(`accounts/auth/users/activation/`, 'POST', data);     
      
      if (res.status === 204) {
        navigate(Routes.SIGN_IN);
      }
    }
    if (uid && token) { // s'assurer que uid et token sont bien définis avant d'appeler l'API
      VerifyAccount();
    }
  },[uid, token, navigate])
  
  return (
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
        </div>
        <div className={cn(styles.wrapper)}>
            <Loader className={styles.loaderMax}/>Loading...
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
