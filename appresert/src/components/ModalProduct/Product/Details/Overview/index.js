import React, { useState } from "react";
import cn from "classnames";
import InnerImageZoom from 'react-inner-image-zoom';
import styles from "./Overview.module.sass";
import Icon from "../../../../Icon";
import Avatar from "../../../../Avatar";
//import ModalPreview from "../../../../ModalPreview";

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

const features = [
  "128 prebuilt screens",
  "SaaS landing page ready",
  "Global styleguide",
  "Dark + light more ready",
];

const Overview = ({product, detailsData}) => {
  //const [visibleModalPreview, setVisibleModalPreview] = useState(false);

  return (
    <>
      <div className={styles.overview}>
        <div className={cn("h4", styles.title)}>
          {product ? detailsData?.product_name : detailsData?.package_name}
        </div>
        <div className={styles.info}>
          {product ? detailsData?.product_name : detailsData?.package_name}
        </div>
        <div className={styles.line}>
          <div className={styles.author}>
            <Avatar user={{username: product ? detailsData?.manager?.get_manager_name : 'pouako', photo: ""}} classname={styles.avatar} width='32px'  height='32px'/>
            by <span className={styles.span}>{product ? detailsData?.manager?.get_manager_name : 'Pouako'}</span>
          </div>
          <div className={styles.rating}>
            <Icon name="star-fill" size="24" />
            4.8
            <span className={styles.counter}>(87)</span>
          </div>
        </div>
        <div className={styles.gallery}>
          <div className={styles.preview}>
            <InnerImageZoom className={styles.innerImage} width={972} src={product ? detailsData.photo_products : detailsData?.photos_packages} zoomSrc={product ? detailsData.photo_products : detailsData?.photos_packages} zoomType="hover" zoomScale={2}/>
          </div>
          {/*<button className={cn("button-white", styles.button)} onClick={() => setVisibleModalPreview(true)} >
            Show 0    preview
          </button>*/}
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={cn("title-red", styles.subtitle)}>{product ? "Product description" : "Package description"}</div>
            <div className={styles.content}>
              <p>
                {product ? (
                  detailsData?.product_description
                ) : (
                  `Meet Node - a crypto NFT marketplace iOS UI design kit for
                  Figma, Sketch, and Adobe XD. The kit includes 126 stylish mobile
                  screens in light and dark mode, a bunch of crypto 3D
                  illustrations, 1 SaaS landing page with full premade
                  breakpoints, and hundreds of components to help you ship your
                  next crypto, NFT product faster.`
                )}
              </p>
            </div>
          </div>
          <div className={styles.col}>
            <div className={cn("title-purple", styles.subtitle)}>Features</div>
            <ul className={styles.features}>
              { product ? (
                <li>{detailsData?.caracteristics_products}</li>
              ) : (
                <>
                  <li>Number of persons: {detailsData?.nb_persons}</li>
                  <li>Number of place: {detailsData?.nb_places}</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      {/*<ModalPreview visible={visibleModalPreview} product={product} onClose={() => setVisibleModalPreview(false)} gallery={gallery}  title={product ? "Fleet - Travel shopping UI design kit" : "Products included in the offer "} figcaption="Elegant product mockup for your next project" download />*/}
    </>
  );
};

export default Overview;
