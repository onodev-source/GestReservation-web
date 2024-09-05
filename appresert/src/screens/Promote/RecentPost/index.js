import React, { useCallback, useRef, useState } from "react";
import styles from "./RecentPost.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import Loader from "../../../components/Loader";
import Modal from "../../../components/Modal";
import Row from "./Row";
import NewPost from "./NewPost";

// data
import { posts } from "../../../mocks/posts";
import { useSelector } from "react-redux";
import RequestDashboard from "../../../Services/Api/ApiServices";

const intervals = ["Last 7 days", "This month", "All time"];

const RecentPost = ({ className }) => {
  const users = useSelector((state) => state.users)
  const postRef = useRef(null)

  const [allPosts, setAllPosts] = useState([]);
  const [sorting, setSorting] = useState(intervals[0]);
  const [loader, setLoader] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  
  const getAllPublicity = useCallback(async() => {
    setLoader(true)
    let res = await RequestDashboard('gestreserv/customers/', 'GET', '', users.access_token);
    if (res.status === 200) {
      setAllPosts(res.response?.results);
      setLoader(false)
    }
  }, [users.access_token]);
  
  React.useEffect(() => {
    getAllPublicity()
  }, [getAllPublicity])

  return (
    <>
      <Card
        className={cn(styles.card, className)}
        title="Recent post"
        classTitle={cn("title-blue", styles.title)}
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
            <button className={cn("button-small", styles.button)}  onClick={() => setVisibleModal(true)} >
              New post
            </button>
          </>
        }
      >
        <div className={styles.table}>
          <div className={styles.row}>
            <div className={styles.col}>Post</div>
            <div className={styles.col}>Distribution</div>
            <div className={styles.col}>Link clicks</div>
            <div className={styles.col}>Views</div>
            <div className={styles.col}>Engagement</div>
          </div>
          {posts.map((x, index) => (
            <Row item={x} key={index} />
          ))}
        </div>
        <div className={styles.foot}>
          <button className={cn("button-stroke button-small", styles.button)}>
            <Loader className={styles.loader} />
            <span>Load more</span>
          </button>
        </div>
      </Card>
      <Modal outerClassName={styles.outer} visible={visibleModal}  onClose={() => setVisibleModal(false)} modalRef={postRef}>
        <NewPost postRef={postRef}/>
      </Modal>
    </>
  );
};

export default RecentPost;
