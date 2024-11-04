import React, { useEffect } from "react";
//import cn from "classnames";
import styles from "./Chart.module.sass";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useDarkMode from "@fisch0920/use-dark-mode";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { formatDate } from "../../../Utils/formatDate";
import { getAllReservations } from "../../../Utils/LikeComment";
import Loader from "../../../components/Loader";
import NoContent from "../../../components/NoContent";


const Chart = () => {
  const {t} = useTranslation()
  const darkMode = useDarkMode(false);
  const users = useSelector((state) => state.users);

  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const orderKey = t("views.home.order_total");


  const reservationCountsByDate = orders?.reduce((acc, reservation) => {
    const { begin_date } = reservation;
    
    if (acc[begin_date]) {
      acc[begin_date]++;
    } else {
      acc[begin_date] = 1;
    }

    return acc;
  }, {});

  // Conversion en tableau d'objets avec tri des dates
  const resultArray = Object.keys(reservationCountsByDate)
    .sort((a, b) => new Date(a) - new Date(b)) // Trier les dates de la plus ancienne à la plus récente
    .map(date => ({
      name: formatDate(date, 'GETDATE'),
      [orderKey]: reservationCountsByDate[date]
    }));
  
    
  useEffect(() => {
    getAllReservations({setLoading: setLoading, users: users, setOrders: setOrders})
  }, [users]);


  return (
    <div className={styles.chart}>
      {loading ? <Loader/> :
        <ResponsiveContainer width="100%" height="100%">
          {resultArray.length > 0 ?
            <LineChart
              width={500}
              height={300}
              data={resultArray}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
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
                tick={{ fontSize: 12, fontWeight: "500", fill: "#9A9FA5" }}
                padding={{ left: 10 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fontWeight: "500", fill: "#9A9FA5" }}
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
              />
              <Line
                type="monotone"
                dataKey={orderKey}
                dot={false}
                strokeWidth={4}
                stroke="#F2D45F"
              />
            </LineChart>
            : <NoContent message={''} styleSpace={{marginLeft: '20px'}}/>
          }
        </ResponsiveContainer>
      }
    </div>
  );
};

export default Chart;
