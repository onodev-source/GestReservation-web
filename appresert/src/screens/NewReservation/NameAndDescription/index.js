import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
//import Editor from "../../../components/Editor";
import { Routes } from "../../../Constants";

const NameAndDescription = ({ className, product, form, onChange }) => {
 
  return (
    <Card className={cn(styles.card, className)} title="Number" classTitle="title-green"
      head={
        <Link className={cn("button-stroke button-small", styles.button)} to= {Routes.RESERVATION_DASH }>
          <Icon name="arrow-left" size="24" />
          <span>Back</span>
        </Link>
      }
    >
      <div className={styles.description}>
        <div className={styles.group}>
          <TextInput className={styles.field} onChange={onChange} label="Number of Persons" name="nb_persons" type="number" value={form.nb_persons} placeholder="Value" tooltip="Enter number" required/>
          {/*<TextInput  className={styles.field} label="Number of people" name="value2" type="number" placeholder="Value" tooltip="Maximum 20"  required/>
          <TextInput  className={styles.field} label="Number of days"  name="value3" type="text"  placeholder="Value" required />
          <TextInput  className={styles.field} label="Number of days"  name="value4"  type="text"  placeholder="Value" required  />*/}
        </div>
      </div>
    </Card>
  );
};

export default NameAndDescription;
