import React, { useState } from "react";
import cn from "classnames";
import styles from "./Product.module.sass";
import Control from "./Control";
import Icon from "../Icon";
import Checkbox from "../Checkbox";
import ModalProduct from "../ModalProduct";
import ModalPreview from "../ModalPreview";
import { formatDate } from "../../Utils/formatDate";

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

const Product = ({ className, item, value, isPackage, isDetailsPack, onChange, released, isReserved, withoutСheckbox, modalDetail, isPreviewHidden, product, getAllPackages, onClickDelete}) => {

  const [visible, setVisible] = useState(false);
  const [visibleModalProduct, setVisibleModalProduct] = useState(false);
  const [visibleModalPreview, setVisibleModalPreview] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Pour stocker l'élément sélectionné


  const price = isPackage ? item?.package_price : (isDetailsPack ? '' : item.price)
  const ratingValue = isPackage ? 4.9 : (isDetailsPack ? '' : item.ratingValue)
  const ratingCounter = isPackage ? 123 : (isDetailsPack ? '' : item.ratingCounter)

  const handleClick = () => {
    onChange();
    setVisible(!visible);
  };

  const handleChangeVisibleProduct = (itemSelected) => {
    if (modalDetail) {
      setSelectedItem(itemSelected); 
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
          {!isReserved && <Control className={styles.control} selectedItem={selectedItem} getAllPackages={getAllPackages} packageId={item?.id} productId={item?.id} product={isPackage} onClickDelete={onClickDelete}/>}
          <img srcSet={`${isPackage ? item.photos_packages : item.photo_products} 2x`} src={isPackage ? item.photos_packages :  item.photo_products } alt="Product" />
          {!isPreviewHidden &&
            <button className={cn("button-white button-small", styles.buttonPreview)} onClick={() => setVisibleModalPreview(true)} >
              Show preview
            </button>
          }
        </div>
        <div onClick={() => handleChangeVisibleProduct(item)} style={{cursor: modalDetail ? 'pointer' : ''}}>
          <div className={styles.line}>
            <div className={styles.title}>{isPackage ? item?.package_name : item?.product_name}</div>
            {(!isDetailsPack && isPackage) && (
              price > 0 ? (
                <div className={styles.price}>{price}XAF</div>
              ) : (
                <div className={styles.empty}>{price}XAF</div>
              )
            )}
          </div>
          {!isReserved && (
            <>
              {released ? (
                <div className={styles.date}>
                  <Icon name="clock" size="24" /> {isPackage ? formatDate(item?.created_at) : item.date}
                </div>
              ) : ratingValue ? (
                <div className={styles.rating}>
                  <Icon name="star-fill" size="24" />
                  {ratingValue}{" "}
                  <span className={styles.counter}>({ratingCounter})</span>
                </div>
              ) : (
                <div className={cn(styles.rating, styles.ratingEmpty)}>
                  <Icon name="star-stroke" size="24" />
                  No ratings
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {selectedItem !== null && (<ModalProduct visible={visibleModalProduct} onClose={() => setVisibleModalProduct(false)} detailsData={selectedItem} key={selectedItem?.id}/>)}
      <ModalPreview key={selectedItem?.id} detailsData={selectedItem}  product={product} visible={visibleModalPreview} onClose={() => setVisibleModalPreview(false)} gallery={gallery}  title={product ? "Fleet - Travel shopping UI design kit" : "Products included in the offer "} figcaption="Elegant product mockup for your next project" />
    </>
  );
};

export default Product;
