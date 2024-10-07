import React from "react";
import cn from "classnames";
import styles from "./Panel.module.sass";
import Icon from "../../../components/Icon";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Panel = () => {
  const {t} = useTranslation()
  const users = useSelector((state) => state.users);

  return (
    <div className={cn("panel", styles.panel)}>
      <div className={styles.info}>
        <Icon name="check-all" size="24" />2 products selected
      </div>
      {/* <div className={styles.note}>
        <Icon name="check-circle" size="24" />
        Products deleted
        <span role="img" aria-label="hands">
          🙌
        </span>
        <button className={styles.close}>
          <Icon name="close" size="24" />
        </button>
      </div> */}
      <div className={styles.btns}>
        <button className={cn("button-stroke-red", styles.button)}>
          <span>{t('words.cancel')}</span>
        </button>
        {!users.users.is_customer &&
          <button className={cn("button", styles.button)}>{t('words.deleted')}
            <Icon name="trash" size="24" />
          </button>
        }
      </div>
    </div>
  );
};

export default Panel;
