import React, { useState } from "react";
import cn from "classnames";
import styles from "./Price.module.sass";
import Card from "../../../components/Card";
//import Tooltip from "../../../components/Tooltip";
import TextInput from "../../../components/TextInput";
//import Switch from "../../../components/Switch";
//import Dropdown from "../../../components/Dropdown";

/*-const optionsCategoryCity = ["Select city", "Category 1", "Category 2"];
const optionsCategoryCountry = ["Select country", "Category 1", "Category 2"];*/

const Location = ({ className, onChange, form }) => {
  //const [resolution, setResolution] = useState(true);
  /*const [categoryCity, setCategoryCity] = useState(optionsCategoryCity[0]);
  const [categoryCountry, setCategoryCountry] = useState(optionsCategoryCountry[0]);*/

  return (
    <Card className={cn(styles.card, className)}  title={"Location" } classTitle="title-green">
      <div className={styles.price}>
        <TextInput className={styles.field} onChange={onChange} value={form.city} label="Customer city" name="city" type="text" tooltip="Maximum 100 characters. No HTML or emoji allowed" required/>
        <TextInput className={styles.field} onChange={onChange} value={form.country} label="Customer country"  name="country" type="text" tooltip="Maximum 100 characters. No HTML or emoji allowed" required/>
        {/*<Dropdown  className={cn(styles.field, styles.dropdown)}  label={ "Customer city"}  tooltip="Maximum 100 characters. No HTML or emoji allowed"  value={categoryCity} setValue={setCategoryCity} options={optionsCategoryCity}/>
        <Dropdown  className={cn(styles.field)} label={ "Customer country"}  tooltip="Maximum 100 characters. No HTML or emoji allowed"  value={categoryCountry} setValue={setCategoryCountry} options={optionsCategoryCountry}/>
        {!product && (
          <>
            <div className={styles.line}>
              <div className={styles.info}>
                Allow customers to pay they want{" "}
                <Tooltip  className={styles.tooltip}  title="Maximum 100 characters. No HTML or emoji allowed" icon="info"  place="top"/>
              </div>
              <Switch className={styles.switch} value={resolution} onChange={() => setResolution(!resolution)}/>
            </div>
            <div className={styles.fieldset}>
              <TextInput className={styles.field}  classLabel={styles.label} label="Weekly subscription" name="minimum-amount" type="text" required currency="$"/>
              <TextInput className={styles.field}  classLabel={styles.label} label="Hourly subscription" name="suggested-amount" type="text" required currency="$"/>
            </div>
          </>
        )}*/}
      </div>
    </Card>
  );
};

export default Location;
