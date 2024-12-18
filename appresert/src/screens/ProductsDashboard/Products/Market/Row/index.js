import React, { useState } from "react";
import styles from "./Row.module.sass";
import cn from "classnames";
import Checkbox from "../../../../../components/Checkbox";
import Balance from "../../../../../components/Balance";
import ModalProduct from "../../../../../components/ModalProduct";
import Control from "../../Control";

import { numberWithCommas } from "../../../../../utils.js";
//import { formatDate } from "../../../../../Utils/formatDate.js";
import { useTranslation } from "react-i18next";

const Row = ({ item, value, onChange, up, onClick, items }) => {
  const {t} = useTranslation()
  const [visibleActions, setVisibleActions] = useState(false);
  const [visibleModalProduct, setVisibleModalProduct] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Pour stocker l'élément sélectionné

  const image2x = item.photo_products ? item.photo_products : "/images/content/product-pic-1@2x.jpg"

  const handleChangeVisiblePackage = (itemSelected) => {
    setSelectedItem(itemSelected); 
    setVisibleModalProduct(true)
  };

  return (
    <>
      <div className={styles.row} onMouseLeave={() => setVisibleActions(false)}>
        <div className={styles.col}>
          <Checkbox className={styles.checkbox}  value={value} onChange={onChange}/>
        </div>
        <div className={styles.col}>
          <div className={styles.item} onClick={() => handleChangeVisiblePackage(item)} >
            <div className={styles.preview}>
              {/*<img srcSet={`${item.image2x} 2x`}  src={item.image}  alt="Product" />*/}
              <img srcSet={`${image2x} 2x`}  src={item.image}  alt="Product" />
            </div>
            <div className={styles.details}>
              <div className={styles.product}>{item.product_name}</div>
              <div className={styles.wrap}>
                <div className={styles.price}>{item.product_quantity}</div>
                <div className={styles.category}>{item.category}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>Status</div>
          {item.is_active ? (
            <div className={cn("status-green", styles.status)}>Active</div>
          ) : (
            <div className={cn("status-red", styles.statusRed)}>Deactive</div>
          )}
          <Control className={styles.control}  visibleActions={visibleActions} setVisibleActions={setVisibleActions} up={up} onClick={onClick} productId={item.id} item={item} setSelectedItem={setSelectedItem} setVisibleModalProduct={setVisibleModalProduct}/>
        </div>
        <div className={styles.col}>{item.product_quantity}</div>
        <div className={styles.col}>
          <div className={styles.label}>Sales</div>
          <div className={styles.sales}>
            {/*<div className={styles.number}>${numberWithCommas(item?.product_quantity)}</div>*/}
            <div className={styles.number}>${numberWithCommas(200)}</div>
            <Balance className={styles.balance} value={item.product_quantity} />
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>{t('views.products.add.category')}</div>
          <div className={styles.box}>
            <div className={styles.number}>
              {/*(item.product_quantity / 1000).toFixed(0)*/} {item.category}
            </div>
            {/*<div className={styles.line}>
              <div
                className={styles.progress}
                style={{
                  backgroundColor: "#2A85FF",
                  width: item.product_quantity,
                }}
              ></div>
            </div>*/}
          </div>
        </div>
        {/*<div className={styles.col}>
          <div className={styles.label}>Likes</div>
          <div className={styles.box}>
            <div className={styles.number}>{item.product_quantity}</div>
            <div className={styles.line}>
              {/*<div className={styles.progress} style={{ backgroundColor: "#8E59FF",  width: item.likesPercent, }}></div>
              <div className={styles.progress} style={{ backgroundColor: "#8E59FF",  width: item.product_quantity, }}></div>
            </div>
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>Create at</div>
          <div className={styles.box}>
            <div className={styles.number}>{formatDate(item.created_at)}</div>
          </div>
        </div>*/}
        <div className={cn(styles.col, styles.colHide)}>
          <div className={styles.colContaint}>
            <div className={styles.label}>Options</div>
            <div className={styles.box}>
              <Control  visibleActions={visibleActions} setVisibleActions={setVisibleActions} up={up} onClick={onClick} productId={item.id} item={item} setSelectedItem={setSelectedItem} setVisibleModalProduct={setVisibleModalProduct}/>
            </div>
          </div>
        </div>
      </div>
      {/*<ModalProduct visible={visibleModalProduct} onClose={() => setVisibleModalProduct(false)} product={true} detailsData={selectedItem} key={selectedItem?.id}/>*/}
        
      {selectedItem !== null && (<ModalProduct visible={visibleModalProduct} onClick={onClick} onClose={() => setVisibleModalProduct(false)} product={true} items={items} detailsData={selectedItem} key={selectedItem?.id}/>)}
    </>
  );
};

export default Row;
