import React, { useCallback, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import styles from "./ModalProduct.module.sass";
import Icon from "../Icon";
import Product from "./Product";
import { Routes } from "../../Constants";

const ModalProduct = ({ visible, onClose, product }) => {
  
  // Définition de la fonction escFunction en utilisant useCallback pour éviter de recréer la fonction à chaque rendu.
  const escFunction = useCallback(
    (e) => {
      // Vérifie si la touche pressée est "Escape" (keyCode 27)
      if (e.keyCode === 27) {
        // Appelle la fonction onClose pour fermer le modal
        onClose();
      }
    }, [onClose]
  );

  // Utilisation de useEffect pour ajouter et retirer l'écouteur d'événement "keydown"
  useEffect(() => {
    // Ajoute escFunction comme écouteur pour l'événement "keydown"
    document.addEventListener("keydown", escFunction, false);

    // Fonction de nettoyage pour retirer l'écouteur lorsque le composant est démonté
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]); 

  // Utilisation de useEffect pour contrôler le défilement du corps lorsque le modal est visible
  useEffect(() => {
    if (visible) {
      // Si le modal est visible, désactive le défilement du corps de la page
      const target = document.querySelector("#modal-product");
      disableBodyScroll(target);
    } else {
      // Si le modal n'est pas visible, réactive le défilement du corps de la page
      clearAllBodyScrollLocks();
    }
  }, [visible]); 


  return createPortal(
    visible && (
      <div id="modal-product" className={styles.modal}>
        <div className={styles.control}>
          <Link className={cn("button-white", styles.button)} to={product ? Routes.PRODUITS_EDIT : Routes.PACKAGES_EDIT} >
          {product ? "Edit product" : "Edit package"}
          </Link>
          <button className={styles.close} onClick={onClose}>
            <Icon name="close" size="20" />
          </button>
        </div>
        <div className={styles.outer}>
          <Product product={product}/>
        </div>
      </div>
    ),
    document.body
  );
};

export default ModalProduct;
