import React from "react";
import cn from "classnames";
import styles from "./File.module.sass";
import Icon from "../Icon";
import Tooltip from "../Tooltip";

const File = ({ className, label, tooltip, title, onChange, mediaUrl }) => {
  
  return (
    <div className={cn(styles.file, className)}>
      {label && (
        <div className={styles.label}>
          {label}{" "}
          {tooltip && (
            <Tooltip
              className={styles.tooltip}
              title={tooltip}
              icon="info"
              place="right"
            />
          )}
        </div>
      )}
      <div className={styles.wrap} style={{backgroundImage: `url(${mediaUrl})`, backgroundSize: 'cover'}}>
        <input className={styles.input} type="file" accept=".jpg,.jpeg,.png" onChange={onChange}/>
        <div className={styles.box}>
          <Icon name="upload" size="24" />
          {title}
        </div>
      </div>
    </div>
  );
};

export default File;
