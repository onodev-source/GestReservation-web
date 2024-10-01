import React, { useState } from "react";
import cn from "classnames";
import styles from "./ProfileUser.module.sass";
import Profile from "./Profile";
import Settings from "./Settings";
import Card from "../../components/Card";
import Dropdown from "../../components/Dropdown";
import Filters from "../../components/Filters";
import Product from "../../components/Product";
import Follower from "./Follower";

// data
import { products } from "../../mocks/products";
import { followers } from "../../mocks/followers";
import HistoryUser from "./HistoryUser";
import Table from "../Earning/Table";
import Comments from "../Comments";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import RequestDashboard from "../../Services/Api/ApiServices";

const navigation = ["Activity", "Reservations", "Comments"];
const intervals = ["Most recent", "Most new", "Most popular"];

const ProfileUser = (profileId) => {
  const { userId } = useParams()
  const users = useSelector((state) => state.users)

  const [activeIndex, setActiveIndex] = useState(0);
  const [sorting, setSorting] = useState(intervals[0]);
  const [userData, setUserData] = useState();


  React.useEffect(() => {
    if (profileId && userId) {
      const getUserById =  async(id) => {
      
        let res = await RequestDashboard(`accounts/auth/users/${id}/`, 'DELETE', '', users.access_token);
        if (res.status === 200) {
          setUserData(res.reponse);
        }
      };
      getUserById(userId)
    }
  }, [users.access_token, profileId , userId])

  return (
    <>
      <div className={styles.shop}>
        <div className={styles.background}>
          <img src="/images/content/bg-shop.jpg" alt="Background" />
        </div>
        <Card className={styles.card}>
          <Profile />
          <div className={cn({[styles.control] : navigation[0]})}>
            <div className={styles.nav}>
              {navigation.map((x, index) => (
                <button  className={cn(styles.link, { [styles.active]: index === activeIndex,})} onClick={() => setActiveIndex(index)} key={index} >
                  {x}
                </button>
              ))}
            </div>
            <div className={styles.dropdownBox}>
              <Dropdown className={styles.dropdown}  classDropdownHead={styles.dropdownHead} value={sorting}  setValue={setSorting} options={intervals} small />
            </div>
            {/*<Filters className={styles.filters}  title="Showing 9 of 32 products">
              <Settings />
            </Filters>*/}
          </div>
          <div className={styles.wrap}>
            {activeIndex === 0 && (
              <>
                <div className={styles.products}>
                  <HistoryUser className={styles.product}/>
                </div>
                <div className={styles.foot}>
                  <button  className={cn("button-stroke button-small", styles.button)} >
                    Load more
                  </button>
                </div>
              </>
            )}
            {activeIndex === 1 && (
              <>
                <div className={styles.followers}>
                  <Table activityUser={true}/>
                </div>
                <div className={styles.foot}>
                  <button className={cn("button-stroke button-small", styles.button)} >
                    Load more
                  </button>
                </div>
              </>
            )}
            {activeIndex === 2 && (
              <>
                <div className={styles.followers}>
                  <Comments activityUser={true}/>
                </div>
                {/*<div className={styles.foot}>
                  <button  className={cn("button-stroke button-small", styles.button)} >
                    Load more
                  </button>
                </div>*/}
              </>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default ProfileUser;
