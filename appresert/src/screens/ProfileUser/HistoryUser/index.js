import React from "react";
import cn from "classnames";
import styles from "./PayoutHistory.module.sass";
import Card from "../../../components/Card/index.js";
import { numberWithCommas } from "../../../utils.js";
import Actions from "../../../components/Actions/index.js";
import RequestDashboard from "../../../Services/Api/ApiServices.js";
import { useSelector } from "react-redux";
import Icon from "../../../components/Icon.js";
import Loader from "../../../components/Loader/index.js";
import { formatTime } from "../../../Utils/formatTime.js";

const items = [
  {
    date: "Oct 2021",
    status: true,
    method: "Paypal",
    earnings: 128899,
    amount: 128899,
  },
  {
    date: "Sep 2021",
    status: false,
    method: "SWIFT",
    earnings: 85123,
    amount: 85123,
  },
  {
    date: "Aug 2021",
    status: true,
    method: "Paypal",
    earnings: 128899,
    amount: 128899,
  },
  {
    date: "Jul 2021",
    status: false,
    method: "SWIFT",
    earnings: 85123,
    amount: 85123,
  },
  {
    date: "Jun 2021",
    status: true,
    method: "Paypal",
    earnings: 128899,
    amount: 128899,
  },
  {
    date: "May 2021",
    status: false,
    method: "SWIFT",
    earnings: 85123,
    amount: 85123,
  },
  {
    date: "Oct 2022",
    status: true,
    method: "Paypal",
    earnings: 128899,
    amount: 128899,
  },
  {
    date: "Jun 2022",
    status: false,
    method: "SWIFT",
    earnings: 85123,
    amount: 85123,
  },
  {
    date: "May 2022",
    status: true,
    method: "Paypal",
    earnings: 128899,
    amount: 128899,
  },
  {
    date: "Sep 2022",
    status: false,
    method: "SWIFT",
    earnings: 85123,
    amount: 85123,
  },
  {
    date: "Oct 2022",
    status: true,
    method: "Paypal",
    earnings: 128899,
    amount: 128899,
  },
  {
    date: "Sep 2022",
    status: false,
    method: "SWIFT",
    earnings: 85123,
    amount: 85123,
  },
];

const actions = [
  {
    title: "Delete",
    icon: "trash",
    action: () => console.log("Delete"),
  },
  {
    title: "Details",
    icon: "arrow-right",
    action: () => console.log("Delete"),
  }
];

const HistoryUser = ({ className, userId, profileId }) => {
  const users = useSelector((state) => state.users)
  const [userActivity, setUserActivity] = React.useState([])
  const [loader, setLoader] = React.useState(false)
  
  React.useEffect(() => {
    const getUserActivityById =  async(id) => {
      setLoader(true)
      let res = await RequestDashboard(`gestreserv/activities/by-user/${id}/`, 'GET', '', users.access_token);
      
      if (res.status === 200) {
        setUserActivity(res.response);
        setLoader(false)
      }
    };
    getUserActivityById(userId)
  },[userId, users.access_token, profileId])

  return (
    <Card className={cn(styles.card, className)} >
      {loader ? <Loader/> : (
        <div className={cn(styles.wrapper)}>
          {userActivity?.length > 0 ? (
            userActivity.map((activity) => (
              <div className={cn(styles.message)}>
                <div className={styles.details}>
                  <div className={styles}>
                    <Icon name={activity.activity_type === 'RESERVATION' ? "reservation" : 'activity'} size="24" />
                  </div>
                  <div className={styles.head}>
                    <div className={styles.man}>{activity.activity_type}</div>
                    <div className={styles.content} dangerouslySetInnerHTML={{ __html: activity.activity_type === 'RESERVATION' ? `${activity.activity_type_display} of package with id ${activity.package}` : activity.activity_type_display }}></div>
                  </div>
                </div>
                <div className={styles.time}>{formatTime(activity.timestamp, 'GET')}</div>
              </div>
            ))
          ) : (
            <h3>No content</h3>
          )}
        </div>
      )}
    </Card>
  );
};

export default HistoryUser;
