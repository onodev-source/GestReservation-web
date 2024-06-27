import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import Modal from "../../Modal";
import Logout from "../../../screens/Logout";


const User = ({ className }) => {
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const items = [
    {
      menu: [
        {
          title: "Profile",
          url: "/profile",
        },
        {
          title: "Edit profile",
          url: "/settings",
        },
        {
          title: "Delete profile",
          action: () => setVisible(false)
        },
      ],
    },
    /*{
      menu: [
        {
          title: "Analytics",
          icon: "bar-chart",
          url: "/customers/overview",
        },
        {
          title: "Affiliate center",
          icon: "ticket",
          url: "/affiliate-center",
        },
        {
          title: "Explore creators",
          icon: "grid",
          url: "/explore-creators",
        },
      ],
    },
    {
      menu: [
        {
          title: "Upgrade to Pro",
          icon: "leaderboard",
          color: true,
          url: "/upgrade-to-pro",
        },
      ],
    },*/
    {
      menu: [
        {
          title: "Account settings",
          url: "/settings",
        },
        {
          title: "Log out",
          action: () => setVisibleModal(true)
        },
      ],
    },
  ];
  return (
    <>
      <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
        <div className={cn(styles.user, className, { [styles.active]: visible })}>
          <button className={styles.head} onClick={() => setVisible(!visible)}>
            <img src="/images/content/avatar.jpg" alt="Avatar" />
          </button>
          <div className={styles.body}>
            {items.map((item, index) => (
              <div className={styles.menu} key={index}>
                {item.menu.map((x, index) =>
                  x.url ? (
                    <NavLink className={cn(styles.item, { [styles.color]: x.color })}  activeClassName={styles.active}
                      to={x.url}  onClick={() => setVisible(false)} key={index}
                    >
                      {x.icon && <Icon name={x.icon} size="24" />}
                      {x.title}
                    </NavLink>
                  ) : (
                    <button className={styles.item}  onClick={x.action} key={index} >
                      {x.title}
                    </button>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </OutsideClickHandler>
      <Modal outerClassName={styles.outer} visible={visibleModal} onClose={() => setVisibleModal(false)} >
          <Logout />
      </Modal>
    </>
  );
};

export default User;
