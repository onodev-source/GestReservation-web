import React, { useState } from "react";
import cn from "classnames";
import styles from "./PopularProducts.module.sass";
import { Link } from "react-router-dom";
import Card from "../Card";
import ModalProduct from "../ModalProduct";
import { Routes } from "../../Constants";
import { useTranslation } from "react-i18next";

const products = [
  {
    title: "Crypter - NFT UI kit",
    price: "$2,453.80",
    active: true,
    image: "/images/content/product-pic-1.jpg",
    image2x: "/images/content/product-pic-1@2x.jpg",
  },
  {
    title: "Bento Matte 3D illustration 1.0",
    price: "$105.60",
    active: false,
    image: "/images/content/product-pic-2.jpg",
    image2x: "/images/content/product-pic-2@2x.jpg",
  },
  {
    title: "Fleet - travel shopping kit",
    price: "$648.60",
    active: true,
    image: "/images/content/product-pic-3.jpg",
    image2x: "/images/content/product-pic-3@2x.jpg",
  },
  {
    title: "Fleet - travel shopping kit",
    price: "$648.60",
    active: true,
    image: "/images/content/product-pic-4.jpg",
    image2x: "/images/content/product-pic-4@2x.jpg",
  },
  {
    title: "Crypter - NFT UI kit",
    price: "$2,453.80",
    active: true,
    image: "/images/content/product-pic-5.jpg",
    image2x: "/images/content/product-pic-5@2x.jpg",
  },
  {
    title: "Bento Matte 3D illustration 1.0",
    price: "$105.60",
    active: false,
    image: "/images/content/product-pic-2.jpg",
    image2x: "/images/content/product-pic-2@2x.jpg",
  },
  {
    title: "Fleet - travel shopping kit",
    price: "$648.60",
    active: true,
    image: "/images/content/product-pic-3.jpg",
    image2x: "/images/content/product-pic-3@2x.jpg",
  },
  {
    title: "Fleet - travel shopping kit",
    price: "$648.60",
    active: true,
    image: "/images/content/product-pic-4.jpg",
    image2x: "/images/content/product-pic-4@2x.jpg",
  },
];

const PopularProducts = ({ className, views }) => {
  const {t} = useTranslation()
  const [visibleModalProduct, setVisibleModalProduct] = useState(false);

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
            <div className={styles.stage}>Earning</div>
          </div>
          <div className={styles.list}>
            {products.map(
              (x, index) =>
                views > index && (
                  <div
                    className={styles.item}
                    key={index}
                    onClick={() => setVisibleModalProduct(true)}
                  >
                    <div className={styles.preview}>
                      <img
                        srcSet={`${x.image2x} 2x`}
                        src={x.image}
                        alt="Product"
                      />
                    </div>
                    <div className={styles.title}>{x.title}</div>
                    <div className={styles.details}>
                      <div className={styles.price}>{x.price}</div>
                      {x.active ? (
                        <div className={cn("status-green", styles.status)}>
                          Active
                        </div>
                      ) : (
                        <div className={cn("status-red", styles.status, styles.statusRed)}>
                          Deactive
                        </div>
                      )}
                    </div>
                  </div>
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
      <ModalProduct visible={visibleModalProduct}  onClose={() => setVisibleModalProduct(false)} product={true}/>
    </>
  );
};

export default PopularProducts;
