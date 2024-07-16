import React, { useState } from "react";
import cn from "classnames";
import styles from "./Help.module.sass";
import Item from "./Item";
import Dropdown from "../../../components/Dropdown";

// data
import { items } from "../../../mocks/faq";

const Help = () => {
  const options = [];
  items.map((x) => options.push(x.title));

  const [category, setCategory] = useState(options[0]);

  return (
    <div className={styles.faq}>
      <div className={styles.list}>
        {items.find((x) => x.title === category).items.map((x, index) => (
            <Item className={styles.item} item={x} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Help;
