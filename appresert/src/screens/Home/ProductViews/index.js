import React, { useState } from "react";
import styles from "./ProductViews.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useDarkMode from "@fisch0920/use-dark-mode";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../../Utils/formatDate";
import Loader from "../../../components/Loader";
import NoContent from "../../../components/NoContent";

const intervals = ["Last 7 days", "This month", "All time"];


const ProductViews = ({ className, loader, orders }) => {
  const darkMode = useDarkMode(false);
  const {t} = useTranslation()
  /*const users = useSelector((state) => state.users);
  const [loader, setLoader] = useState(false);
  const [orders, setOrders] = useState([]);*/
  const [sorting, setSorting] = useState(intervals[0]);

  const orderKey = t("views.home.order_total");


  /*const reservationCountsByDate = orders?.reduce((acc, reservation) => {
    const { begin_date } = reservation;
    
    if (acc[begin_date]) {
      acc[begin_date]++;
    } else {
      acc[begin_date] = 1;
    }

    return acc;
  }, {});*/

  // Filtrer les dates nulles, trier et formater
  const resultArray = orders?.length > 0 && orders?.filter(order => order.begin_date !== null) // Exclure les dates nulles
  .sort((a, b) => new Date(a.begin_date) - new Date(b.begin_date)) // Trier par date
  .map(order => ({
    name: formatDate(order.begin_date, 'GETDATE'), // Convertir la date
    [orderKey]: order.total_reservations
  }));

  return (
    <Card
      className={cn(styles.card, className)}
      title={t('views.home.orders')}
      classTitle="title-purple"
      head={
        <Dropdown
          className={styles.dropdown}
          classDropdownHead={styles.dropdownHead}
          value={sorting}
          setValue={setSorting}
          options={intervals}
          small
        />
      }
    >
      <div className={styles.chart}>
        {loader ? <Loader/> :
          <ResponsiveContainer width="100%" height="100%">
            {resultArray?.length > 0 ?
              <BarChart
                width={500}
                height={300}
                data={resultArray}
                margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
                barSize={32}
                barGap={8}
              >
                <CartesianGrid
                  strokeDasharray="none"
                  stroke={darkMode.value ? "#272B30" : "#EFEFEF"}
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fontWeight: "500", fill: "#6F767E" }}
                  padding={{ left: 10 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fontWeight: "500", fill: "#6F767E" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#272B30",
                    borderColor: "rgba(255, 255, 255, 0.12)",
                    borderRadius: 8,
                    boxShadow:
                      "0px 4px 8px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.1), inset 0px 0px 1px #000000",
                  }}
                  labelStyle={{ fontSize: 12, fontWeight: "500", color: "#fff" }}
                  itemStyle={{
                    padding: 0,
                    textTransform: "capitalize",
                    fontSize: 12,
                    fontWeight: "600",
                    color: "#fff",
                  }}
                  cursor={{ fill: "#f3f2f3" }}
                />
                <Bar dataKey={orderKey} fill="#F0C830" />
              </BarChart>
              : <NoContent message={''} styleSpace={{marginLeft: '40px'}}/>
            }
          </ResponsiveContainer>
        }
      </div>
    </Card>
  );
};

export default ProductViews;
