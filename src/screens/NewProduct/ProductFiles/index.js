import React, { useState } from "react";
import cn from "classnames";
import styles from "./ProductFiles.module.sass";
import Card from "../../../components/Card";
import File from "../../../components/File";

const ProductFiles = ({ className, product }) => {
  return (
    <Card className={cn(styles.card, className)} title={product ? "Upload image product" : "Upload image package"} classTitle="title-blue">
      <div className={styles.files}>
        <File  className={styles.field} title="Click or drop image"  label="Preload" tooltip="Maximum 100 characters. No HTML or emoji allowed"/>
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
