import React, { useState } from "react";
import cn from "classnames";
import styles from "./Product.module.sass";
import Control from "./Control";
import Icon from "../Icon";
import Checkbox from "../Checkbox";
import ModalProduct from "../ModalProduct";
import ModalPreview from "../ModalPreview";

const gallery = [
  {
    img: "/images/content/photo-1.jpg",
    img2x: "/images/content/photo2xx-1.jpg"
  },
  {
    img: "/images/content/photo-2.jpg",
    img2x: "/images/content/photo-2.jpg"
  }
];

const Product = ({ className, item, value,  onChange, released, withoutСheckbox, modalDetail, isPreviewHidden, product}) => {
  const [visible, setVisible] = useState(false);
  const [visibleModalProduct, setVisibleModalProduct] = useState(false);
  const [visibleModalPreview, setVisibleModalPreview] = useState(false);

  const handleClick = () => {
    onChange();
    setVisible(!visible);
  };

  const handleChangeVisibleProduct = () => {
    if (modalDetail) {
      setVisibleModalProduct(true)
    }
  };


  return (
    <>
      <div className={cn(styles.product, className, { [styles.active]: visible })} >
        <div className={styles.preview}>
          {!withoutСheckbox && (
            <Checkbox className={styles.checkbox} classCheckboxTick={styles.checkboxTick} value={value}  onChange={() => handleClick()}/>
          )}
          <Control className={styles.control} />
          <img srcSet={`${item.image2x} 2x`} src={item.image} alt="Product" />
          {!isPreviewHidden &&
            <button className={cn("button-white button-small", styles.buttonPreview)} onClick={() => setVisibleModalPreview(true)} >
              Show preview
            </button>
          }
        </div>
        <div onClick={handleChangeVisibleProduct} style={{cursor: modalDetail ? 'pointer' : ''}}>
          <div className={styles.line}>
            <div className={styles.title}>{item.product}</div>
            {item.price > 0 ? (
              <div className={styles.price}>${item.price}</div>
            ) : (
              <div className={styles.empty}>${item.price}</div>
            )}
          </div>
          {released ? (
            <div className={styles.date}>
              <Icon name="clock" size="24" /> {item.date}
            </div>
          ) : item.ratingValue ? (
            <div className={styles.rating}>
              <Icon name="star-fill" size="24" />
              {item.ratingValue}{" "}
              <span className={styles.counter}>({item.ratingCounter})</span>
            </div>
          ) : (
            <div className={cn(styles.rating, styles.ratingEmpty)}>
              <Icon name="star-stroke" size="24" />
              No ratings
            </div>
          )}
        </div>
      </div>
      
      <ModalProduct visible={visibleModalProduct} onClose={() => setVisibleModalProduct(false)} />
      <ModalPreview product={product} visible={visibleModalPreview} onClose={() => setVisibleModalPreview(false)} gallery={gallery}  title={product ? "Fleet - Travel shopping UI design kit" : "Products included in the offer "} figcaption="Elegant product mockup for your next project" />
    </>
  );
};

export default Product;
