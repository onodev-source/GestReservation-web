import React, { useState } from "react";
import cn from "classnames";
import styles from "./Refunds.module.sass";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import Row from "./Row";

// data
import { refunds } from "../../mocks/refunds";
import Overview from "../Earning/Overview";
import Dropdown from "../../components/Dropdown";

const intervals = ["Sort by: All", "Sort by: in progress", "Sort by: new request", "Sort by: A-Z"];

const Refunds = () => {
  //const [activeIndex, setActiveIndex] = useState(0);
  const [sorting, setSorting] = React.useState(intervals[0]);

  return (
    <>
      <Overview className={styles.card} />
      <Card  className={cn(styles.card, styles.cardMag)}  classCardHead={styles.head} title="Income list" classTitle={cn("title-purple", styles.title)}
        head={
          <Dropdown className={styles.dropdown}  classDropdownHead={styles.dropdownHead} value={sorting} setValue={setSorting} options={intervals} small
          />
        }
      >
        <div className={styles.wrapper}>
          <div className={styles.table}>
            <div className={styles.row}>
              <div className={styles.col}>Packages</div>
              <div className={styles.col}>Status</div>
              <div className={styles.col}>Date</div>
              <div className={styles.col}>Customer</div>
              <div className={styles.col}>Amount</div>
              <div className={styles.col}>Actions</div>
            </div>
            {refunds.map((x, index) => (
              <Row item={x} key={index} />
            ))}
          </div>
        </div>
        <div className={styles.foot}>
          <button className={cn("button-stroke button-small", styles.button)}>
            <Loader className={styles.loader} />
            <span>Load more</span>
          </button>
        </div>
      </Card>
    </>
  );
};

export default Refunds;
