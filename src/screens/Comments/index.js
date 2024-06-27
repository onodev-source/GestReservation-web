import React, { useState } from "react";
import cn from "classnames";
import styles from "./Comments.module.sass";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Panel from "./Panel";
import Table from "./Table";

// data
import { comments } from "../../mocks/comments";

const Comments = ({activityUser}) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    alert();
  };

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
