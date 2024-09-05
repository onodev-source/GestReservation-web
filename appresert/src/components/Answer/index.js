import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import styles from "./Answer.module.sass";
import Avatar from "../Avatar"
import { useSelector } from "react-redux";

const Answer = ({
  className,
  avatar,
  onClose,
  currentValue,
  setCurrentValue,
  ...etc
}) => {
  const users = useSelector((state) => state.users);
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [currentValue]);

  return (
    <div className={cn(styles.answer, className)}>
      <Avatar user={{username: users.users?.email, photo: users.users?.photo_user}} classname={styles.avatar} width='40px'  height='40px'/>
      <div className={styles.details}>
        <div className={styles.message}>
          <textarea  ref={textareaRef}  {...etc} value={currentValue} placeholder="Leave something to reply" onChange={(e) => {  setCurrentValue(e.target.value); }} />
        </div>
        <div className={styles.btns}>
          <button  className={cn("button button-small", styles.button, { disabled: currentValue === "", })} >
            Reply
          </button>
          <button className={cn("button-stroke button-small", styles.button)} onClick={onClose} >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Answer;
