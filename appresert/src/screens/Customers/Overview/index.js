import React from "react";
import cn from "classnames";
import styles from "./Overview.module.sass";
import Card from "../../../components/Card";
//import Dropdown from "../../../components/Dropdown";
import Users from "../../../components/Users";
import Balance from "../../../components/Balance";
import Chart from "./Chart";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../../Utils/formatDate";

//const intervals = ["Last 28 days", "Last 14 days", "Last 7 days"];


const Overview = ({ className, allCustomers, loader }) => {
  const {t} = useTranslation()
  //const [sorting, setSorting] = useState(intervals[0]);
  

  return (

    <Card className={cn(styles.card, className)} title={t('views.customers.total_customers')} classTitle={cn("title-red", styles.cardTitle)}
      classCardHead={styles.cardHead}
      head={<>
        {/*<Dropdown className={styles.dropdown}  classDropdownHead={styles.dropdownHead} value={sorting}
          setValue={setSorting} options={intervals} small
        />*/}
      </>
      }
    >
      <div className={styles.overview}>
        <div className={styles.details}>
          <div className={cn("h4", styles.title)}>1,509 {t('navigation.customers')}</div>
          <div className={styles.line}>
            <Balance className={styles.balance} value="37.8" background /> 
            vs. {formatDate(new Date().toISOString(), 'GET')}
          </div>
        </div>
        <Chart allCustomers={allCustomers} loader={loader}/>
        <Users className={styles.users} customerList={true}/>
      </div>
    </Card>
  );
};

export default Overview;
