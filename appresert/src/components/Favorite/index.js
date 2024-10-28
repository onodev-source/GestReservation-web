import React, { useState } from "react";
import cn from "classnames";
import styles from "./Favorite.module.sass";
import Icon from "../Icon";
import { useSelector } from "react-redux";
import { likeCommentById } from "../../Utils/LikeComment";

const Favorite = ({ className, size, packageComment, commentContent, getAllcomment }) => {
  const users = useSelector((state) => state.users)
  const [visible, setVisible] = useState(commentContent ? commentContent.liked_by_user : false);
  

  return (
    <button className={cn( styles.button,  { [styles.active]: visible,}, className )}
      onClick={() => likeCommentById(packageComment?.id, users, commentContent?.id, getAllcomment, setVisible)}
    >
      <div>
        <Icon name="heart" size={size ? size : "20"} />
        <Icon name="heart-fill" size={size ? size : "20"} />
      </div>
      <p>{commentContent?.total_likes}</p>
    </button>
  );
};

export default Favorite;
