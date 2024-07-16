import React from "react";
import cn from "classnames";
import styles from "./Users.module.sass";
import { Link } from "react-router-dom";
import { Routes } from "../../Constants";

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
  
  return (
    <div className={cn(styles.users, className)}>
      <div className={styles.head}>
        <div className={styles.info}>
          {!customerList ? <> Last <strong>04 users</strong> online </> : "Most active"}{" "}
          <span role="img" aria-label="smile">
            😎
          </span>
        </div>
        {!customerList && <Link  className={cn("button-stroke", styles.button)}  to={Routes.CUSTOMERS_DASH}>
          View<span> all</span>
        </Link>}
      </div>
      <div className={styles.list}>
        {users.map((x, index) => (
          <Link className={styles.item} key={index} to={Routes.MY_PROFILE}>
            <div className={styles.avatar}>
              <img src={x.avatar} alt="Avatar" />
            </div>
            <div className={styles.title}>{x.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Users;
