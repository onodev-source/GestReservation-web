import React, { useState } from "react";
import cn from "classnames";
import styles from "./Overview.module.sass";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import Users from "../../../components/Users";
import Balance from "../../../components/Balance";
import Chart from "./Chart";
import { useTranslation } from "react-i18next";

const intervals = ["Last 28 days", "Last 14 days", "Last 7 days"];

const customerDetails = {
  product: "Filomena Fahey",
  login: "@username",
  status: true,
  image: "/images/content/avatar-2.jpg",
  avatar: "/images/content/avatar-2.jpg",
  parameters: [
    {
      title: "Customer register",
      content: "Aug 20, 2021",
    },
    {
      title: "Email",
      content: "fahey.designer@robot.com",
    },
    {
      title: "Customer actif",
      downloadedStatus: true,
      downloadedValue: true,
    },
    {
      title: "Purchase date",
      content: "July 01, 2021",
    },
    {
      title: "Purchase",
      content: 12,
    },
    {
      title: "Comments",
      content: 14,
    },
    {
      title: "Like",
      price: 6,
    },
    {
      title: "Balance",
      tooltip: "Description balance",
      price: 2.8,
    },
    {
      title: "Price",
      tooltip: "Description Price",
      price: 72.88,
    },
  ],
}

const Overview = ({ className }) => {
  const {t} = useTranslation()
  const [sorting, setSorting] = useState(intervals[0]);

  return (

    <Card className={cn(styles.card, className)} title={t('views.customers.total_customers')} classTitle={cn("title-red", styles.cardTitle)}
      classCardHead={styles.cardHead}
      head={
        <Dropdown className={styles.dropdown}  classDropdownHead={styles.dropdownHead} value={sorting}
          setValue={setSorting} options={intervals} small
        />
      }
    >
      <div className={styles.overview}>
        <div className={styles.details}>
          <div className={cn("h4", styles.title)}>1,509 {t('navigation.customers')}</div>
          <div className={styles.line}>
            <Balance className={styles.balance} value="37.8" background /> vs.
            Sep 8, 2021
          </div>
        </div>
        <Chart />
        <Users className={styles.users} customerList={true} item={customerDetails}/>
      </div>
    </Card>
  );
};

export default Overview;
