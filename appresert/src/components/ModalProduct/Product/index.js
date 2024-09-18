import React, { useState } from "react";
import styles from "./Product.module.sass";
import cn from "classnames";
import Details from "./Details";
import Comments from "./Comments";
import Panel from "./Panel";
//import Icon from "../../Icon";

const Product = ({product, detailsData, items, onClick}) => {
  const [visible, setVisible] = useState(false);//state permettant de gerer les tab 
  //state permettant de  gerer les index des tab du modal 
  const [activeIndex, setActiveIndex] = useState(0);

  //fonction permettant de mettre jour les state
  const handleClose = () => {
    setActiveIndex(0);
    setVisible(false);
  };

  return (
    <div className={cn(styles.product, { [styles.active]: visible })}>
      <Details  className={styles.details} setValue={setVisible} activeIndex={activeIndex} setActiveIndex={setActiveIndex} product={product} detailsData={detailsData} items={items.filter((item) => item.id !== detailsData.id)} onClick={onClick}/>
      {!product && <Comments className={styles.comments} onClose={() => handleClose()} />}
      <Panel className={styles.panel} product={product}/>
      {/*<button className={styles.next}>
        <Icon name="arrow-right" size="24" />
      </button>*/}
    </div>
  );
};

export default Product;
