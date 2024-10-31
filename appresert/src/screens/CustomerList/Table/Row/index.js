import React, { useState } from "react";
import styles from "./Row.module.sass";
import cn from "classnames";
import Checkbox from "../../../../components/Checkbox";
import Balance from "../../../../components/Balance";
import Control from "../../../../components/Table/Row/Control"
import Modal from "../../../../components/Modal";
import Avatar from "../../../../components/Avatar";
import Details from "../../../Refunds/Row/Details";

//import Refunds from "../../../Refunds";
import { refunds } from "../../../../mocks/refunds";
import { Link } from "react-router-dom";
import { Routes } from "../../../../Constants";
import { useSelector } from "react-redux";

/*const customerDetails = {
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
}*/

const Row = ({
  item,
  allItem,
  value,
  onChange,
  activeTable,
  setActiveTable,
  activeId,
  setActiveId,
  up,
  onDeleteCust,
  customersDetails
}) => {
  const users = useSelector((state) => state.users);

  const [visibleActions, setVisibleActions] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Pour stocker l'élément sélectionné

  React.useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 1023);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleRowClick = (itemSelected) => {
    if (isMobile) {
      setSelectedItem(itemSelected)
      setVisibleModal(true);
    } else{
      setSelectedItem(itemSelected)
    }
  };
  const handleClick = (id) => {
    //setActiveTable(true);
    //setActiveId(id);
  };

  
  return (
    <>
      <div className={cn( styles.row, { [styles.selected]: activeId === item.id }, { [styles.active]: visibleActions })} onMouseLeave={() => setVisibleActions(false)} onClick={() => handleRowClick(item)}>
        <div className={styles.col}>
          <Checkbox
            className={styles.checkbox}
            value={value}
            onChange={onChange}
          />
        </div>
        <div className={styles.col}>
          <div className={styles.item} onClick={() => handleClick(item.id)}>
            <Avatar user={{username: item.email, photo: item.photo_user}} classname={styles.avatar}/>
            <div className={styles.details}>
              <Link className={styles.user} style={{ textTransform: "capitalize",}} to={item?.id === users.users.id ? Routes.MY_PROFILE : `${Routes.MY_PROFILE}/${item?.id}`}>{item.full_name}</Link>
              <div className={styles.login}>@{item.email}</div>
              <div className={styles.email}>{item.email}
              </div>
            </div>

          </div>
          
        </div>
        <div className={styles.col}>
          <div className={styles.email}>{item.email}</div>
          <Control className={styles.control} onClick={onDeleteCust} visibleActions={visibleActions} setVisibleActions={setVisibleActions} up={up} item={customersDetails ? item : item} customerId={allItem.customer_id} customersDetails={customersDetails} selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
        </div>
        <div className={styles.col}>
          <div className={cn("status-green-dark", styles.purchase)}>
            {item.purchase || '0'}
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.lifetime}>
            <div className={styles.price}>{item.price || '0.00'}XAF</div>
            <Balance className={styles.balance} value={item.balance || '0.0'} />
          </div>
        </div>
        <div className={styles.col}>{item.comments || '0'}</div>
        <div className={styles.col}>{item.likes || '0'}</div>
      </div>
      <Modal outerClassName={styles.outer} visible={visibleModal} onClose={() => setVisibleModal(false)} >
        <Details item={customersDetails ? selectedItem : refunds[0]} onDeleteCust={onDeleteCust} customersDetails={customersDetails} onClose={() => setVisibleModal(false)}/>
      </Modal>
    </>
  );
};

export default Row;
