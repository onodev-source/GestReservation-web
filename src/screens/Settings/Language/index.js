import React, { useState } from "react";
import cn from "classnames";
import styles from "./Language.module.sass";
import Item from "../Item";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";
import Dropdown from "../../../components/Dropdown";

const optionsCategory = ["Select language","French", "English", "Bafang"];

const Language = ({ className }) => {
  const [content, setContent] = useState();
  const [category, setCategory] = useState(optionsCategory[0]);

  return (
    <>
      <Item className={cn(styles.card, className)}  title="Change language" classTitle="title-green" >
        <div className={styles.fieldset}>
          <TextInput  className={styles.field}  label="Name"  name="display-name" type="text"
            tooltip="Maximum 100 characters. No HTML or emoji allowed"  required
          />
          {/*<TextInput className={styles.field} label="Email"  name="email" type="email"
            tooltip="Maximum 100 characters. No HTML or emoji allowed" required />*/}
          {/*<TextInput  className={styles.field}  label="Location" name="location"
            type="text" tooltip="Maximum 100 characters. No HTML or emoji allowed" required />*/}
          <Dropdown  className={styles.field}  label={"Choose language"}  tooltip="Maximum 100 characters. No HTML or emoji allowed"  value={category} setValue={setCategory}
            options={optionsCategory}
          />
        </div>
      </Item>
    </>
  );
};

export default Language;
