import React from "react";
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
import { formatDate } from "../../../../Utils/formatDate";
import Loader from "../../../../components/Loader";


const Chart = ({allCustomers, loader}) => {
  const {t} = useTranslation()
  const darkMode = useDarkMode(false);

  const customerKey = t('views.customers.total_customers')
  
  const customerCountsByDate = allCustomers?.reduce((acc, customer) => {
    const { date_of_commitment } = customer;
    
    if (acc[date_of_commitment]) {
      acc[date_of_commitment]++;
    } else {
      acc[date_of_commitment] = 1;
    }

    return acc;
  }, {});

  // Conversion en tableau d'objets avec tri des dates
  const resultCustomerByDateArray = Object.keys(customerCountsByDate)
    .sort((a, b) => new Date(a) - new Date(b)) // Trier les dates de la plus ancienne à la plus récente
    .map(date => {
      const validDate = date && !isNaN(new Date(date).getTime()); // Vérifie si la date est valide
  
      return {
        name: validDate ? formatDate(date, 'GETDATE') : 'Date inconnue', // Format seulement si la date est valide
        [customerKey]: customerCountsByDate[date]
      };
    });


  return (
    <div className={styles.chart}>
      {loader ? <Loader/> :
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={resultCustomerByDateArray}
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
              dataKey={customerKey}
              dot={false}
              strokeWidth={4}
              stroke="#F2D45F"
            />
          </LineChart>
        </ResponsiveContainer>
      }
    </div>
  );
};

export default Chart;
