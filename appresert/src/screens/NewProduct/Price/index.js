import React, { useState } from "react";
import cn from "classnames";
import styles from "./Price.module.sass";
import Card from "../../../components/Card";
import Tooltip from "../../../components/Tooltip";
import TextInput from "../../../components/TextInput";
import Switch from "../../../components/Switch";
import { useTranslation } from "react-i18next";

const Price = ({ className, product, onChange, formAdd }) => {
  const {t} = useTranslation()
  const [resolution, setResolution] = useState(true);

  return (
    <Card className={cn(styles.card, className)}  title={product ? t('views.products.add.quantity') : "Price" } classTitle="title-green">
      <div className={styles.price}>
        <TextInput onChange={onChange}  value={product ? formAdd.product_quantity : ''} className={styles.field}  label={product ? t('views.products.add.number') : "Monthly subscription" } name={product ? "quantity" : "amount" } type={product ? "number" : "text" }  tooltip="Small description" required currency={product ? "+" : "$" } />
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
              <TextInput onChange={onChange} className={styles.field}  classLabel={styles.label} label="Weekly subscription" name="minimum-amount" type="text" required currency="$"/>
              <TextInput onChange={onChange} value={formAdd.package_price} className={styles.field}  classLabel={styles.label} label="Dayly subscription" name="dayly-amount" type="text" required currency="$"/>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default Price;
