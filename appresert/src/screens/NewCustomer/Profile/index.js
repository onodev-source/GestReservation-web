import React, { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Discussion.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";

const Profile = ({ className, product, onChange, form }) => {

  return (
    <Card className={cn(styles.card, className)} title="Customer profile" classTitle="title-green" >
      <div className={styles.description}>
        <TextInput className={styles.field} onChange={onChange} style={{ marginBottom: '32px' }} label="Username"  name="username" type="text" tooltip="Maximum 100 characters. No HTML or emoji allowed" required/>
        <TextInput className={styles.field} value={form.password} onChange={onChange} label="Password"  name="password" type="password" tooltip="Maximum 100 characters. No HTML or emoji allowed" icon="lock"/>
      </div>
    </Card>
  );
};

export default Profile;
