import React, { useState } from "react";
import cn from "classnames";
import styles from "./ProductFiles.module.sass"
import Card from "../../../components/Card";
import TextInput from "../../../components/TextInput";
import Dropdown from "../../../components/Dropdown";

const optionsCategory = ["Select operator", "MTN", "Camtel", "Orange"];

const Contact = ({ className, onChange, form }) => {
  const [category, setCategory] = useState(optionsCategory[0]);

  return (
    <Card className={cn(styles.card, className)} title="Contact" classTitle="title-green" >
      <div className={styles.description}>
        <div className={styles.group}>
          <TextInput className={styles.field} onChange={onChange} label="Email" name="email" type="email" value={form.email} placeholder="enter email" tooltip="Maximum 100 characters. No HTML or emoji allowed" required/>
          <TextInput  className={styles.field} onChange={onChange} label="Fax" name="fax" type="text"  placeholder="Value"  required/>
          <Dropdown  className={cn(styles.field, styles.dropdown)} onChange={onChange}  label={"Operators"}  tooltip="Choose operator"  value={category} setValue={setCategory} options={optionsCategory} operator={true}/>
          <TextInput  className={styles.field} onChange={onChange} label="Phone number"  name="tel"  type="tel" value={form.tel}  placeholder="phone" required  />
        </div>
      </div>
    </Card>
  );
};

export default Contact;
