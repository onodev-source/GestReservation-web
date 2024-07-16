import React, { useState } from "react";
import styles from "./Row.module.sass";
import cn from "classnames";
import Checkbox from "../../../../components/Checkbox";
import Balance from "../../../../components/Balance";
import Control from "../../../../components/Table/Row/Control"
import Modal from "../../../../components/Modal";
import Details from "../../../Refunds/Row/Details";

import Refunds from "../../../Refunds";
import { refunds } from "../../../../mocks/refunds";

const customerDetails = {
  product: "Filomena Fahey",
  login: "@username",
  status: true,
  image: "/images/content/avatar-2.jpg",
  avatar: "/images/content/avatar-2.jpg",
  parameters: [
    {
      title: "Customer register",
      content: "Aug 20, 2021",
    },
    {
      title: "Email",
      content: "fahey.designer@robot.com",
    },
    {
      title: "Customer actif",
      downloadedStatus: true,
      downloadedValue: true,
    },
    {
      title: "Purchase date",
      content: "July 01, 2021",
    },
    {
      title: "Purchase",
      content: 12,
    },
    {
      title: "Comments",
      content: 14,
    },
    {
      title: "Like",
      price: 6,
    },
    {
      title: "Balance",
      tooltip: "Description balance",
      price: 2.8,
    },
    {
      title: "Price",
      tooltip: "Description Price",
      price: 72.88,
    },
  ],
}

const Row = ({
  item,
  value,
  onChange,
  activeTable,
  setActiveTable,
  activeId,
  setActiveId,
  up,
  customersDetails
}) => {
  const [visibleActions, setVisibleActions] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 1023);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleRowClick = () => {
    if (isMobile) {
      setVisibleModal(true);
    }
  };
  const handleClick = (id) => {
    //setActiveTable(true);
    //setActiveId(id);
  };

  return (
    <>
      <div className={cn( styles.row, { [styles.selected]: activeId === item.id }, { [styles.active]: visibleActions })} onMouseLeave={() => setVisibleActions(false)} onClick={handleRowClick}>
        <div className={styles.col}>
          <Checkbox
            className={styles.checkbox}
            value={value}
            onChange={onChange}
          />
        </div>
        <div className={styles.col}>
          <div className={styles.item} onClick={() => handleClick(item.id)}>
            <div className={styles.avatar}>
              <img src={item.avatar} alt="Avatar" />
            </div>
            <div className={styles.details}>
              <div className={styles.user}>{item.user}</div>
              <div className={styles.login}>{item.login}</div>
              <div className={styles.email}>{item.email}
              </div>
            </div>

          </div>
          
        </div>
        <div className={styles.col}>
          <div className={styles.email}>{item.email}</div>
          <Control className={styles.control}  visibleActions={visibleActions} setVisibleActions={setVisibleActions} up={up} item={customersDetails ? customerDetails : item} customersDetails={customersDetails}/>
        </div>
        <div className={styles.col}>
          <div className={cn("status-green-dark", styles.purchase)}>
            {item.purchase}
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.lifetime}>
            <div className={styles.price}>${item.price}</div>
            <Balance className={styles.balance} value={item.balance} />
          </div>
        </div>
        <div className={styles.col}>{item.comments}</div>
        <div className={styles.col}>{item.likes}</div>
      </div>
      <Modal outerClassName={styles.outer} visible={visibleModal} onClose={() => setVisibleModal(false)} >
        <Details item={refunds[0]} customersDetails={customersDetails} onClose={() => setVisibleModal(false)}/>
      </Modal>
    </>
  );
};

export default Row;
