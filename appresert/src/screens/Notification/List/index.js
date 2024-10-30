import React, { useCallback, useState } from "react";
import cn from "classnames";
import styles from "./List.module.sass";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import Actions from "../../../components/Actions";
import Loader from "../../../components/Loader";
import Item from "./Item";

// data
import { notifications } from "../../../mocks/notifications";
import RequestDashboard from "../../../Services/Api/ApiServices";
import { useSelector } from "react-redux";

const intervals = ["Recent", "New", "This year"];

const actions = [
  {
    title: "Mark as read",
    icon: "check",
    action: () => console.log("Mark as read"),
  },
  {
    title: "Go setting",
    icon: "setting",
    action: () => console.log("Go setting"),
  },
];

const List = ({ className }) => {
  const users = useSelector((state) => state.users)

  const [loader, setLoader] = useState(false);
  const [sorting, setSorting] = useState(intervals[0]);
  const [notifs, setNotifs] = useState([]);

  const getAllNotifications = useCallback(async() => {
    setLoader(true)
    let res = await RequestDashboard('gestreserv/notifications/', 'GET', '', users.access_token);
    if (res.status === 200) {
      setNotifs(res.response?.results);
      setLoader(false)
    }
  }, [users.access_token]);
    
  React.useEffect(() => {
    getAllNotifications()
  }, [getAllNotifications])

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
          {notifications.map((x, index) => (
            <Item className={cn(styles.item, className)} item={x} key={index} />
          ))}
        </div>
        <div className={styles.foot}>
          <button className={cn("button-stroke button-small", styles.button)}>
            <Loader className={styles.loader} />
            <span>Load more</span>
          </button>
        </div>
      </div>
    </Card>
  );
};

export default List;
