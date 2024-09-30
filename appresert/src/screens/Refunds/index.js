import React, { useCallback, useState } from "react";
import cn from "classnames";
import styles from "./Refunds.module.sass";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import Row from "./Row";

// data
import { refunds } from "../../mocks/refunds";
import Overview from "../Earning/Overview";
import Dropdown from "../../components/Dropdown";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import RequestDashboard from "../../Services/Api/ApiServices";
//import { Link } from "react-router-dom";
//import { Routes } from "../../Constants";

const intervals = ["Sort by: All", "Sort by: in progress", "Sort by: new request", "Sort by: A-Z"];

const Refunds = () => {
  //const {t} = useTranslation()
  const users = useSelector((state) => state.users);

  //const [activeIndex, setActiveIndex] = useState(0);
  const [loader, setLoader] = useState(false);
  const [incomes, setIncomes] = useState([]);
  const [sorting, setSorting] = React.useState(intervals[0]);

  const getAllInvoices = useCallback(async() => {
    setLoader(true)
    let res = await RequestDashboard('gestreserv/invoices/', 'GET', '', users.access_token);
    if (res.status === 200) {
      setIncomes(res.response.results);
      setLoader(false)
    }
  }, [users.access_token]);
  
  React.useEffect(() => {
    getAllInvoices()
  }, [getAllInvoices])


  return (
    <>
      <Overview className={styles.card} />
      <Card  className={cn(styles.card, styles.cardMag)}  classCardHead={styles.head} title="Income list" classTitle={cn("title-purple", styles.title)}
        head={
          <div className={styles.sorting}>
            <Dropdown className={styles.dropdown}  classDropdownHead={styles.dropdownHead} value={sorting} setValue={setSorting} options={intervals} small/>
          </div>
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
            {incomes?.length > 0 ?
              incomes.map((x, index) => (
                <Row item={x} key={index} />
              ))
              :
              <h4>No content</h4>
            }
          </div>
        </div>
        {/*<div className={styles.foot}>
          <button className={cn("button-stroke button-small", styles.button)}>
            <Loader className={styles.loader} />
            <span>Load more</span>
          </button>
        </div>*/}
      </Card>
    </>
  );
};

export default Refunds;
