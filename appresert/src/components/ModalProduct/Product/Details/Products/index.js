import React from "react";
import cn from "classnames";
import styles from "./Products.module.sass";
import { Link } from "react-router-dom";
import Icon from "../../../../Icon";
import Product from "../../../../Product";
import Slider from "react-slick";

import { Routes } from "../../../../../Constants";
import { useTranslation } from "react-i18next";

const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <button {...props}>{children}</button>
);

const Products = ({product, productData, onClick}) => {
  const {t} = useTranslation()

  const settings = {
    infinite: true,
    slidesToShow: product ? 3 : 1,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: (
      <SlickArrow>
        <Icon name="arrow-right" size="24" />
      </SlickArrow>
    ),
    prevArrow: (
      <SlickArrow>
        <Icon name="arrow-left" size="24" />
      </SlickArrow>
    ),
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: product ? 2 : 1,
        },
      },
    ],
  };

  return (
    <div className={styles.products}>
      <div className={styles.head}>
        <div className={cn("title-green", styles.title)}>{product ? t("words.more_like_this") : t("words.products_included_in_pack")}</div>
        <Link  className={cn("button-stroke button-small", styles.button)}  to={Routes.PRODUITS_DASH} >
          <span>View all</span>
          <Icon name="arrow-right" size="24" />
        </Link>
      </div>
      <div className={cn("slider-container", styles.wrapper)}>
        <Slider className={cn("products-slider", {"products-sliderSpacing" : !product})} {...settings}>
          {productData?.map((x, index) => (
            <Product className={styles.product}  item={x}  key={index} withoutСheckbox product={product} isDetailsPack={product ? false : true} onClickDelete={onClick} showPreview={true}/>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Products;
