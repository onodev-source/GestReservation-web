import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Comments.module.sass";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Panel from "./Panel";
import Table from "./Table";

// data
import { comments } from "../../mocks/comments";
import RequestDashboard from "../../Services/Api/ApiServices";
import { useSelector } from "react-redux";

const Comments = ({activityUser}) => {
  const users = useSelector((state) => state.users)
  const [search, setSearch] = useState("");
  const [allComments, setAllComments] = useState([]);

  const handleSubmit = (e) => {
    alert();
  };
  
   
  // Utilisez un effet pour avoir tous les commentaires
  useEffect(() => {
    const getAllcomment= async() => {
      let res = await RequestDashboard(`gestreserv/commentaries/`, 'GET', '', users.access_token);
      if (res.status === 200) {
        setAllComments(res?.response?.results);
      }
    }
    getAllcomment()
  }, [users.access_token]);

  return (
    <>
      <Card className={styles.card} classCardHead={styles.head} title={!activityUser && "Package comments"} classTitle={cn("title-purple", styles.title)}
        head={ !activityUser &&
          <Form  className={styles.form}  value={search}  setValue={setSearch} onSubmit={() => handleSubmit()}  placeholder="Search comment" type="text"name="search" icon="search"/>
        }
      >
        <div className={styles.wrapper}>
          <Table items={comments} />
        </div>
      </Card>
      {!activityUser && <Panel />}
    </>
  );
};

export default Comments;
