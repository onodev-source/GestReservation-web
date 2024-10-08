import React from "react";
import cn from "classnames";
import styles from "./Earning.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Overview from "./Overview";
import ProductSales from "./ProductSales";
import TopCountries from "./TopCountries";
import Table from "./Table";
//import Balance from "../../components/Balance";
import Chart from "./Chart";
import Dropdown from "../../components/Dropdown";
import Card from "../../components/Card";
import { useTranslation } from "react-i18next";

const intervals = ["Last 28 days", "Last 14 days", "Last 7 days"];

const Earning = ({resertList}) => {
  const {t} = useTranslation()
  const [sorting, setSorting] = React.useState(intervals[0]);
  return (
    <>
      <div className={styles.section}>
        <Overview className={styles.card} />
        <div className={styles.row}>
          {resertList ? (
            <>
              <Card className={cn(styles.card)} title={t('views.reservations.performance_by_day')} classTitle={cn("title-red", styles.cardTitle)}
                classCardHead={styles.cardHead}
                head={
                  <Dropdown className={styles.dropdown}  classDropdownHead={styles.dropdownHead} value={sorting}
                    setValue={setSorting} options={intervals} small
                  />
                }
              >
                <div className={styles.overview}>
                  {/*<div className={styles.details}>
                    <div className={cn("h4", styles.title)}>1,509 customers</div>
                    <div className={styles.line}>
                      <Balance className={styles.balance} value="37.8" background /> vs.
                      Sep 8, 2021
                    </div>
                  </div>*/}
                  <Chart />
                </div>
              </Card>
            </>
          ) : (
            <>
              <div className={styles.col}>
                <ProductSales />
              </div>
              <div className={styles.col}>
                <TopCountries />
              </div>
            </>
          )}
        </div>
        <Table />
      </div>
      <TooltipGlodal />
    </>
  );
};

export default Earning;
