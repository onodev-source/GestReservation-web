import React, { useCallback, useState } from "react";
import styles from "./Home.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Overview from "./Overview";
import PopularProducts from "../../components/PopularProducts";
import Comments from "./Comments";
import ProTips from "./ProTips";
import ProductViews from "./ProductViews";
import { useSelector } from "react-redux";
import RequestDashboard from "../../Services/Api/ApiServices";

const Home = () => {
  const users = useSelector((state) => state.users);

  const [loader, setLoader] = useState(false)
  const [homeData, setHomeData] = useState()

  
  const getAllHomeData = useCallback(async() => {
    setLoader(true)
    let res = await RequestDashboard('gestreserv/dashboard/', 'GET', '', users.access_token);
    if (res.status === 200) {
      
      setHomeData(res.response?.results);
      setLoader(false)
    }
  }, [users.access_token]);
  
  React.useEffect(() => {
    getAllHomeData()
  }, [getAllHomeData])

  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>
          <Overview className={styles.card} />
          <ProductViews className={styles.card} />
          <ProTips className={styles.card} />
          {/*<MoreCustomers />*/}
        </div>
        <div className={styles.col}>
          <PopularProducts className={styles.card} views="4" />
          <Comments className={styles.card} />
          {/*<RefundRequests title="Refund requests" classTitle="title-red" />*/}
        </div>
      </div>
      <TooltipGlodal />
    </>
  );
};

export default Home;
