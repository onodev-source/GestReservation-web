import React, { useCallback, useEffect } from "react";
import cn from "classnames";
import { createPortal } from "react-dom";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import OutsideClickHandler from "react-outside-click-handler";
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import styles from "./ModalProduct.module.sass";
import Panel from "./Panel";
import Slider from "react-slick";
import Icon from "../Icon";

const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <button {...props}>{children}</button>
);

const ModalProduct = ({ visible, onClose, video, gallery, download, title, figcaption, product, detailsData}) => {
  //const [selectedImage, setSelectedImage] = React.useState(gallery?.length > 0 && gallery[0]);

   // Définition de la fonction escFunction en utilisant useCallback pour éviter de recréer la fonction à chaque rendu.
   const titlePreview =  detailsData?.product_name 
   const figcaptionPreview = detailsData?.product_description 

  const escFunction = useCallback(
    (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    },
    [onClose]
  );

   // Utilisation de useEffect pour ajouter et retirer l'écouteur d'événement "keydown"
  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  // Utilisation de useEffect pour contrôler le défilement du corps lorsque le modal est visible
  useEffect(() => {
    if (visible) {
      const target = document.querySelector("#modal-product");
      disableBodyScroll(target);
    } else {
      clearAllBodyScrollLocks();
    }
  }, [visible]);

  //paramettre envoyer au slide
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
  };


  return createPortal(
    visible && (
      <div id="modal-product" className={styles.modal}>
        <div className={styles.outer}>
          <OutsideClickHandler onOutsideClick={onClose}>
            <Panel  title={!title ? titlePreview : title} onClose={onClose}  galleryPanel={gallery}/>
            {/*product ? (*/}
              <>
                {video && (
                  <div className={styles.video}>
                    <video controls>
                      <source  src={video} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
                    </video>
                  </div>
                )}
                {/*gallery && (*/}                                   
                  <div className={styles.wrapper}>
                    <Slider className={cn("photo-slider", styles.spacing)} {...settings}>
                      {/*gallery.map((x, index) => (*/}
                        <InnerImageZoom src={detailsData?.photo_products} zoomSrc={detailsData?.photo_products} zoomType="hover" zoomScale={2} zoomPreload={true} width={980} className={styles.fullImage}/>
                      {/*))*/}
                    </Slider>
                    {/*figcaption && (*/}
                      <div className={styles.figcaption}>{figcaption ? figcaption : figcaptionPreview}</div>
                    {/*})*/}
                  </div>
                {/*)*/}
              </>
            {/*) : (
              <>
                {video && (
                  <div className={styles.video}>
                    <video controls>
                      <source  src={video} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
                    </video>
                  </div>
                )}
                  <div className={cn(styles.imageGallery)}>
                    <div className={cn(styles.imageList)}>
                      {gallery.map((image, index) => (
                        <img  key={index}  src={image.img}  alt={image.alt} className={cn(styles.thumbnail, { [styles.active]: selectedImage === image })} onClick={() => setSelectedImage(image)}
                          style={{ cursor: 'pointer', marginBottom: '10px', width: '100px' }} 
                        />
                      ))}
                    </div>
                    <div className={cn(styles.imagePreview)}>
                      <InnerImageZoom className={styles.innerImage} {detailsData?.photo_products} zoomSrc={selectedImage.img2x} zoomType="hover" zoomScale={2}/>
                      <div className={styles.figcaption}>{figcaption ? figcaption : figcaptionPreview}</div>
                    </div>
                  </div>
              </>
            )*/}
          </OutsideClickHandler>
        </div>
      </div>
    ),
    document.body
  );
};

export default ModalProduct;
