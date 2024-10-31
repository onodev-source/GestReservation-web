import React, { useState } from "react";
import cn from "classnames";
import styles from "./Item.module.sass";
import Control from "./Control";
import Avatar from "../../../../components/Avatar";
import { formatTime } from "../../../../Utils/formatTime";

const Item = ({ className, item }) => {
  const [visible, setVisible] = useState(false);
  const [currentValue, setCurrentValue] = useState("");
  
  return (
    <div className={cn(styles.item, { [styles.new]: !item.is_read }, className)}>
      <Avatar user={{username: item.user, photo: item.avatar || "/images/content/avatar-1.jpg"}} classname={styles.avatar}  width='64px'  height='64px'>
        <div className={styles.icon} style={{ backgroundColor: item.color || "#2A85FF" }}>
          <img src={item.icon || "/images/content/message.svg"} alt="Status" />
        </div>
      </Avatar>
      <div className={styles.details}>
        <div className={styles.line}>
          <div className={styles.subtitle}>{item.title || 'yo audrey'}</div>
          <div className={styles.login}>@{item.user}</div>
          <div className={styles.time}>{formatTime(item.created_at, 'GETDATEHOUR')}</div>
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: item.notifications_type }}
        ></div>
        <div className={styles.comment}>“{item.message}”</div>
        <Control
          className={styles.control}
          value={visible}
          setValue={setVisible}
          valueAnswer={currentValue}
          setValueAnswer={setCurrentValue}
        />
      </div>
    </div>
  );
};

export default Item;
