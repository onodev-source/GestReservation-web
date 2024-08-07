import React, { useState } from "react";
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

const navigation = ["Active", "New", "A-Z", "Z-A"];

const CustomerList = () => {
  //const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(navigation[0]);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = (e) => {
    alert();
  };

  return (
    <>
      <div className={styles.section}>
        <Overview className={styles.card}/>
        <Card className={styles.card} title="Customers List"  classTitle={cn("title-purple", styles.title)} classCardHead={cn(styles.head, { [styles.hidden]: visible })}
          head={
            <>
              <Form className={styles.form} value={search}
                setValue={setSearch} onSubmit={() => handleSubmit()} placeholder="Search by name or email" type="text"
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
                  Add Customer
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
              setActiveTable={setVisible}
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
