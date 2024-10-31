import React, { useCallback, useState } from "react";
import styles from "./Table.module.sass";
import cn from "classnames";
import Checkbox from "../../../components/Checkbox";
import Loader from "../../../components/Loader";
import Row from "./Row";

// data
import { customers } from "../../../mocks/customers";
import { useSelector } from "react-redux";
import RequestDashboard from "../../../Services/Api/ApiServices";
import { useTranslation } from "react-i18next";
import NoContent from "../../../components/NoContent";
import { getAllCustomers } from "../../../Utils/LikeComment";

const Table = ({ className, activeTable, setActiveTable, allCustomers, loader, setLoader, setAllCustomers }) => {
  const {t}= useTranslation()
  const users = useSelector((state) => state.users);

  //const [loader, setLoader] = useState(false);
  const [chooseAll, setСhooseAll] = useState(false);
  //const [allCustomers, setAllCustomers] = useState([]);
  const [activeId, setActiveId] = useState(customers[0].id);

  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };
  

  const deleteCustomerById =  async(id) => {
    
    let res = await RequestDashboard(`gestreserv/customers/${id}/`, 'DELETE', '', users.access_token);
    if (res.status === 204) {
      getAllCustomers(setLoader, users, setAllCustomers)
    }
  };

  return (
    <div className={cn(styles.wrapper, className)}>
      {loader ? 
        <Loader/> : 
        <div className={cn(styles.table)}>
          <div className={cn(styles.row, { [styles.active]: activeTable })}>
            <div className={styles.col}>
              <Checkbox
                className={styles.checkbox}
                value={chooseAll}
                onChange={() => setСhooseAll(!chooseAll)}
              />
            </div>
            <div className={styles.col}>{t('form.name')}</div>
            <div className={styles.col}>{t('form.email')}</div>
            <div className={styles.col}>Purchase</div>
            <div className={styles.col}>Lifetime</div>
            <div className={styles.col}>{t('views.reservations.agenda.comments')}</div>
            <div className={styles.col}>Likes</div>
          </div>
          {allCustomers?.length > 0 ?
            allCustomers?.map((x, index) => (
              <Row
                item={x.user}
                allItem={x}
                key={index}
                activeTable={activeTable}
                setActiveTable={setActiveTable}
                activeId={activeId}
                setActiveId={setActiveId}
                up={allCustomers?.length - index <= 2}
                value={selectedFilters.includes(x.user.id)}
                onChange={() => handleChange(x.user.id)}
                onDeleteCust={() => deleteCustomerById(x.customer_id)}
                customersDetails={true}
              />
            ))
            : <NoContent message={''}/>
          }
        </div>
      }
      {/*<div className={styles.foot}>
        <button className={cn("button-stroke button-small", styles.button)}>
          <Loader className={styles.loader} />
          <span>Load more</span>
        </button>
      </div>*/}
    </div>
  );
};

export default Table;
