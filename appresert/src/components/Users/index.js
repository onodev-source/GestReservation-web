import React from "react";
import cn from "classnames";
import styles from "./Users.module.sass";
import { Link } from "react-router-dom";
import { Routes } from "../../Constants";
import { useTranslation } from "react-i18next";
import Avatar from "../Avatar"

const users = [
  {
    title: "Gladyce",
    avatar: "/images/content/avatar.jpg",
    url: "/details-user",
  },
  {
    title: "Elbert",
    avatar: "/images/content/avatar-1.jpg",
    url: "/details-user",
  },
  {
    title: "Joyce",
    avatar: "/images/content/avatar-2.jpg",
    url: "/details-user",
  },
  {
    title: "Gladyce",
    avatar: "/images/content/avatar.jpg",
    url: "/details-user",
  },
];

const Users = ({ className, customerList, item }) => {
  const {t} = useTranslation()

  return (
    <div className={cn(styles.users, className)}>
      <div className={styles.head}>
        <div className={styles.info}>
          {!customerList ? <> {t('words.last')} <strong>04 {t('words.users')}</strong> {t('words.online')} </> : t('words.most_active')}{" "}
          <span role="img" aria-label="smile">
            😎
          </span>
        </div>
        {!customerList && <Link  className={cn("button-stroke", styles.button)}  to={Routes.CUSTOMERS_DASH}>
          {t('views.home.view_all')}
        </Link>}
      </div>
      <div className={styles.list}>
        {users.map((x, index) => (
          <Link className={styles.item} key={index} to={Routes.MY_PROFILE}>
            <Avatar user={{username: x.title, photo: x.avatar}} width='64px' height='64px' classname={styles.avatar}/>
            <div className={styles.title}>{x.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Users;
