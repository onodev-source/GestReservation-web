import React, { useState } from "react";
import cn from "classnames";
import styles from "./Control.module.sass";
import Icon from "../../../../../Icon";
import Answer from "../../../../../Answer";
import { likeCommentById } from "../../../../../../Utils/LikeComment";
import { useSelector } from "react-redux";

const Control = ({ valueAnswer, setValueAnswer, item, getAllcommentByPack, isCommentUser, onDeleteCommment }) => {
  const users = useSelector((state) => state.users)
  const [visibleFavorite, setVisibleFavorite] = useState(item.liked_by_user);
  const [visibleReply, setVisibleReply] = useState(false);

  return (
    <>
      <div className={styles.control}>
        <button className={cn(styles.favorite, { [styles.active]: visibleFavorite })} onClick={() => likeCommentById(item.package[0]?.id, users, item?.id, getAllcommentByPack, setVisibleFavorite) }>
          <span>
            <Icon name="heart" size="20" />
            <Icon name="heart-fill" size="20" />
          </span>
          Like
        </button>
        <button  className={cn(styles.reply, { [styles.active]: visibleReply })} onClick={() => setVisibleReply(true)} >
          <span>
            <Icon name="repeat" size="20" />
          </span>
          Reply
        </button>
        {isCommentUser &&
          <button  className={cn(styles.delete)} onClick={onDeleteCommment}>
            <span>
              <Icon name="trash" size="20" />
            </span>
            Delete
          </button>
        }
      </div>
      <Answer className={cn(styles.answer, { [styles.show]: visibleReply })}  avatar="/images/content/avatar.jpg"
        onClose={() => setVisibleReply(false)}
        currentValue={valueAnswer}
        setCurrentValue={setValueAnswer}
      />
    </>
  );
};

export default Control;
