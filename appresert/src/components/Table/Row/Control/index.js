import React, { useState } from "react";
import styles from "./Control.module.sass";
import cn from "classnames";
import Icon from "../../../Icon";
import Modal from "../../../Modal";
import Schedule from "../../../Schedule";
import Details from "../../../../screens/Refunds/Row/Details";
import { Link } from "react-router-dom";
import { Routes } from "../../../../Constants";
import { useSelector } from "react-redux";

const Control = ({
  item,
  className,
  startDate,
  setStartDate,
  startTime,
  setStartTime,
  customersDetails, 
  selectedItem,
  setSelectedItem,
  customerId,
  onClick
}) => {
  const users =useSelector((state)=> state.users)
  const [visibleModal, setVisibleModal] = useState(false);

  const handleChangeVisibleProduct = (itemSelected) => {
    setSelectedItem(itemSelected); 
    setVisibleModal(true)
  };

  const actions = [
    // {
    //   icon: "calendar",
    //   action: () => console.log("delete"),
    // },
    users?.users?.iscustomer && {
      icon: "edit",
      action: () => console.log("edit"),
      url: customersDetails && `${Routes.CUSTOMERS_EDIT}/${customerId}`
    },
    {
      icon: "trash",
      action: () => onClick(selectedItem?.customer_id),
    },
    {
      icon: "arrow-right",
      action: () => handleChangeVisibleProduct(item),
    },
  ].filter(Boolean);

  return (
    <>
      <div className={cn(styles.control, className)}>
        {actions.map((x, index) => (
          x.url ? (
            <Link className={cn(styles.button, styles.link)} to={x.url}>
              <Icon name={x.icon} size="20" />
            </Link>
          ) : (
            <button className={styles.button} key={index} onClick={x.action}>
              <Icon name={x.icon} size="20" />
            </button>
          )
        ))}
      </div>
      <Modal outerClassName={styles.outer} visible={visibleModal} onClose={() => setVisibleModal(false)} >
        <Details item={selectedItem} customersDetails={customersDetails} onClose={() => setVisibleModal(false)}/>
      </Modal>
      {/*<Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <Schedule
          startDate={startDate}
          setStartDate={setStartDate}
          startTime={startTime}
          setStartTime={setStartTime}
        />
      </Modal>*/}
    </>
  );
};

export default Control;
