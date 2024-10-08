import React, { useEffect, useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";
import { Routes } from "../../../Constants";
import { ContentState, EditorState } from "draft-js";

const NameAndDescription = ({ className, onChange, formAdd }) => {
  const {t} = useTranslation()
  const [content, setContent] = useState(EditorState.createEmpty());

  // Fonction qui se déclenche à chaque changement de contenu sur l'editor
  /*const handleEditorChange = (newContent) => {
    setContent(newContent);
    
    setDescripbe(newContent.getCurrentContent().getPlainText())
  };*/

  // Utilisez un effet pour synchroniser le contenu de l'éditeur avec formAdd.descripbe
  useEffect(() => {
    if (formAdd.descripbe !== undefined) {
      const currentContent = content?.getCurrentContent();
      const newContent = ContentState.createFromText(formAdd.descripbe);

      // Si le contenu a changé, mettez à jour l'état de l'éditeur sans réinitialiser le curseur
      if (currentContent?.getPlainText() !== formAdd.descripbe) {
        const newEditorState = EditorState.createWithContent(newContent);
        setContent(newEditorState);
      }
    }
  }, [formAdd.descripbe, content]);

  return (
    <Card className={cn(styles.card, className)} title={t('views.products.add.name_and_description')} classTitle="title-green"
      head={
        <Link className={cn("button-stroke button-small", styles.button)} to= {Routes.CUSTOMERS_DASH}>
          <Icon name="arrow-left" size="24" />
          <span>{t('words.back')}</span>
        </Link>
      }
    >
      <div className={styles.description}>
        <TextInput className={styles.field} value={formAdd.form.first_name} onChange={onChange} label={t('views.customers.add.customere_name')}  name="first-name" type="text" tooltip="Maximum 100 characters. No HTML or emoji allowed" required/>
        <TextInput className={styles.field} value={formAdd.form.last_name} onChange={onChange} label={t('views.customers.add.customere_last_name')}  name="last-name" type="text" tooltip="Maximum 100 characters. No HTML or emoji allowed" />
        {/*<Editor state={content}onChange={handleEditorChange} classEditor={styles.editor} label="Description" tooltip="Description"/>
        <div className={styles.group}>
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
