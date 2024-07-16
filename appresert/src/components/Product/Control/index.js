import React, { useState } from "react";
import styles from "./Control.module.sass";
import cn from "classnames";
import Icon from "../../Icon";
import ModalProduct from "../../ModalProduct";
import { Link } from "react-router-dom";
import { Routes } from "../../../Constants";

const Control = ({ className }) => {
  const [visibleModalProduct, setVisibleModalProduct] = useState(false);

  const actions = [
    {
      icon: "edit",
      url: Routes.PACKAGES_EDIT,
    },
    {
      icon: "trash",
      action: () => console.log("remove"),
    },
    {
      icon: "arrow-right",
      action: () => setVisibleModalProduct(true),
    },
  ];

  return (
    <>
      <div className={cn(styles.control, className)}>
        {actions.map((x, index) => (
          x.url ? (
            <Link className={cn(styles.button)} to={x.url} >
              <Icon name={x.icon} size="20" />
            </Link>
          ) : (
            <button className={styles.button} key={index} onClick={x.action}>
              <Icon name={x.icon} size="20" />
            </button>
          )
        ))}
      </div>
      <ModalProduct
        visible={visibleModalProduct}
        onClose={() => setVisibleModalProduct(false)}
      />
    </>
  );
};

export default Control;
