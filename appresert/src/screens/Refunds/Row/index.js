import React, { useState } from "react";
import styles from "./Row.module.sass";
import Modal from "../../../components/Modal";
import Details from "./Details";
import Actions from "../../../components/Actions";
import Avatar from "../../../components/Avatar";


const Row = ({ item }) => {
  const [visibleModal, setVisibleModal] = useState(false);

  const actions = [
    {
      title: "Delete",
      icon: "trash",
      action: () => console.log("Delete"),
    },
    {
      title: "Details",
      icon: "arrow-right",
      action: () => setVisibleModal(true),
    }
  ];

  return (
    <>
      <div className={styles.row} >
        <div className={styles.col} onClick={() => setVisibleModal(true)}>
          <div className={styles.item}>
            <div className={styles.preview}>
              <img
                srcSet={`${item.image2x} 2x`}
                src={item.image}
                alt="Product"
              />
            </div>
            <div className={styles.details}>
              <div className={styles.product}>{item.product}</div>
              <div className={styles.category}>{item.category}</div>
              {item.status ? (
                <div className={styles.new}>New request</div>
              ) : (
                <div className={styles.progress}>In progress</div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.col}>
          {item.status ? (
            <div className={styles.new}>New request</div>
          ) : (
            <div className={styles.progress}>In progress</div>
          )}
        </div>
        <div className={styles.col}>{item.date}</div>
        <div className={styles.col}>
          <div className={styles.user}>
            <Avatar user={{username: item.man, photo: item.avatar}} classname={styles.avatar}  width='32px'  height='32px'/>
            {item.man}
          </div>
        </div>
        <div className={styles.col}>${item.amount}</div>
        <div className={styles.col}>
          <Actions className={styles.actions} classActionsHead={styles.actionsHead} classActionsBody={styles.actionsBody}classActionsOption={styles.actionsOption} items={actions}/>
        </div>
      </div>
      <Modal  outerClassName={styles.outer}  visible={visibleModal} onClose={() => setVisibleModal(false)} >
        <Details item={item} />
      </Modal>
    </>
  );
};

export default Row;
