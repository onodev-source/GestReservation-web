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
          {product ? 'Fleet - Travel shopping UI design kit' : detailsData?.package_name}
        </div>
        <div className={styles.info}>
          {product ? 'Elegant product mockup for your next project' : detailsData?.package_name}
        </div>
        <div className={styles.line}>
          <div className={styles.author}>
            <Avatar user={{username: 'Chelsie Haley', photo: "/images/content/avatar.jpg"}} classname={styles.avatar} width='32px'  height='32px'/>
            by <span className={styles.span}>Chelsie Haley</span>
          </div>
          <div className={styles.rating}>
            <Icon name="star-fill" size="24" />
            4.8
            <span className={styles.counter}>(87)</span>
          </div>
        </div>
        <div className={styles.gallery}>
          {gallery.map(
            (x, index) =>
              index < 1 && (
                <div className={styles.preview} key={index}>
                  <InnerImageZoom className={styles.innerImage} src={x.img} zoomSrc={x.img2x} zoomType="hover" zoomScale={2}/>
                </div>
              )
          )}
          {/*<button className={cn("button-white", styles.button)} onClick={() => setVisibleModalPreview(true)} >
            Show 0    preview
          </button>*/}
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={cn("title-red", styles.subtitle)}>{product ? "Product description" : "Package description"}</div>
            <div className={styles.content}>
              <p>
                Meet Node - a crypto NFT marketplace iOS UI design kit for
                Figma, Sketch, and Adobe XD. The kit includes 126 stylish mobile
                screens in light and dark mode, a bunch of crypto 3D
                illustrations, 1 SaaS landing page with full premade
                breakpoints, and hundreds of components to help you ship your
                next crypto, NFT product faster.
              </p>
              <p>
                Types of screens included: onboarding, connect wallet, home
                feed, profile, upload, menu, search, product detail,
                notification...
              </p>
              <p>
                If you have any questions or requests, please feel free to leave
                them all in the comments section.
              </p>
            </div>
          </div>
          <div className={styles.col}>
            <div className={cn("title-purple", styles.subtitle)}>Features</div>
            <ul className={styles.features}>
              { product ? (
                features.map((x, index) => (
                  <li key={index}>{x}</li>
                ))
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
