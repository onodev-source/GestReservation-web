import React, { useState } from "react";
//import cn from "classnames";
import styles from "./Notification.module.sass";
import List from "./List";
import Filters from "./Filters";
import { useTranslation } from "react-i18next";


const Notification = () => {
  const {t} = useTranslation()
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Mappage entre `selectedFilters` et les types de notification `notif.type`
  const filterMapping = {
    [t("views.home.comments")]: ["MAKE_COMMENT", "LIKE_COMMENT", "REPLY_COMMENT"],
    "Likes": ["LIKE_PACKAGE", "LIKE_PRODUCT", "LIKE_COMMENT"],
    [t("views.packages.packages")]: ["CREATE_PACKAGE", "UPDATE_PACKAGE", "DELETE_PACKAGE", "LIKE_PACKAGE", "POPULAR_PACKAGE"],
    [`${t("navigation.title.income_earning")} & ${t('views.reservations.reservations')}`]: ["PAYMENT", "WATCH_AD", "RESERVATION"],
  };

  const filters = Object.keys(filterMapping); // Liste des filtres affichés pour l'utilisateur


  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <List className={styles.card} selectedFilters={selectedFilters} filterMapping={filterMapping}/>
      </div>
      <div className={styles.col}>
        <Filters
          className={styles.filters}
          filters={filters}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </div>
    </div>
  );
};

export default Notification;
