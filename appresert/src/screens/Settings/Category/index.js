import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Category.module.sass";
import Item from "../Item";
//import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
//import Editor from "../../../components/Editor";
import Dropdown from "../../../components/Dropdown";
import ErrorMessage from "../../../components/ErrorMessage";
import { useTranslation } from "react-i18next";


const Category = ({ className, onChange, errorSubmit, setErrorSubmit, setTypeCategory }) => {
  const {t} = useTranslation()
  //const [content, setContent] = useState();
  const optionsCategory = [t('form.select_category_type'),"Product", "Package", "Type event"];

  const [category, setCategory] = useState(optionsCategory[0]);

  useEffect(()=> {
    setTypeCategory(category)
  }, [category])
  
  return (
    <>
      <Item className={cn(styles.card, className)}  title={t("views.settings.edit.add_category")} classTitle="title-green" >
        <div className={styles.profile}>
          {errorSubmit !== '' && (
            <ErrorMessage message={errorSubmit} onClose={() => setErrorSubmit('')}/>
          )}
          <Dropdown  className={styles.field}  label={t('form.category_type')}  tooltip="Maximum 100 characters. No HTML or emoji allowed"  value={category} setValue={setCategory}
            options={optionsCategory.filter(category => category !== t('form.select_category_type'))} 
          />
          {/*<div className={styles.avatar}>
            <img src="/images/content/avatar.jpg" alt="Avatar" />
            <button className={styles.remove}>
              <Icon name="close" />
            </button>
          </div>
          <div className={styles.file}>
            <input type="file" />
            <button className={cn("button", styles.button)} type="button">
              <Icon name="add" size="24" />
              <span>Upload new picture</span>
            </button>
          </div>
          <button className={cn("button-stroke", styles.button)}>Remove</button>*/}
        </div>
        <div className={styles.fieldset}>
          <TextInput onChange={onChange} className={styles.field}  label={t('form.name')}  name="category" type="text"
            tooltip="Maximum 100 characters. No HTML or emoji allowed"  required
          />
          {/*<TextInput className={styles.field} label="Email"  name="email" type="email"
            tooltip="Maximum 100 characters. No HTML or emoji allowed" required />*/}
          {/*<TextInput  className={styles.field}  label="Location" name="location"
            type="text" tooltip="Maximum 100 characters. No HTML or emoji allowed" required />

          <Editor state={content}  onChange={setContent} classEditor={styles.editor}
            label="Wording" tooltip="Description"
          />*/}
        </div>
      </Item>
    </>
  );
};

export default Category;
