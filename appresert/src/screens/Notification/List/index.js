import React, { useCallback, useState } from "react";
import cn from "classnames";
import styles from "./List.module.sass";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import Actions from "../../../components/Actions";
import Loader from "../../../components/Loader";
import Item from "./Item";

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import NoContent from "../../../components/NoContent";
import { getAllNotifications, markAllReadNotifications } from "../../../Utils/LikeComment";
import { Routes } from "../../../Constants";



const List = ({ className, selectedFilters, filterMapping }) => {
  const {t} = useTranslation()
  const users = useSelector((state) => state.users)

  const intervals = [t('words.filter'), t('words.read'), t('words.unread')];

  const [loader, setLoader] = useState(false);
  const [sorting, setSorting] = useState(intervals[0]);
  const [notifs, setNotifs] = useState([]);
  const [filteredNotifs, setFilteredNotifs] = useState([]);

  
  const actions = [
    {
      title: notifs[0]?.is_read ? t('words.mark_as_unread') : t('words.mark_as_read'),
      icon: "check",
      action: () => markAllReadNotifications(users, notifs, setLoader, setNotifs),
    },
    {
      title: t("words.go_setting"),
      icon: "setting",
      url: Routes.SETTINGS,
    },
  ];

  const handleChangeFilterData = useCallback((notifs) => {
    if (intervals?.indexOf(sorting) === 1) {
      // Filtrage pour inclure toutes les notifications et affiche de celle qui sont lu
      const filteredReadNotifs = notifs?.filter((notif) => notif.is_read)
      setFilteredNotifs(filteredReadNotifs);
      
    } else if (intervals?.indexOf(sorting) === 2) {
      // Filtrage pour inclure toutes les notifications et affiche de celle qui sont non lu
      const filteredUnreadNotifs = notifs?.filter((notif) => !notif.is_read)
      setFilteredNotifs(filteredUnreadNotifs);
      
    }
  }, [sorting])

  // Charger toutes les notifications au montage du composant
  React.useEffect(() => {
    getAllNotifications(setLoader, users, setNotifs);
  }, [users]);

  // Filtrer les notifications en fonction des éléments de selectedFilters
  React.useEffect(() => {
    if (selectedFilters?.length > 0 && notifs?.length > 0) {

      // Utilisation de flatMap pour collecter tous les types de notification à inclure dans le filtre
      const typesToInclude = selectedFilters.flatMap((filter) => filterMapping[filter] || []);
      
       // Filtrage pour inclure toutes les notifications qui correspondent à l'un des types dans typesToInclude
      const newFilteredNotifs = notifs.filter((notif) =>
        typesToInclude.some(type => type === notif.notifications_type)
      );
      setFilteredNotifs(newFilteredNotifs);
      handleChangeFilterData(newFilteredNotifs);

    } else if (selectedFilters?.length === 0) {  
      setFilteredNotifs(notifs);
      handleChangeFilterData(notifs);
    }
  }, [selectedFilters, filterMapping, notifs, handleChangeFilterData]);

  return (
    <Card
      className={cn(styles.card, className)}
      title="New"
      classTitle={cn("title-red", styles.title)}
      classCardHead={styles.head}
      head={
        <>
          <Dropdown
            className={styles.dropdown}
            classDropdownHead={styles.dropdownHead}
            value={sorting}
            setValue={setSorting}
            options={intervals}
            small
          />
          <Actions
            className={styles.actions}
            classActionsHead={styles.actionsHead}
            items={actions}
          />
        </>
      }
    >
      <div className={styles.notifications}>
        <div className={styles.list}>
          {loader ? <Loader/> :
            (((filteredNotifs.length >= 0 && selectedFilters?.length > 0) || (filteredNotifs.length >= 0 && intervals?.indexOf(sorting) !== 0)) ? filteredNotifs : notifs)?.length > 0 ?
              (((filteredNotifs.length >= 0 && selectedFilters?.length > 0) || (filteredNotifs.length >= 0 && intervals?.indexOf(sorting) !== 0)) ? filteredNotifs : notifs)?.map((x, index) => (
                <Item className={cn(styles.item, className)} item={x} key={index} />
              ))
              : <NoContent message={''}/>
          }
        </div>
        {/*<div className={styles.foot}>
          <button className={cn("button-stroke button-small", styles.button)}>
            <Loader className={styles.loader} />
            <span>Load more</span>
          </button>
        </div>*/}
      </div>
    </Card>
  );
};

export default List;
