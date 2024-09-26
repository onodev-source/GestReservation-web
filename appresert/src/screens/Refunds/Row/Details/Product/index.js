import React from "react";
import styles from "./Product.module.sass";
import cn from "classnames";
import Avatar from "../../../../../components/Avatar";

const Product = ({ item, className, customersDetails }) => {
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
        <div className={styles.product}>{item.email || `Reservation No: ${item.order_number}`}</div>
        {item.statut !=="PENDING" ? (
          <div className={styles.new}>New request</div>
        ) : (
          <div className={styles.progress}>In progress</div>
        )}
      </div>
    </div>
  );
};

export default Product;
