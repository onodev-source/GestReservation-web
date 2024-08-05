import React, { useState } from "react";
import cn from "classnames";
import styles from "./ProductFiles.module.sass";
import Card from "../../../components/Card";
import File from "../../../components/File";
import { useTranslation } from "react-i18next";

const ProductFiles = ({ className, product }) => {
  const {t} = useTranslation()
  
  return (
    <Card className={cn(styles.card, className)} title={product ? t('views.products.add.upload_image') : "Upload image package"} classTitle="title-blue">
      <div className={styles.files}>
        <File  className={styles.field} title={t('views.products.add.click_or_drop_image')}  label={t('views.products.add.preload')} tooltip="Maximum 100 characters. No HTML or emoji allowed"/>
        {/*<File
          className={styles.field}
          title="Click or drop image"
          label="Fonts"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
        />*/}
      </div>
    </Card>
  );
};

export default ProductFiles;
