import React, { useState } from "react";
import styles from "./Row.module.sass";
import Checkbox from "../../../../../components/Checkbox";
import Control from "../../Control";
import ModalProduct from "../../../../../components/ModalProduct";
import { formatDate } from "../../../../../Utils/formatDate";

const Row = ({ item, value, onChange, up, onClick, items }) => {
  const [visibleActions, setVisibleActions] = useState(false);
  const [visibleModalProduct, setVisibleModalProduct] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Pour stocker l'élément sélectionné

  const handleChangeVisiblePackage = (itemSelected) => {
    setSelectedItem(itemSelected); 
    setVisibleModalProduct(true)
  };


  return (
    <>
      <div className={styles.row} onMouseLeave={() => setVisibleActions(false)}>
        <div className={styles.col}>
          <Checkbox
            className={styles.checkbox}
            value={value}
            onChange={onChange}
          />
        </div>
        <div className={styles.col}>
          <div className={styles.item} onClick={() => handleChangeVisiblePackage(item)} >
            <div className={styles.preview}>
              <img
                srcSet={`${item.photo_products} 2x`}
                src={item.photo_products}
                alt="Product"
              />
            </div>
            <div className={styles.details}>
              <div className={styles.product}>{item.product_name}</div>
              <div className={styles.date}>{formatDate(item.created_at)}</div>
            </div>
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.line} style={{ width: Math.floor((item.product_quantity > 20 ? item.product_quantity : (item.product_quantity * 10))) + "%"}}>
            <div className={styles.box} style={{ backgroundColor: item.is_active ? "#B5E4CA" : '#FF6A55' }} >
              <div className={styles.tooltip}>
                <div className={styles.subtitle}>{item.category}</div>
                <div className={styles.legend}>
                  <div  className={styles.color}  style={{ backgroundColor: '"#B1E5FC"' }} ></div>
                  <div className={styles.counter}>
                    Qty : {item.product_quantity}
                  </div>
                </div>
              </div>
              </div>
          </div>
          <Control
            className={styles.control}
            visibleActions={visibleActions}
            setVisibleActions={setVisibleActions}
            up={up} onClick={onClick} productId={item.id} item={item} setSelectedItem={setSelectedItem} setVisibleModalProduct={setVisibleModalProduct}
          />
        </div>
      </div>
      
      {selectedItem !== null && (<ModalProduct visible={visibleModalProduct} onClick={onClick} onClose={() => setVisibleModalProduct(false)} product={true} items={items} detailsData={selectedItem} key={selectedItem?.id}/>)}
    </>
  );
};

export default Row;
