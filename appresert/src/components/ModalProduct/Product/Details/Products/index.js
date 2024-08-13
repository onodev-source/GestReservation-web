import React from "react";
import cn from "classnames";
import styles from "./Products.module.sass";
import { Link } from "react-router-dom";
import Icon from "../../../../Icon";
import Product from "../../../../Product";
import Slider from "react-slick";

// data
import { products } from "../../../../../mocks/products";
import { Routes } from "../../../../../Constants";

const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <button {...props}>{children}</button>
);

const Products = ({product}) => {
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
        <div className={cn("title-green", styles.title)}>{product ? "More like this" : "Products included in package"}</div>
        <Link  className={cn("button-stroke button-small", styles.button)}  to={Routes.PRODUITS_DASH} >
          <span>View all</span>
          <Icon name="arrow-right" size="24" />
        </Link>
      </div>
      <div className={cn("slider-container", styles.wrapper)}>
        <Slider className={cn("products-slider", {"products-sliderSpacing" : !product})} {...settings}>
          {products.map((x, index) => (
            <Product className={styles.product}  item={x}  key={index} withoutСheckbox product={product}/>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Products;
