import React, { useState } from "react";
import cn from "classnames";
import styles from "./Panel.module.sass";
import Icon from "../../../Icon";
import Modal from "../../../Modal";
import Avatar from "../../../Avatar";
import Share from "./Share";

const Panel = ({ className, product }) => {
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <>
      <div className={cn(styles.panel, className)}>
        <Avatar user={{username: 'pouako', photo: "/images/content/avatar.jpg"}} classname={styles.avatar} width='64px'  height='64px'/>
        {/*<div className={styles.brand}>
          <img src="/images/content/figma.png" alt="Figma" />
          <div className={styles.counter}>3</div>
        </div>*/}
        <button className={styles.share} onClick={() => setVisibleModal(true)}>
          <Icon name="share" size="24" />
        </button>
      </div>
      <Modal outerClassName={styles.outer} visible={visibleModal} onClose={() => setVisibleModal(false)} >
        <Share product={product}/>
      </Modal>
    </>
  );
};

export default Panel;
