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
        <Link className={cn("button-stroke button-small", styles.button)} to= {Routes.CUSTOMERS_DASH}>
          <Icon name="arrow-left" size="24" />
          <span>Back</span>
        </Link>
      }
    >
      <div className={styles.description}>
        <TextInput className={styles.field} label="Customer name"  name="name" type="text" tooltip="Maximum 100 characters. No HTML or emoji allowed" required/>
        <TextInput className={styles.field} label="Customer last name"  name="lastName" type="text" tooltip="Maximum 100 characters. No HTML or emoji allowed" />
        <Editor state={content}onChange={setContent} classEditor={styles.editor} label="Description" tooltip="Description"/>
        {/*<div className={styles.group}>
          <TextInput className={styles.field}  label="Key features" name="value1"type="text" placeholder="Value" tooltip="Maximum 100 characters. No HTML or emoji allowed" required/>
          <TextInput  className={styles.field} name="value2" type="text" placeholder="Value"  required/>
          <TextInput  className={styles.field}  name="value3" type="text"  placeholder="Value" required />
          <TextInput  className={styles.field}  name="value4"  type="text"  placeholder="Value" required  />
        </div>*/}
      </div>
    </Card>
  );
};

export default NameAndDescription;
