import React, { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";
import { Routes } from "../../../Constants";

const NameAndDescription = ({ className, product }) => {
  const [content, setContent] = useState();

  return (
    <Card className={cn(styles.card, className)} title="Name & description" classTitle="title-green"
      head={
        <Link className={cn("button-stroke button-small", styles.button)} to= {Routes.RESERVATION_DASH }>
          <Icon name="arrow-left" size="24" />
          <span>Back</span>
        </Link>
      }
    >
      <div className={styles.description}>
        <TextInput className={styles.field} label="Product title"  name="title" type="text" tooltip="Maximum 100 characters. No HTML or emoji allowed" required/>
        <Editor state={content}onChange={setContent} classEditor={styles.editor} label="Description" tooltip="Description"/>
        <div className={styles.group}>
          <TextInput className={styles.field}  label="Number of places" name="value1" type="number" placeholder="Value" tooltip="Enter number" required/>
          <TextInput  className={styles.field} label="Number of people" name="value2" type="number" placeholder="Value" tooltip="Maximum 20"  required/>
          {/*<TextInput  className={styles.field} label="Number of days"  name="value3" type="text"  placeholder="Value" required />
          <TextInput  className={styles.field} label="Number of days"  name="value4"  type="text"  placeholder="Value" required  />*/}
        </div>
      </div>
    </Card>
  );
};

export default NameAndDescription;
