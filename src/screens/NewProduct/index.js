import React, { useState } from "react";
import styles from "./NewProduct.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Modal from "../../components/Modal";
import Schedule from "../../components/Schedule";
import NameAndDescription from "./NameAndDescription";
import ImagesAndCTA from "./ImagesAndCTA";
import Price from "./Price";
import CategoryAndAttibutes from "./CategoryAndAttibutes";
import ProductFiles from "./ProductFiles";
import Discussion from "./Discussion";
import Preview from "./Preview";
import Panel from "./Panel";

const NewProduct = ({product}) => {
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>
          <NameAndDescription className={styles.card} product={product}/>
         {/* <ImagesAndCTA className={styles.card} />*/}
          <Price className={styles.card} product={product} />
          <CategoryAndAttibutes className={styles.card} categoryAttribute={true} product={product}/>
          <CategoryAndAttibutes className={styles.card} product={product}/>
          {/*<ProductFiles className={styles.card} />*/}
          {/*<Discussion className={styles.card} />*/}
        </div>
        <div className={styles.col}>
          <ProductFiles className={styles.card} product={product}/>
          {/*<Preview
            visible={visiblePreview}
            onClose={() => setVisiblePreview(false)}
          />*/}
        </div>
      </div>
      <Panel  setVisiblePreview={setVisiblePreview} setVisibleSchedule={setVisibleModal} product={product}/>
      <TooltipGlodal />
      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <Schedule  startDate={startDate}  setStartDate={setStartDate} startTime={startTime} setStartTime={setStartTime}/>
      </Modal>
    </>
  );
};

export default NewProduct;
