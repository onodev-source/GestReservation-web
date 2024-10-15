import React from "react";
import cn from "classnames";
import styles from "./Price.module.sass";
import Card from "../../../components/Card";
//import Tooltip from "../../../components/Tooltip";
import TextInput from "../../../components/TextInput";
//import Switch from "../../../components/Switch";
import { useTranslation } from "react-i18next";

const Price = ({ className, product, onChange, formAdd }) => {
  const {t} = useTranslation()
  //const [resolution, setResolution] = useState(true);

  return (
    <Card className={cn(styles.card, className)}  title={product ? t('views.products.add.quantity') : t('views.packages.add.price') } classTitle="title-green">
      <div className={styles.price}>
        {product ? 
          <TextInput onChange={onChange}  value={formAdd.product_quantity} className={styles.field}  label={t('views.products.add.number')} name={ "quantity"} type={ "number"  }  tooltip="Small description" required currency={"+"  } />
          :
          <TextInput onChange={onChange} value={formAdd.package_price} className={styles.field}  classLabel={styles.label} label={t('views.packages.add.price_subscription')} name="dayly-amount" type="text" required currency="CFA"/>
        }
        {/*!product && (
          <>
            <div className={styles.line}>
              <div className={styles.info}>
                {t('views.packages.add.allow_customers_to_pay')}{" "}
                <Tooltip  className={styles.tooltip}  title="Maximum 100 characters. No HTML or emoji allowed" icon="info"  place="top"/>
              </div>
              <Switch className={styles.switch} value={resolution} onChange={() => setResolution(!resolution)}/>
            </div>
            <div className={styles.fieldset}>
              <TextInput onChange={onChange} className={styles.field}  classLabel={styles.label} label={t('views.packages.add.weekly_subscription')} name="minimum-amount" type="text" required currency="$"/>
              <TextInput onChange={onChange} value={formAdd.package_price} className={styles.field}  classLabel={styles.label} label="Dayly subscription" name="dayly-amount" type="text" required currency="$"/>
            </div>
          </>
        )*/}
      </div>
    </Card>
  );
};

export default Price;
