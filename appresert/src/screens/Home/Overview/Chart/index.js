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
//import { getAllInvoices } from "../../../../Utils/LikeComment";
//import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../../../Utils/formatDate";
//import Loader from "../../../../components/Loader";

const Chart = ({invoiceByDate}) => {
  const {t} = useTranslation()
  const darkMode = useDarkMode(false);
  //const users = useSelector((state) => state.users);

  //const [invoices, setInvoices] = useState([])
  //const [loader, setLoader] = useState(false)

  const invoiceKey = t("views.reservations.agenda.total_amout");

  /*const invoiceAmountsByDate = invoices?.filter(invoice => invoice.payment_statut === "COMPLETED") // prendre celle que le paiement a reussi
    .reduce((acc, invoice) => {
      const { invoice_date, invoice_amount } = invoice;

      // Convertit le montant en nombre si ce n'est pas déjà fait
      const amount = parseFloat(invoice_amount);

      if (acc[invoice_date]) {
        acc[invoice_date] += amount;
      } else {
        acc[invoice_date] = amount;
      }

      return acc;
  }, {});*/

  // Filtrer les dates nulles, trier et formater
  const resultArrayInvoiceByAmount = invoiceByDate?.filter(invoice => invoice.invoice_date !== null) // Exclure les dates nulles
    .sort((a, b) => new Date(a.invoice_date) - new Date(b.invoice_date)) // Trier les dates de la plus ancienne à la plus récente
    .map(invoice => ({
      name: formatDate(invoice.invoice_date, 'GETDATE'),
      [invoiceKey]: invoice.total_amount
    }));



  /*useEffect(() => {
    getAllInvoices(setLoader, users, setInvoices)
  }, [users])*/

  return (
    <div className={styles.chart}>
      {/*loader ? <Loader/> :*/}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart  width={500}   height={300}   data={resultArrayInvoiceByAmount}  margin={{  top: 0,  right: 0,  left: 0, bottom: 0, }} >
            <CartesianGrid  strokeDasharray="none" stroke={darkMode.value ? "#272B30" : "#EFEFEF"}  vertical={false} />
            <XAxis dataKey="name"  axisLine={false} tickLine={false}  tick={{ fontSize: 12, fontWeight: "500", fill: "#9A9FA5" }} padding={{ left: 10 }}/>
            <YAxis  axisLine={false} tickLine={false}
              tick={{ fontSize: 12, fontWeight: "500", fill: "#9A9FA5" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#272B30", borderColor: "rgba(255, 255, 255, 0.12)", borderRadius: 8,
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
            <Line  type="monotone"  dataKey={invoiceKey}  dot={false}  strokeWidth={4} stroke="#F2D45F" />
          </LineChart>
        </ResponsiveContainer>
      {/*}*/}
    </div>
  );
};

export default Chart;
