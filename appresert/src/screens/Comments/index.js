import React, { useCallback, useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Comments.module.sass";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Panel from "./Panel";
import Table from "./Table";


import RequestDashboard from "../../Services/Api/ApiServices";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";

const Comments = ({activityUser, userId}) => {
  const users = useSelector((state) => state.users)
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [allComments, setAllComments] = useState([]);

  const handleSubmit = (e) => {
    alert();
  };
  
  const getAllcomment= useCallback(async() => {
    setLoader(true)
    let res = await RequestDashboard(activityUser ? `gestreserv/commentaries/by-user/${userId}/` : `gestreserv/commentaries/`, 'GET', '', users.access_token);
    if (res.status === 200) {
      setAllComments(res?.response?.results);
      setLoader(false)
    }else if (res.status === 404){
      setAllComments([]);
      setMessage(res.response?.message)
      setLoader(false)
    }
  }, [users.access_token, activityUser, userId])
   
  // Utilisez un effet pour avoir tous les commentaires
  useEffect(() => {
    getAllcomment()
  }, [getAllcomment]);

  return (
    <>
      <Card className={styles.card} classCardHead={styles.head} title={!activityUser && "Package comments"} classTitle={cn("title-purple", styles.title)}
        head={ !activityUser &&
          <Form  className={styles.form}  value={search}  setValue={setSearch} onSubmit={() => handleSubmit()}  placeholder="Search comment" type="text"name="search" icon="search"/>
        }
      >
        <div className={styles.wrapper}>
          {loader ? <Loader/> : 
            <Table items={allComments} message={message} getAllcomment={getAllcomment}/>
          }
        </div>
      </Card>
      {!activityUser && <Panel />}
    </>
  );
};

export default Comments;
