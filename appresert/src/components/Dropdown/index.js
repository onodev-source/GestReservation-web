import React, { useState } from "react";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Dropdown.module.sass";
import Tooltip from "../Tooltip";

const Dropdown = ({
  className,
  classDropdownHead,
  classDropdownLabel,
  value,
  setValue,
  setActiveIndex,
  options,
  label,
  tooltip,
  small,
  upBody,
  language
}) => {
  const [visible, setVisible] = useState(false);

  const handleClick = (value, index) => {
    setValue(value);
    setVisible(false);
    if(setActiveIndex){
      setActiveIndex(index);
    }
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      {label && (
        <div className={cn(styles.label, classDropdownLabel)}>
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
      <div  className={cn(  styles.dropdown,  className, { [styles.small]: small }, { [styles.active]: visible, } )} >
        <div   className={cn(styles.head, classDropdownHead)} onClick={() => setVisible(!visible)}  >
          <div className={styles.selection}>{language ? value.title : value}</div>
        </div>
        <div className={cn(styles.body, { [styles.bodyUp]: upBody })}>
          {language ? (
            options?.map((x, index) => (
              <div  className={cn(styles.option, { [styles.selectioned]: x.title === value,  })}
                onClick={() => handleClick(x, index)} key={index}
              >
                {x.title}
              </div>
            ))
          ) : (
            options?.map((x, index) => (
              <div  className={cn(styles.option, { [styles.selectioned]: x === value,  })}
                onClick={() => handleClick(x, index)} key={index}
              >
                {x}
              </div>
            ))
          )}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Dropdown;
