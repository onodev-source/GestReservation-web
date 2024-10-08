import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
//import Editor from "../../../components/Editor";
import { Routes } from "../../../Constants";
import { useTranslation } from "react-i18next";

const NameAndDescription = ({ className, form, onChange }) => {
  const {t} = useTranslation()
 
  return (
    <Card className={cn(styles.card, className)} title={t('views.products.add.number')} classTitle="title-green"
      head={
        <Link className={cn("button-stroke button-small", styles.button)} to= {Routes.RESERVATION_DASH }>
          <Icon name="arrow-left" size="24" />
          <span>{t('words.back')}</span>
        </Link>
      }
    >
      <div className={styles.description}>
        <div className={styles.group}>
          <TextInput className={styles.field} onChange={onChange} label={t('form.nber_people')} name="nb_persons" type="number" value={form.nb_persons} placeholder="Value" tooltip="Enter number" required/>
          {/*<TextInput  className={styles.field} label="Number of people" name="value2" type="number" placeholder="Value" tooltip="Maximum 20"  required/>
          <TextInput  className={styles.field} label="Number of days"  name="value3" type="text"  placeholder="Value" required />
          <TextInput  className={styles.field} label="Number of days"  name="value4"  type="text"  placeholder="Value" required  />*/}
        </div>
      </div>
    </Card>
  );
};

export default NameAndDescription;
