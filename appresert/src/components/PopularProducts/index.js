import React, { useState } from "react";
import cn from "classnames";
import styles from "./PopularProducts.module.sass";
import { Link } from "react-router-dom";
import Card from "../Card";
import ModalProduct from "../ModalProduct";
import { Routes } from "../../Constants";
import { useTranslation } from "react-i18next";


const PopularProducts = ({ className, views, popularProducts }) => {
  const {t} = useTranslation()

  const [visibleModalProduct, setVisibleModalProduct] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Pour stocker l'élément sélectionné

  const handleChangeVisiblePackage = (itemSelected) => {
    setSelectedItem(itemSelected); 
    setVisibleModalProduct(true)
  };

  return (
    <>
      <Card
        className={cn(styles.card, className)}
        title={t("views.home.popular_products")}
        classTitle="title-blue"
      >
        <div className={styles.popular}>
          <div className={styles.head}>
            <div className={styles.stage}>{t('navigation.products')}</div>
            <div className={styles.stage}>{t('views.home.no_occurences')}</div>
          </div>
          <div className={styles.list}>
            {popularProducts?.map(
              (x, index) =>
                views > index && (
                  <>
                    <div className={styles.item}  key={index} onClick={() => handleChangeVisiblePackage(x.details)} >
                      <div className={styles.preview}>
                        <img
                          srcSet={`${x.details.photo_products} 2x`}
                          src={x.details.photo_products}
                          alt="Product"
                        />
                      </div>
                      <div className={styles.title}>{x.product_name}</div>
                      <div className={styles.details}>
                        <div className={styles.price}>{x.num_package}</div>
                        {x.details.is_active ? (
                          <div className={cn("status-green", styles.status)}>
                            {t('words.active')}
                          </div>
                        ) : (
                          <div className={cn("status-red", styles.status, styles.statusRed)}>
                            {t('words.not_active')}
                          </div>
                        )}
                      </div>
                    </div>
                    {selectedItem !== null && (<ModalProduct visible={visibleModalProduct}  onClose={() => setVisibleModalProduct(false)} product={true} items={[]} detailsData={selectedItem} key={selectedItem?.id}/>)}
                  </>
                )
            )}
          </div>
          <Link
            className={cn("button-stroke", styles.button)}
            to={Routes.PRODUITS_DASH}
          >
            {t('views.home.all_products')}
          </Link>
        </div>
      </Card>
        
    </>
  );
};

export default PopularProducts;
