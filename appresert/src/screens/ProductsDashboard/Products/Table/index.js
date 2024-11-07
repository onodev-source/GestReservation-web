import React, { useState } from "react";
import styles from "./Table.module.sass";
//import cn from "classnames";
import Checkbox from "../../../../components/Checkbox";
import Row from "./Row";
import { useTranslation } from "react-i18next";
import RequestDashboard from "../../../../Services/Api/ApiServices";
import { useSelector } from "react-redux";
import { getAllProduct } from "../../../../Utils/LikeComment";

const Table = ({ items, title, setLoader, setFilterProducts, itemsProducts }) => {
  const {t} = useTranslation()
  const users = useSelector((state) => state.users)

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
    
    let res = await RequestDashboard(`gestreserv/products/${id}/`, 'DELETE', '', users.access_token);
    if (res.status === 204) {
      //getAllProduct();
      getAllProduct(setLoader, users, setFilterProducts)
    }
  };

  return (
    <div className={styles.market}>
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.col}>
            <Checkbox
              className={styles.checkbox}
              value={chooseAll}
              onChange={() => setСhooseAll(!chooseAll)}
            />
          </div>
          <div className={styles.col}>{t('views.products.products')}</div>
          <div className={styles.col}>
            <div className={styles.line}>
              <div className={styles.info}>{title}</div>
              <div className={styles.indicators}>
                {Object.keys(items).map((x, index) => (
                  <div className={styles.legend} key={index}>
                    <div
                      className={styles.color}
                      style={{ backgroundColor: x.color || "#B1E5FC"}}
                    ></div>
                    {x}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/*items !== null &&
        items.map((x, index) => (
          <Row
            item={x}
            key={index}
            up={items?.length - index <= 2}
            value={selectedFilters.includes(x.id)}
            onChange={() => handleChange(x.id)}
          />
        ))*/}

        {items !== null &&
          Object.keys(items).map((category) => (
            <div key={category} className={styles.rowCategory}>
              <h2>{category}</h2>
              {(Array.isArray(items[category]) ? items[category] : []).map((product, index) => (
                <Row item={product} items={itemsProducts}
                  key={product.id} up={items?.length - index <= 2}
                  value={selectedFilters.includes(product.id)}
                  onChange={() => handleChange(product.id)} onClick={() => deleteProductById(product.id)}
                />
              ))}
            </div>
        ))}
      </div>
      {/*<div className={styles.foot}>
        <button className={cn("button-stroke", styles.button)}>
          Load more
        </button>
      </div>*/}
    </div>
  );
};

export default Table;
