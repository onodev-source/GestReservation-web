import React from "react";
import styles from "./Product.module.sass";
import cn from "classnames";
import Avatar from "../../../../../components/Avatar";
import { useTranslation } from "react-i18next";

const Product = ({ item, className, customersDetails }) => {
  const {t} = useTranslation()
  return (
    <div className={cn(styles.item, className)}>
      {customersDetails ? (
        <Avatar user={{username: item.email, photo: item.photo_user}} classname={styles.preview}  width='80px'  height='80px'/>
      ) : (
        <div className={styles.preview}>
          {/*<img srcSet={`${item.image2x} 2x`} src={item.image} alt="Product" />*/}RE
        </div>
      )}
      <div className={styles.details}>
        <div className={styles.product}>{item.email || `${t('views.reservations.reservation')} No: ${item.order_number}`}</div>
        {!customersDetails ?
            item.statut !=="PENDING" ? (
              <div className={styles.new}>{item.statut}</div>
            ) : (
              <div className={styles.progress}>In progress</div>
            )
          :
            item.is_online ? (
              <div className={styles.new}>Online</div>
            ) : (
              <div className={styles.progress}>Not online</div>
            )
        }
      </div>
    </div>
  );
};

export default Product;
