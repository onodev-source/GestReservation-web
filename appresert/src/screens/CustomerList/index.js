import React, { useEffect, useState } from "react";
import styles from "./CustomerList.module.sass";
import cn from "classnames";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Table from "./Table";
import Details from "./Details";
import Overview from "../Customers/Overview";
import Dropdown from "../../components/Dropdown";
import { Link } from "react-router-dom";
import { Routes } from "../../Constants";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getAllCustomers } from "../../Utils/LikeComment";


const CustomerList = () => {
  const {t} = useTranslation()
  const users = useSelector((state) => state.users);

  const navigation = [t('words.filter'), t("words.active"), t("words.not_active")];

  const [loader, setLoader] = useState(false);
  const [allCustomers, setAllCustomers] = useState([]);
  const [filterCustomers, setFilterCustomers] = useState([]);
  //const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(navigation[0]);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = (e) => {
    alert();
  };

  // Charger toutes les customers au montage du composant
  useEffect(() => {
    getAllCustomers(setLoader, users, setAllCustomers)
  }, [users])


  // Filtrer les customers en fonction des éléments de navigation
  React.useEffect(() => {
    if (navigation?.indexOf(activeTab) === 1) {
      // Filtrage pour inclure tous les customers et affiche de ceux qui sont actif
      const filtered = allCustomers?.filter((cust) => cust.user.is_active)
      setFilterCustomers(filtered);
      
    } else if (navigation?.indexOf(activeTab) === 2) {
      // Filtrage pour inclure tous les customers et affiche de ceux qui sont pas actif
      const filtered = allCustomers?.filter((cust) => !cust.user.is_active)
      setFilterCustomers(filtered);
    }
     else {  
      setFilterCustomers(allCustomers);
    }
  }, [allCustomers, activeTab]);

  
  return (
    <>
      <div className={styles.section}>
        <Overview className={styles.card} allCustomers={allCustomers} loader={loader}/>
        <Card className={styles.card} title={t('views.customers.list_customers')}  classTitle={cn("title-purple", styles.title)} classCardHead={cn(styles.head, { [styles.hidden]: visible })}
          head={
            <>
              <Form className={styles.form} value={search}
                setValue={setSearch} onSubmit={() => handleSubmit()} placeholder={t('views.customers.search_by_name')} type="text"
                name="search" icon="search"
              />
              <div className={styles.sorting}>
                {/*{navigation.map((x, index) => (
                  <button className={cn(styles.link, { [styles.active]: index === activeIndex, })}
                    onClick={() => setActiveIndex(index)} key={index}
                  >
                    {x}
                  </button>
                ))}*/}
                
                <Dropdown classDropdownHead={styles.dropdownHead} value={activeTab} setValue={setActiveTab} options={navigation} small />
                
                <Link className={cn("button button-small", styles.button)} to={Routes.CUSTOMERS_ADD} >
                  {t('views.customers.add_customer')}
                </Link>
              </div>
              {/*<Filters className={styles.filters} title="Showing 10 of 24 customer">
                <Settings />
              </Filters>*/}
            </>
          }
        >
          <div className={cn(styles.row, { [styles.flex]: visible })}>
            <Table
              className={styles.table}
              activeTable={visible}
              setActiveTable={setVisible} allCustomers={(filterCustomers?.length >= 0 && navigation?.indexOf(activeTab) !== 0) ? filterCustomers : allCustomers} loader={loader} setLoader={setLoader} setAllCustomers= {setAllCustomers}
            />
            <Details
              className={styles.details}
              onClose={() => setVisible(false)}
            />
          </div>
        </Card>
        {/*<Panel />*/}
      </div>
    </>
  );
};

export default CustomerList;
