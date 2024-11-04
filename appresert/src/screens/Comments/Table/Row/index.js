import React, { useState } from "react";
import styles from "./Row.module.sass";
import cn from "classnames";
import Checkbox from "../../../../components/Checkbox";
import Avatar from "../../../../components/Avatar";
import Control from "./Control";
import { formatTime } from "../../../../Utils/formatTime";
import { Routes } from "../../../../Constants";
import { useSelector } from "react-redux";

const Row = ({ item, value, onChange, onDeleteComment, getAllcomment }) => {
  const users = useSelector((state) => state.users);

  const [visible, setVisible] = useState(false);
  const [visibleSmile, setVisibleSmile] = useState(false);
  const [currentValue, setCurrentValue] = useState("");

  return (
    <div className={cn(styles.row, { [styles.active]: visible })} onMouseLeave={() => setVisibleSmile(false)} >
      <div className={styles.col}>
        <Checkbox className={styles.checkbox}  value={value}  onChange={onChange}/>
      </div>
      <div className={styles.col}>
        <div className={styles.box}>
          <Avatar user={{username: item.user?.full_name.trim() !== '' ? item.user?.full_name : item.user?.email, photo: item.user?.photo_user}} classname={styles.avatar}/>
          <div className={styles.details}>
            <div className={styles.line}>
              <a href={item?.user?.id === users.users.id ? Routes.MY_PROFILE : `${Routes.MY_PROFILE}/${item.user?.id}`} className={styles.author}>{item.user?.full_name.trim() !== '' ? item.user?.full_name : item.user?.email}</a>
              <div className={styles.time}>{formatTime(item.updated_at, 'GETDATEHOUR')}</div>
            </div>
            <div className={styles.comment} dangerouslySetInnerHTML={{ __html: item.content }} ></div>
            <Control className={styles.control} value={visible} packageComment={item.package} commentContent={item} setValue={setVisible} valueAnswer={currentValue} setValueAnswer={setCurrentValue}
              visibleSmile={visibleSmile} setVisibleSmile={setVisibleSmile} onDeleteComment={onDeleteComment} getAllcomment={getAllcomment}
            />
          </div>
        </div>
      </div>
      <div className={styles.col}>
        <div className={styles.item}>
          <div className={styles.preview}>
            <img srcSet={`${item.package[0]?.photos_packages} 2x`} src={item.package[0]?.photos_packages} alt="Product" />
          </div>
          <div className={styles.details}>
            <div className={styles.product}>{item.package[0]?.package_name}</div>
            <div className={styles.category}>{item.category}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Row;
