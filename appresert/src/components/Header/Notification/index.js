import React, { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Notification.module.sass";
import Icon from "../../Icon";
import Actions from "../../Actions";
import Item from "./Item";

import { Routes } from "../../../Constants";
import { useSelector } from "react-redux";
import { getAllNotifications, markAllReadNotifications } from "../../../Utils/LikeComment";
import NoContent from "../../NoContent";
import Loader from "../../Loader";
import { useTranslation } from "react-i18next";


const Notification = ({ className }) => {
  const {t} = useTranslation()
  const users = useSelector((state) => state.users)

  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [notifs, setNotifs] = useState([]);

  const actions = [
    {
      title: notifs[0]?.is_read ? t('words.mark_as_unread') : t('words.mark_as_read'),
      icon: "check",
      action: () => markAllReadNotifications(users, notifs, setLoader, setNotifs),
    },
    {
      title: t("words.go_setting"),
      icon: "setting",
      url: Routes.SETTINGS,
    },
  ];

  React.useEffect(() => {
    getAllNotifications(setLoader, users, setNotifs)
  }, [users])

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div
        className={cn(styles.notification, className, {
          [styles.active]: visible,
        })}
      >
        <button
          className={cn(styles.head, styles.active)}
          onClick={() => setVisible(!visible)}
        >
          <Icon name="notification" size="24" />
        </button>
        <div className={styles.body}>
          <div className={styles.top}>
            <div className={styles.title}>Notifications</div>
            <Actions
              className={styles.actions}
              classActionsHead={styles.actionsHead}
              items={actions}
              small
            />
          </div>
          <div className={styles.list}>
            {loader ? <Loader/> :
              notifs?.length > 0 ?
                notifs.slice(0, 4).map((x, index) => (
                  <Item
                    className={cn(styles.item, className)}
                    item={x}
                    key={index}
                    onClose={() => setVisible(false)}
                  />
                ))
              : <NoContent message={''}/>
            }
          </div>
          <Link
            className={cn("button", styles.button)}
            to={Routes.NOTIFICATIONS}
            onClick={() => setVisible(false)}
          >
            See all notifications
          </Link>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Notification;
