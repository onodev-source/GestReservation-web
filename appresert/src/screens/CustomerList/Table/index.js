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

const Table = ({ className, activeTable, setActiveTable }) => {
  const users = useSelector((state) => state.users);

  const [loader, setLoader] = useState(false);
  const [chooseAll, setСhooseAll] = useState(false);
  const [allCustomers, setAllCustomers] = useState([]);
  const [activeId, setActiveId] = useState(customers[0].id);

  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  const getAllCustomers = useCallback(async() => {
    setLoader(true)
    let res = await RequestDashboard('gestreserv/customers/', 'GET', '', users.access_token);
    if (res.status === 200) {
      setAllCustomers(res.response?.results);
      setLoader(false)
    }
  }, [users.access_token]);
  
  React.useEffect(() => {
    getAllCustomers()
  }, [getAllCustomers])

  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={cn(styles.table)}>
        <div className={cn(styles.row, { [styles.active]: activeTable })}>
          <div className={styles.col}>
            <Checkbox
              className={styles.checkbox}
              value={chooseAll}
              onChange={() => setСhooseAll(!chooseAll)}
            />
          </div>
          <div className={styles.col}>Name</div>
          <div className={styles.col}>Email</div>
          <div className={styles.col}>Purchase</div>
          <div className={styles.col}>Lifetime</div>
          <div className={styles.col}>Comments</div>
          <div className={styles.col}>Likes</div>
        </div>
        {customers.map((x, index) => (
          <Row
            item={x}
            key={index}
            activeTable={activeTable}
            setActiveTable={setActiveTable}
            activeId={activeId}
            setActiveId={setActiveId}
            up={customers.length - index <= 2}
            value={selectedFilters.includes(x.id)}
            onChange={() => handleChange(x.id)}
            customersDetails={true}
          />
        ))}
      </div>
      <div className={styles.foot}>
        <button className={cn("button-stroke button-small", styles.button)}>
          <Loader className={styles.loader} />
          <span>Load more</span>
        </button>
      </div>
    </div>
  );
};

export default Table;
