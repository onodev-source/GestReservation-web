import React from "react";
import cn from "classnames";
import styles from "./PayoutHistory.module.sass";
import Card from "../../../components/Card/index.js";
import { numberWithCommas } from "../../../utils.js";
import Actions from "../../../components/Actions/index.js";
import RequestDashboard from "../../../Services/Api/ApiServices.js";
import { useSelector } from "react-redux";

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
  const [userActivity, setUserActivity] = React.useState()
  
  React.useEffect(() => {
    const getUserActivityById =  async(id) => {
        
      let res = await RequestDashboard(profileId ? `gestreserv/activity/${id}/` : 'gestreserv/activity/', 'GET', '', users.access_token);
      if (res.status === 200) {
        setUserActivity(res.reponse);
      }
    };
    getUserActivityById(userId)
  },[userId, users.access_token, profileId])

  return (
    <Card className={cn(styles.card, className)} >
      <div className={styles.wrapper}>
        <div className={styles.table}>
          <div className={styles.row}>
            <div className={styles.col}>Month</div>
            <div className={styles.col}>Status</div>
            <div className={styles.col}>Method</div>
            <div className={styles.col}>Earnings</div>
            <div className={styles.col}>Amount withdrawn</div>
            <div className={styles.col}>Actions</div>
          </div>
          {items.map((x, index) => (
            <div className={styles.row} key={index}>
              <div className={styles.col}>{x.date}</div>
              <div className={styles.col}>
                {x.status ? (
                  <div
                    className={cn(
                      { "status-green-dark": x.status === true },
                      styles.status
                    )}
                  >
                    Paid
                  </div>
                ) : (
                  <div
                    className={cn(
                      { "status-yellow": x.status === false },
                      styles.status
                    )}
                  >
                    Pending
                  </div>
                )}
              </div>
              <div className={styles.col}>
                <div
                  className={cn(
                    { "status-blue": x.method === "Paypal" },
                    { "status-purple": x.method === "SWIFT" },
                    styles.status
                  )}
                >
                  {x.method}
                </div>
              </div>
              <div className={styles.col}>
                ${numberWithCommas(x.earnings.toFixed(2))}
              </div>
              <div className={styles.col}>
                ${numberWithCommas(x.amount.toFixed(2))}
              </div>
              <div className={styles.col}>
                <Actions className={styles.actions} classActionsHead={styles.actionsHead} classActionsBody={styles.actionsBody}classActionsOption={styles.actionsOption} items={actions}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default HistoryUser;
