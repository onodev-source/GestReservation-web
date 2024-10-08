import React from "react";
import cn from "classnames";
import styles from "./Overview.module.sass";
import TooltipGlodal from "../../../components/TooltipGlodal";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import Tooltip from "../../../components/Tooltip";
import Balance from "../../../components/Balance";
import { useTranslation } from "react-i18next";


const Overview = ({ className }) => {
  const {t} = useTranslation()

  const items = [
    {
      title: t('views.reservations.reservations'),
      counter: "128",
      icon: "activity",
      color: "#F0C830",
      tooltip: "Small description Earning",
      value: 37.8,
    },
    {
      title: t('views.reservations.balance'),
      counter: "$512.64",
      icon: "pie-chart",
      color: "#6F767E",
      tooltip: "Small description Balance",
      value: -17.8,
    },
    {
      title: t('views.reservations.total_customer'),
      counter: "646",
      icon: "profile-circle",
      color: "#F0C830",
      tooltip: "Small description Total",
      value: 24.3,
    },
  ];
  return (
    <>
      <Card className={cn(styles.card, className)}>
        <div className={styles.overview}>
          <div className={styles.list}>
            {items.map((x, index) => (
              <div className={styles.item} key={index}>
                <div  className={styles.icon}  style={{ backgroundColor: x.color }} >
                  <Icon name={x.icon} size="24" />
                </div>
                <div className={styles.details}>
                  <div className={styles.label}>
                    {x.title}
                    <Tooltip className={styles.tooltip} title={x.tooltip} icon="info"  place="top"/>
                  </div>
                  <div className={styles.counter}>{x.counter}</div>
                  <div className={styles.indicator}>
                    <Balance className={cn(styles.balance, {[styles.balanceColor] : x.value < 0})} value={x.value} />
                    <span>this week</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <TooltipGlodal />
    </>
  );
};

export default Overview;
