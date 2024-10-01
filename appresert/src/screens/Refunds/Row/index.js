import React, { useState } from "react";
import styles from "./Row.module.sass";
import Modal from "../../../components/Modal";
import Details from "./Details";
import Actions from "../../../components/Actions";
import Avatar from "../../../components/Avatar";
import { formatDate } from "../../../Utils/formatDate";


const Row = ({ item, onDeleteInvoice }) => {
  const [visibleModal, setVisibleModal] = useState(false);

  const actions = [
    {
      title: "Delete",
      icon: "trash",
      action: onDeleteInvoice,
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
                srcSet={`${item.image2x || '/images/content/product-pic-1.jpg'} 2x`}
                src={item.image || '/images/content/product-pic-1.jpg'}
                alt="Product"
              />
            </div>
            <div className={styles.details}>
              <div className={styles.product}>{item.product || 'Bento Matte 3D Illustration'}</div>
              <div className={styles.category}>{item.category || 'OnoPremium'}</div>
              {item.payment_statut !== 'PENDING' ? (
                <div className={styles.new}>New request</div>
              ) : (
                <div className={styles.progress}>In progress</div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.col}>
          {item.payment_statut !== 'PENDING' ? (
            <div className={styles.new}>New request</div>
          ) : (
            <div className={styles.progress}>In progress</div>
          )}
        </div>
        <div className={styles.col}>{formatDate(item.invoice_date)}</div>
        <div className={styles.col}>
          <div className={styles.user}>
            <Avatar user={{username: 'pouako', photo: ''}} classname={styles.avatar}  width='32px'  height='32px'/>
            Pouako audrey
          </div>
        </div>
        <div className={styles.col}>{Math?.floor(item.invoice_amount)}XAF</div>
        <div className={styles.col}>
          <Actions className={styles.actions} classActionsHead={styles.actionsHead} classActionsBody={styles.actionsBody}classActionsOption={styles.actionsOption} items={actions}/>
        </div>
      </div>
      <Modal  outerClassName={styles.outer} key={item.id} visible={visibleModal} onClose={() => setVisibleModal(false)} >
        <Details item={item} incomeDetail={true} onDeleteInvoice={onDeleteInvoice} onClose={() => setVisibleModal(false)}/>
      </Modal>
    </>
  );
};

export default Row;
