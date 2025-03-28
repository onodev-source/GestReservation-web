import React, { useState } from "react";
import cn from "classnames";
import styles from "./Product.module.sass";
import Control from "./Control";
import Icon from "../Icon";
import Checkbox from "../Checkbox";
import ModalProduct from "../ModalProduct";
import ModalPreview from "../ModalPreview";
import { formatDate } from "../../Utils/formatDate";

/*const gallery = [
  {
    img: "/images/content/photo-1.jpg",
    img2x: "/images/content/photo2xx-1.jpg"
  },
  {
    img: "/images/content/photo-2.jpg",
    img2x: "/images/content/photo-2.jpg"
  }
];*/

const Product = ({ className, item, value, isPackage, isDetailsPack, onChange, released, isReserved, withoutСheckbox, modalDetail, isPreviewHidden, product, getAllPackages, onClickDelete, showPreview}) => {

  const [visible, setVisible] = useState(false);
  const [visibleModalProduct, setVisibleModalProduct] = useState(false);
  const [visibleModalPreview, setVisibleModalPreview] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Pour stocker l'élément sélectionné


  const price = isPackage ? item?.package_price : (isDetailsPack ? '' : item.price)
  const ratingValue = isPackage ? 4.9 : (isDetailsPack ? '' : item.ratingValue)
  const ratingCounter = isPackage ? 123 : (isDetailsPack ? '' : item.ratingCounter)

  const  handleClick = () => {
    onChange();
    setVisible(!visible);
  };

  const handleChangeVisibleProduct = (itemSelected) => {
    if (modalDetail) {
      setSelectedItem(itemSelected); 
      setVisibleModalProduct(true)
    } else if(showPreview){
      setSelectedItem(itemSelected);
      setVisibleModalPreview(true)
    }
  };

  return (
    <>
      <div className={cn(styles.product, className, { [styles.active]: visible })} >
        <div className={styles.preview}>
          {!withoutСheckbox && (
            <Checkbox className={styles.checkbox} classCheckboxTick={styles.checkboxTick} value={value}  onChange={() => handleClick()}/>
          )}
          {!isReserved && <Control className={styles.control} item={item} getAllPackages={getAllPackages} prodOrPackId={item?.id} product={isPackage} onClickDelete={onClickDelete} handleChangeVisibleProduct={handleChangeVisibleProduct}/>}
          <img srcSet={`${isPackage ? item.photos_packages : item.photo_products} 2x`} src={isPackage ? item.photos_packages :  item.photo_products } alt="Product" />
          {!isPreviewHidden &&
            <button className={cn("button-white button-small", styles.buttonPreview)} onClick={() => handleChangeVisibleProduct(item)} >
              Show preview
            </button>
          }
        </div>
        <div onClick={() => handleChangeVisibleProduct(item)} style={{cursor: modalDetail ? 'pointer' : ''}}>
          <div className={styles.line}>
            <div className={styles.title}>{isPackage ? item?.package_name : item?.product_name}</div>
            {(!isDetailsPack && isPackage) && (
              price > 0 ? (
                <div className={styles.price}>{Math.floor(price)}XAF</div>
              ) : (
                <div className={styles.empty}>{Math.floor(price)}XAF</div>
              )
            )}
          </div>
          {!isReserved && (
            <div className={cn({[styles.flexContent]: isPackage})}>
              {isPackage && <span> <Icon name='check-all' size="24"/> {item.category.category_name}</span>}
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
            </div>
          )}
        </div>
      </div>
      
      {selectedItem !== null && (<ModalProduct visible={visibleModalProduct} onClose={() => setVisibleModalProduct(false)} detailsData={selectedItem} key={selectedItem?.id}/>)}
      <ModalPreview key={selectedItem?.id} detailsData={selectedItem} product={product} visible={visibleModalPreview} onClose={() => setVisibleModalPreview(false)} />
    </>
  );
};

export default Product;
