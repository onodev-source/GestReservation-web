import React from "react";
import cn from "classnames";
import styles from "./Item.module.sass";
//import Control from "./Control";
import Avatar from "../../../../components/Avatar";
import { formatTime } from "../../../../Utils/formatTime";
import Icon from "../../../../components/Icon";

const Item = ({ className, item }) => {
  /*const [visible, setVisible] = useState(false);
  const [currentValue, setCurrentValue] = useState("");*/
  
  return (
    <div className={cn(styles.item, { [styles.new]: !item.is_read }, className)}>
      <Avatar user={{username: item.user?.full_name.trim() !== '' ? item.user?.full_name : item.user?.email, photo: item.user?.photo_user}} classname={styles.avatar}  width='64px'  height='64px'>
        <div className={styles.icon} style={{ backgroundColor: item.color || "#11C246" }}>
          {item.notifications_type.includes('PACKAGE') ? 
            <Icon  className={styles.iconPack} name="package" size="16" />
            : item.notifications_type.includes('COMMENT') ?
              <Icon name="message" size="16" /> :
              <Icon name="reservation" size="16" />
          }
        </div>
      </Avatar>
      <div className={styles.details}>
        <div className={styles.line}>
          <div className={styles.subtitle}>{item.user?.full_name.trim() !== '' ? item.user?.full_name : item.user?.email}</div>
          <div className={styles.login}>@{item.user?.email}</div>
          <div className={styles.time}>{formatTime(item.created_at, 'GETDATEHOUR')}</div>
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: item.notifications_type }}
        ></div>
        <div className={styles.comment}>{item.message}</div>
        
        {/*<Control
          className={styles.control}
          value={visible}
          setValue={setVisible}
          valueAnswer={currentValue}
          setValueAnswer={setCurrentValue}
        />*/}
      </div>
    </div>
  );
};

export default Item;
