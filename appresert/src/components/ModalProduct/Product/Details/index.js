import React, { useState } from "react";
import cn from "classnames";
import styles from "./Details.module.sass";
import Icon from "../../../Icon";
import Overview from "./Overview";
import Products from "./Products";
import { useTranslation } from "react-i18next";


const Details = ({ className, setValue, activeIndex, setActiveIndex, product, detailsData, items, onClick }) => {
  const {t} = useTranslation()
  const navigation = product ? [t('views.products.detail_product')] : [t('views.packages.detail_package'), t('views.packages.comment')];

  //mise a jours de l'index actif
  const handleClick = (index) => {
    setActiveIndex(index);
    index === 0 && setValue(false);
    index === 1 && setValue(true);
  };

  return (
    <div className={cn(styles.details, className)}>
      <div className={styles.head}>
        <div className={styles.nav}>
          {navigation.map((x, index) => (
            <button className={cn(styles.link, {  [styles.active]: index === activeIndex, })}onClick={() => handleClick(index)} key={index} >
              {x}
            </button>
          ))}
        </div>
        <div className={styles.btns}>
          <button className={cn("button-stroke", styles.favorite)}>
            <Icon name="heart-fill" size="24" />
            <span>32</span>
          </button>
          <button className={cn("button", styles.buy)}>
            <span className={styles.price}>{!product ? `${Math.floor(detailsData?.package_price)}XAF` : `Qty: ${detailsData.product_quantity}`}</span>
            {/*<span className={styles.inner}>
              Download<span> now</span>
              <Icon name="download" size="24" />
            </span>*/}
          </button>
        </div>
      </div>
      <Overview product={product} detailsData={detailsData}/>
      <Products product={product} productData={!product ? detailsData?.products : items} onClick={onClick}/>
    </div>
  );
};

export default Details;
