import React, { useState } from "react";
import cn from "classnames";
import styles from "./ProductFiles.module.sass"
import Card from "../../../components/Card";
import TextInput from "../../../components/TextInput";
import { useTranslation } from "react-i18next";
//import Dropdown from "../../../components/Dropdown";

//const optionsCategory = ["Select operator", "MTN", "Camtel", "Orange"];

const Contact = ({ className, onChange, form }) => {
  const {t} = useTranslation()

 // const [category, setCategory] = useState(optionsCategory[0]);

  return (
    <Card className={cn(styles.card, className)} title={t('views.customers.add.contact')} classTitle="title-green" >
      <div className={styles.description}>
        <TextInput className={styles.field} onChange={onChange} label={t("form.email")} name="email" type="email" value={form.email} placeholder="enter email" tooltip="Maximum 100 characters. No HTML or emoji allowed" required/>
        <TextInput  className={styles.field} onChange={onChange} label={t("sign.phone_number")}  name="tel"  type="tel" value={form.tel}  placeholder="237698664117" required  />
        {/*<div className={styles.group}>
          <TextInput  className={styles.field} onChange={onChange} label="Fax" name="fax" type="text"  placeholder="Value"  required/>
          <Dropdown  className={cn(styles.field, styles.dropdown)} onChange={onChange}  label={"Operators"}  tooltip="Choose operator"  value={category} setValue={setCategory} options={optionsCategory} operator={true}/>
        </div>*/}
      </div>
    </Card>
  );
};

export default Contact;
