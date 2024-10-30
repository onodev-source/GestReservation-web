import React from "react";
import cn from "classnames";
import styles from "./PayoutHistory.module.sass";
import Card from "../../../components/Card/index.js";
/*import { numberWithCommas } from "../../../utils.js";
import Actions from "../../../components/Actions/index.js";*/
import RequestDashboard from "../../../Services/Api/ApiServices.js";
import { useSelector } from "react-redux";
import Icon from "../../../components/Icon.js";
import Loader from "../../../components/Loader/index.js";
import { formatTime } from "../../../Utils/formatTime.js";
import NoContent from "../../../components/NoContent/index.js";


/*const actions = [
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
];*/

const HistoryUser = ({ className, userId, profileId }) => {
  const users = useSelector((state) => state.users)
  const [userActivity, setUserActivity] = React.useState([])
  const [loader, setLoader] = React.useState(false)
  const [message, setMessage] = React.useState('')
  
  React.useEffect(() => {
    const getUserActivityById =  async(id) => {
      setLoader(true)
      let res = await RequestDashboard(`gestreserv/activities/by-user/${id}/`, 'GET', '', users.access_token);
      
      if (res.status === 200) {
        setUserActivity(res.response);
        setLoader(false)
      } else if (res.status === 404){
        setUserActivity([]);
        setMessage(res.response?.message)
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
                  <div className={cn(styles.rounded, {[styles.reservedSpace]: activity.activity_type === 'RESERVATION' })}>
                    <Icon name={activity.activity_type === 'RESERVATION' ? "reservation" : (activity.activity_type === 'MAKE_COMMENT' ? 'message' : 'activity')} size={activity.activity_type === 'RESERVATION' ? "20" : "24"} />
                  </div>
                  <div className={styles.head}>
                    <div className={styles.man}>{activity.activity_type}</div>
                    <div className={styles.content} dangerouslySetInnerHTML={{ __html: activity.activity_type === 'RESERVATION' ? `${activity.activity_type_display} of package with id ${activity.package}` : activity.activity_type_display }}></div>
                  </div>
                </div>
                <div className={styles.time}>{formatTime(activity.timestamp, 'GETDATEHOUR')}</div>
              </div>
            ))
          ) : (
            <NoContent message={message}/>
          )}
        </div>
      )}
    </Card>
  );
};

export default HistoryUser;
