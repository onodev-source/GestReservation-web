import React, { useState } from "react";
import cn from "classnames";
import styles from "./CategoryAndAttibutes.module.sass";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import Tooltip from "../../../components/Tooltip";
import Checkbox from "../../../components/Checkbox";
import { WithContext as ReactTags } from "react-tag-input";
import Schedule from "../../../components/Schedule";


const compatibility = [
  {
    id: 0,
    title: "Female",
  },
  {
    id: 1,
    title: "Male",
  },
];

const CategoryAndAttibutes = ({ className}) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  return (
    <Card className={cn(styles.card, className)}  title={"Personal information"} classTitle="title-purple" >
      <div className={styles.images}>
        <div className={styles.label}>
          {"Gender"}{" "}
          <Tooltip  className={styles.tooltip}  title="Choose one" icon="info" place="right" />
        </div>
        <div className={styles.list}>
          {compatibility.map((x, index) => (
            <Checkbox
              className={styles.checkbox}
              content={x.title}
              value={selectedFilters.includes(x.id)}
              onChange={() => handleChange(x.id)}
              key={index}
            />
          ))}
        </div>
        <div className={styles.label}>
          {"Date of birth"}{" "}
          <Tooltip  className={styles.tooltip}  title="Select date" icon="info" place="right" />
          <Schedule   startDate={startDate}  setStartDate={setStartDate} startTime={startTime} setStartTime={setStartTime} addCustomer={true}/>
        </div>
      </div>
    </Card>
  );
};

export default CategoryAndAttibutes;
