import React, { useState } from "react";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Actions.module.sass";
import Icon from "../Icon";
import { Link } from "react-router-dom";

const Actions = ({
  className,
  classActionsHead,
  classActionsBody,
  classActionsOption,
  items,
  visible,
  setVisible,
  small,
  order,
  orderIdSelect,
  onDetailsClick,
  onPaidClick,
  onDeleteClick,
  up,
}) => {
  const [innerVisible, setInnerVisible] = useState(false);

  const toggle = () => {
    setVisible ? setVisible(!visible) : setInnerVisible(!innerVisible);
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() =>
        setVisible ? setVisible(false) : setInnerVisible(false)
      }
    >
      <div
        className={cn(
          styles.actions,
          className,
          {
            [styles.small]: small,
          },
          {
            [styles.up]: up,
          },
          {
            [styles.active]: visible ? visible : innerVisible,
          }
        )}
      >
        <button
          className={cn(styles.head, classActionsHead)}
          onClick={() => toggle()}
        >
          <Icon name="more-horizontal" size="24" />
        </button>
        <div className={cn(styles.body, classActionsBody)}>
          {items.map((x, index) => (
            x.url ? (
              <Link  className={cn(styles.option, classActionsOption)}
                to={order ? `${x.url}/${orderIdSelect}` : x.url}  key={x.id} >
                {x.icon && <Icon name={x.icon} size="24" />}
                {x.title}
              </Link>
            ) : (
              <button className={cn(styles.option, classActionsOption)}
                onClick={x.id === 3 ? onDetailsClick : (x.id === 2 ? onDeleteClick : (x.id === 4 ? onPaidClick : x.action))} key={x.id} >
                {x.icon && <Icon name={x.icon} size="24" />}
                {x.title}
              </button>
            )
          ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Actions;
