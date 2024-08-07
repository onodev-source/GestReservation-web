import React from "react";
import styles from "./ProductViews.module.sass";
import Card from "../../../components/Card";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useTranslation } from "react-i18next";

const data = [
  {
    name: "Mo 11",
    views: 20,
  },
  {
    name: "Tu 12",
    views: 60,
  },
  {
    name: "We 13",
    views: 45,
  },
  {
    name: "Th 14",
    views: 16,
  },
  {
    name: "Fr 15",
    views: 20,
  },
  {
    name: "Sa 16",
    views: 115,
  },
  {
    name: "Su 17",
    views: 25,
  },
];

const ProductViews = () => {
  const {t} = useTranslation()

  return (
    <Card className={styles.card} title={t('views.products.product_view')} classTitle="title-blue">
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
            barSize={30}
            barGap={8}
          >
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fontWeight: "500", fill: "#6F767E" }}
              padding={{ left: 10 }}
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
            <Bar dataKey="views" fill="#6F767E" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ProductViews;
