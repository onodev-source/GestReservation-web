import React from "react";
import styles from "./Cell.module.sass";
import cn from "classnames";
import Balance from "../../../../../components/Balance";

const Cell = ({ item, redIndicator, greenIndicator, blueIndicator }) => {
  return (
    <div className={styles.cell}>
      <div className={styles.box}>
        <div className={styles.number}> 0</div>{/*counter*/}
        <div className={styles.line}>
          <div
            className={cn(
              styles.progress,
              { [styles.red]: redIndicator },
              { [styles.green]: greenIndicator },
              { [styles.blue]: blueIndicator }
            )}
            style={{
              width:  0,
            }}
          ></div>{/*item.progress*/}
        </div>
      </div>
      <Balance className={styles.balance} value={0} />{/*item.balance*/}
    </div>
  );
};

export default Cell;
