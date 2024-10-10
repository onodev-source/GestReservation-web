import React, { useState } from "react";
import cn from "classnames";
import styles from "./TextInput.module.sass";
import Icon from "../Icon";
import Tooltip from "../Tooltip";
import { verifyInput } from "../../Utils/verifyInput";

const TextInput = ({ className, classLabel, classInput, label, icon, type, copy, currency, tooltip, place, onChange, ...props}) => {
  const [visiblePass, setVisiblePass] = useState(false)

  //fonction permettant de rendre visible ou pas le contenu  de l'input de type password
  const handleChange = () => {
    setVisiblePass(!visiblePass)
  }
  
  return (
    <div className={cn(styles.field, { [styles.fieldIcon]: icon }, { [styles.fieldCopy]: copy }, { [styles.fieldCurrency]: currency }, className )} >
      {label && (
        <div className={cn(classLabel, styles.label)}>
          {label}{" "}
          {tooltip && (
            <Tooltip className={styles.tooltip} title={tooltip} icon="info"  place={place ? place : "right"} />
          )}
        </div>
      )}
      <div className={styles.wrap}>
        {type === "password" ?
          <input onChange={onChange} className={cn(classInput, styles.input)} {...props} type={visiblePass ? "text" : "password"}/> 
          :
          <input onChange={onChange} className={cn(classInput, styles.input, {[styles.badEmail] : type === "email" && props.value !== '' && verifyInput(props.value) === false},
          {[styles.badTel]: type === "tel" && props.value !== '' && !verifyInput(props.value, 'tel')})} {...props} />
        }
        {icon && (
          <div className={styles.icon}>
            <Icon name={icon} size="24" />{" "}
          </div>
        )}
        {copy ? (
          <button className={styles.copy}>
            <Icon name="copy" size="24" />{" "}
          </button>
        ) : (
          type === "password" && (
            <button className={styles.copy} onClick={handleChange}>
              <Icon name={visiblePass ? "eye-closed" : "eye-open"} size="24" />{" "}
            </button>
          )
        )}
        {currency && <div className={styles.currency}>{currency}</div>}
      </div>
    </div>
  );
};

export default TextInput;
