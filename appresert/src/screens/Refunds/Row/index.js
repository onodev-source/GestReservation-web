import React, { useState } from "react";
import cn from "classnames";
import styles from "./Row.module.sass";
import Modal from "../../../components/Modal";
import Details from "./Details";
import Actions from "../../../components/Actions";
import Avatar from "../../../components/Avatar";
import { formatDate } from "../../../Utils/formatDate";
import { useTranslation } from "react-i18next";


const Row = ({ item, onDeleteInvoice }) => {
  const {t} = useTranslation()
  const [visibleModal, setVisibleModal] = useState(false);

  const actions = [
    {
      title: t("words.deleted"),
      icon: "trash",
      action: onDeleteInvoice,
    },
    {
      title: t("words.details"),
      icon: "arrow-right",
      action: () => setVisibleModal(true),
    }
  ];


  return (
    <>
      <div className={styles.row} >
        <div className={styles.col} onClick={() => setVisibleModal(true)}>
          <div className={styles.item}>
            <div className={cn(styles.preview, {[styles.previewImg]: item.orderDetails?.packages?.length >= 2})}>
              {item.orderDetails?.packages?.map((pack, index) => (
                <img
                  srcSet={`${pack?.photos_packages} 2x`}
                  src={pack?.photos_packages}
                  alt="Package"
                  key={index}
                />
              ))}
            </div>
            <div className={styles.details}>
              {item.orderDetails?.packages?.map((pack, index) => (
                <>
                  <div className={styles.product}>{pack?.package_name.length >= 17 ? `${pack?.package_name.slice(0, 17)}...` : pack?.package_name}</div>
                  <div className={styles.category}>{pack?.category_name}</div>
                </>
              ))}
              {item.payment_statut !== 'PENDING' ? (
                <div className={styles.new}>{item.payment_statut}</div>
              ) : (
                <div className={styles.progress}>In progress</div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.col}>
          {item.payment_statut !== 'PENDING' ? (
            <div className={styles.new}>{item.payment_statut}</div>
          ) : (
            <div className={styles.progress}>In progress</div>
          )}
        </div>
        <div className={styles.col}>{formatDate(item.invoice_date)}</div>
        <div className={styles.col}>
          <div className={styles.user} style={{textTransform: 'capitalize'}}>
            <Avatar user={{username: item.orderDetails?.user.full_name.trim() !== '' ? item.orderDetails?.user.full_name : item.orderDetails?.user.email, photo: item.orderDetails?.user.photo_user}} classname={styles.avatar}  width='32px'  height='32px'/>
            {item.orderDetails?.user.full_name.trim() !== '' ? (item.orderDetails?.user.full_name.length > 12 ? `${item.orderDetails?.user.full_name.slice(0, 11)}...` : item.orderDetails?.user.full_name)
            : (item.orderDetails?.user.email.length > 12 ? `${item.orderDetails?.user.email.slice(0, 11)}...` : item.orderDetails?.user.email)}
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
