import React, { useState } from "react";
import cn from "classnames";
import styles from "./Header.module.sass";
import Icon from "../Icon";
import Notification from "./Notification";
//import Messages from "./Messages";
import User from "./User";
import { Link } from "react-router-dom";
import { Routes } from "../../Constants";
import { useTranslation } from "react-i18next";

const Header = ({ onOpen }) => {
  const {t} = useTranslation()
  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    onOpen();
    setVisible(false);
  };

  return (
    <header className={styles.header}>
      <button className={styles.burger} onClick={() => handleClick()}></button>
      {/*<button
        className={cn(styles.buttonSearch, { [styles.active]: visible })}
        onClick={() => setVisible(!visible)}
      >
        <Icon name="search" size="24" />
      </button>*/}
      <div className={styles.control} onClick={() => setVisible(false)}>
        {/*<Messages className={styles.messages} />*/}
        <Link className={styles.link} to={Routes.PUBLICITY} title={t('navigation.publicity')}> 
          <Icon name={'promotion'} size="24" />
        </Link>
        <Notification className={styles.notification} />
        <User className={styles.user} />
      </div>
      {/*<div className={styles.btns}>
        <Link className={styles.link} to="/promote">
          Promote
        </Link>
        <Link className={cn("button", styles.button)} to="/sign-up">
          Sign up
        </Link>
      </div>*/}
    </header>
  );
};

export default Header;
