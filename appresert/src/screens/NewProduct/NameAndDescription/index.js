import React, { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";
import { Routes } from "../../../Constants";
import { useTranslation } from "react-i18next";

const NameAndDescription = ({ className, product }) => {
  const {t} = useTranslation()
  const [content, setContent] = useState();

  return (
    <Card className={cn(styles.card, className)} title={t('views.products.add.name_and_description')} classTitle="title-green"
      head={
        <Link className={cn("button-stroke button-small", styles.button)} to= {product ? Routes.PRODUITS_DASH : Routes.PACKAGES}>
          <Icon name="arrow-left" size="24" />
          <span>{t('words.back')}</span>
        </Link>
      }
    >
      <div className={styles.description}>
        <TextInput className={styles.field} label={t('views.products.add.product_title')}  name="title" type="text" tooltip="Maximum 100 characters. No HTML or emoji allowed" required/>
        <Editor state={content}onChange={setContent} classEditor={styles.editor} label={t('views.products.add.description')}  tooltip="Description"/>
        <div className={styles.group}>
          <TextInput className={styles.field}  label={t('views.products.add.key_features')} name="value1"type="text" placeholder="Value" tooltip="Maximum 100 characters. No HTML or emoji allowed" required/>
          <TextInput  className={styles.field} name="value2" type="text" placeholder={t('views.products.add.value')}  required/>
          <TextInput  className={styles.field}  name="value3" type="text"  placeholder={t('views.products.add.value')} required />
          <TextInput  className={styles.field}  name="value4"  type="text"  placeholder={t('views.products.add.value')} required  />
        </div>
      </div>
    </Card>
  );
};

export default NameAndDescription;
