import React, { useState } from "react";
import styles from "./Market.module.sass";
// import cn from "classnames";
import Checkbox from "../../../../components/Checkbox";
import Icon from "../../../../components/Icon";
import Row from "./Row";
import Loader from "../../../../components/Loader";
import { useSelector } from "react-redux";
import RequestDashboard from "../../../../Services/Api/ApiServices";

const Market = ({ items, loader, getAllProduct }) => {
  const users = useSelector((state) => state.users);
  const [chooseAll, setСhooseAll] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  
  const deleteProductById =  async(id) => {
    
    let res = await RequestDashboard(`gestreserv/products/${id}`, 'DELETE', '', users.access_token);
    if (res.status === 204) {
      getAllProduct();
    }
  };

  return (
    <div className={styles.market}>
      {loader ? (
        <Loader className={styles.loader} />
      ) : (
        <div className={styles.table}>
          <div className={styles.row}>
            <div className={styles.col}>
              <Checkbox
                className={styles.checkbox}
                value={chooseAll}
                onChange={() => setСhooseAll(!chooseAll)}
              />
            </div>
            <div className={styles.col}>Product</div>
            <div className={styles.col}>Status</div>
            <div className={styles.col}>Quantity</div>
            <div className={styles.col}>Sales</div>
            <div className={styles.col}>Views</div>
            <div className={styles.col}>Likes</div>
            <div className={styles.col}>Create at</div>
          </div>
          {items?.map((x, index) => (
              <Row
                item={x}
                key={index}
                up={items?.length - index <= 2}
                value={selectedFilters.includes(x.id)}
                onChange={() => handleChange(x.id)}
                onClick={() => deleteProductById(x.id)}
              />
            ))}
        </div>
      )}
      <div className={styles.foot}>
        <button className={styles.arrow}>
          <Icon name="arrow-left" size="20" />
        </button>
        <button className={styles.arrow}>
          <Icon name="arrow-right" size="20" />
        </button>
      </div>
    </div>
  );
};

export default Market;
