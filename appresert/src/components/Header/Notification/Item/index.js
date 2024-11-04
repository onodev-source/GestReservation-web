import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Item.module.sass";
import Avatar from "../../../Avatar";
import Icon from "../../../Icon";
import { formatTime } from "../../../../Utils/formatTime";

const Item = ({ className, item, onClose }) => {
  return (
    <Link
      className={cn(styles.item, { [styles.new]: !item.is_read }, className)}
      to={item.url}
      onClick={onClose}
    >
      <Avatar user={{username: item.user?.full_name.trim() !== '' ? item.user?.full_name : item.user?.email, photo: item.user?.photo_user}} classname={styles.avatar}>
        <div className={styles.icon} style={{ backgroundColor: item.color || "#11C246" }}>
          {item.notifications_type.includes('PACKAGE') ? 
            <Icon  className={styles.iconPack} name="package" size="10" />
            : item.notifications_type.includes('COMMENT') ?
              <Icon name="message" size="10" /> :
              <Icon name="reservation" size="10" />
          }
        </div>
      </Avatar>
      <div className={styles.details}>
        <div className={styles.line}>
          <div className={styles.subtitle}>{item.user?.full_name.trim() !== '' ? (item.user?.full_name.length > 6 ? item.user?.full_name.slice(0, 6) : item.user?.full_name) : (item.user?.email.length > 6 ? item.user?.email.slice(0, 6) : item.user?.email)}</div>
          <div className={styles.login}>@{item.user?.email.length > 12 ? `${item.user?.email.slice(0, 12)}...` : item.user?.email}</div>
          <div className={styles.time}>{formatTime(item.created_at, 'GETDATEHOUR')}</div>
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: `${item.notifications_type} : ${item.message}` }}
        ></div>
      </div>
    </Link>
  );
};

export default Item;
