import React, { useState } from "react";
import cn from "classnames";
import styles from "./Item.module.sass";
import Icon from "../../../../Icon";
import Avatar from "../../../../Avatar";
import Control from "./Control";
import { formatTime } from "../../../../../Utils/formatTime";
import { Routes } from "../../../../../Constants";
import { useSelector } from "react-redux";

const Item = ({ className, item, getAllcommentByPack, onDeleteCommment }) => {
  const users = useSelector((state) => state.users);

  const [currentValue, setCurrentValue] = useState("");
  const [currentValueAnswer, setCurrentValueAnswer] = useState("");

  return (
    <>
      <div className={cn(styles.item, className)}>
        <Avatar user={{username: item.user?.full_name.trim() !== '' ? item.user?.full_name : item.user?.email, photo: item.user?.photo_user}} classname={styles.avatar} />
        <div className={styles.details}>
          <div className={styles.line}>
            <a href={item?.user?.id === users.users.id ? Routes.MY_PROFILE : `${Routes.MY_PROFILE}/${item.user?.id}`} className={styles.author}>{item.user?.full_name.trim() !== '' ? item.user?.full_name : item.user?.email}</a>
            <div className={styles.time}>{formatTime(item.created_at, 'GETDATEHOUR')}</div>
            <div className={styles.rating}>
              {item.rating?.toFixed(1) || 5.8}
              <Icon name="star-fill" size="24" />
            </div>
          </div>
          <div className={styles.login}>@{item.user?.email}</div>
          <div className={styles.comment}  dangerouslySetInnerHTML={{ __html: item.content }}></div>
          <Control valueAnswer={currentValue} setValueAnswer={setCurrentValue} item={item} getAllcommentByPack={getAllcommentByPack} onDeleteCommment={onDeleteCommment} isCommentUser={item?.user?.id === users.users.id ? true : false}/>
        </div>
      </div>
      {item.answer && (
        <div className={styles.list}>
          {item.answer.map((x, index) => (
            <div className={styles.answer} key={index}>
              <Avatar user={{username: x.author, photo: x.avatar}} classname={styles.avatar} width='32px'  height='32px'/>
              <div className={styles.details}>
                <div className={styles.line}>
                  <div className={styles.author}>{x.author}</div>
                  <div className={styles.time}>{x.time}</div>
                  <div className={styles.rating}>
                    {x.rating.toFixed(1)}
                    <Icon name="star-fill" size="24" />
                  </div>
                </div>
                <div className={styles.comment}  dangerouslySetInnerHTML={{ __html: x.comment }}  ></div>
                <Control valueAnswer={currentValueAnswer} setValueAnswer={setCurrentValueAnswer} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Item;
