import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import Modal from "../../Modal";
import Avatar from "../../Avatar"
import Logout from "../../../screens/Logout";
import { Routes } from "../../../Constants";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import RequestDashboard from "../../../Services/Api/ApiServices";
import DeleteAccountConfirm from "../../../screens/DeleteAccountConfirm";


const User = ({ className }) => {
  const {t} = useTranslation()

  const users = useSelector((state) => state.users);
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);


  const items = [
    {
      menu: [
        {
          title: t('navigation.my_profile'),
          url: Routes.MY_PROFILE,
        },
        {
          title: t('navigation.edit_profile'),
          url: Routes.SETTINGS,
        },
        {
          title: t("words.delete_account"),
          action: () => setVisibleDeleteModal(true)
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
          title: t('navigation.settings_account'),
          url: Routes.SETTINGS,
        },
        {
          title: t('navigation.log_out'),
          action: () => setVisibleModal(true)
        },
      ],
    },
  ];
  return (
    <>
      <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
        <div className={cn(styles.user, className, { [styles.active]: visible })}>
          {/*<button className={styles.head} onClick={() => setVisible(!visible)}>
            <img src="/images/content/avatar.jpg" alt="Avatar" />
          </button>*/}
          <Avatar onClick={() => setVisible(!visible)} user={{username: users.users?.email, photo: users.users?.photo_user}}/>
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
      <Modal outerClassName={styles.outer} visible={visibleDeleteModal} onClose={() => setVisibleDeleteModal(false)} >
          <DeleteAccountConfirm />
      </Modal>
      <Modal outerClassName={styles.outer} visible={visibleModal} onClose={() => setVisibleModal(false)} >
          <Logout />
      </Modal>
    </>
  );
};

export default User;
