import React, { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Messages.module.sass";
import Icon from "../../Icon";
import Actions from "../../Actions";
import Item from "./Item";
import { Routes } from "../../../Constants";

const messages = [
  {
    title: "Jarret Waelchi",
    content: "When do you release the coded template",
    avatar: "/images/content/avatar-1.jpg",
    time: "03:30PM",
    new: true,
    url: Routes.MESSAGES,
  },
  {
    title: "Orval Casper",
    content: "When do you release the coded template",
    avatar: "/images/content/avatar-2.jpg",
    time: "11:59AM",
    online: true,
    url: Routes.MESSAGES,
  },
  {
    title: "Michel Emard",
    content: "When do you release the coded template",
    avatar: "/images/content/avatar-3.jpg",
    time: "09:30AM",
    new: true,
    url: Routes.MESSAGES,
  },
  {
    title: "Reuben Ward",
    content: "When do you release the coded template",
    avatar: "/images/content/avatar-4.jpg",
    time: "08:00AM",
    url: Routes.MESSAGES,
  },
  {
    title: "Evalyn Jenkins",
    content: "When do you release the coded template",
    avatar: "/images/content/avatar-5.jpg",
    time: "07:01AM",
    url: Routes.MESSAGES,
  },
];

const actions = [
  {
    title: "Mark as read",
    icon: "check",
    action: () => console.log("Mark as read"),
  },
  {
    title: "Delete message",
    icon: "trash",
    action: () => console.log("Delete message"),
  },
];

const Messages = ({ className }) => {
  const [visible, setVisible] = useState(false);

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div
        className={cn(styles.messages, className, {
          [styles.active]: visible,
        })}
      >
        <button
          className={cn(styles.head, styles.active)}
          onClick={() => setVisible(!visible)}
        >
          <Icon name="message" size="24" />
        </button>
        <div className={styles.body}>
          <div className={styles.top}>
            <div className={styles.title}>Message</div>
            <Actions
              className={styles.actions}
              classActionsHead={styles.actionsHead}
              items={actions}
              small
            />
          </div>
          <div className={styles.list}>
            {messages.map((x, index) => (
              <Item
                className={cn(styles.item, className)}
                item={x}
                key={index}
                onClose={() => setVisible(false)}
              />
            ))}
          </div>
          <Link
            className={cn("button", styles.button)}
            to={Routes.MESSAGES}
            onClick={() => setVisible(false)}
          >
            View in message center
          </Link>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Messages;
