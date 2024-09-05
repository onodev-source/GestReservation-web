import React, { useEffect, useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";
import { Routes } from "../../../Constants";
import { useTranslation } from "react-i18next";
import { ContentState, EditorState } from "draft-js";

const NameAndDescription = ({ className, product, onChange, setDescripbe, formAdd }) => {
  const {t} = useTranslation()
  // Initialisation de l'état content avec un EditorState vide
  const [content, setContent] = useState(EditorState.createEmpty());

   // Fonction qui se déclenche à chaque changement de contenu sur l'editor
  const handleEditorChange = (newContent) => {
    setContent(newContent);
    
    setDescripbe(newContent.getCurrentContent().getPlainText())
  };

  // Utilisez un effet pour synchroniser le contenu de l'éditeur avec formAdd.descripbe
  useEffect(() => {
    if (formAdd.descripbe !== undefined) {
      const currentContent = content.getCurrentContent();
      const newContent = ContentState.createFromText(formAdd.descripbe);

      // Si le contenu a changé, mettez à jour l'état de l'éditeur sans réinitialiser le curseur
      if (currentContent.getPlainText() !== formAdd.descripbe) {
        const newEditorState = EditorState.createWithContent(newContent);
        setContent(newEditorState);
      }
    }
  }, [formAdd.descripbe, content]);

  return (
    <Card className={cn(styles.card, className)} title={t('views.products.add.name_and_description')} classTitle="title-green"
      head={
        <Link className={cn("button-stroke button-small", styles.button)} to= {product ? Routes.PRODUITS_DASH : Routes.PACKAGES}>
          <Icon name="arrow-left" size="24" />
          <span>{t('words.back')}</span>
        </Link>
      }
    >
      <div className={styles.description}>
        <TextInput onChange={onChange} value={product ? formAdd.form?.product_name : formAdd.form?.package_name} className={styles.field} label={t('views.products.add.product_title')}  name="title" type="text" tooltip="Maximum 100 characters. No HTML or emoji allowed" required/>
        <Editor state={content} onChange={handleEditorChange} classEditor={styles.editor} label={t('views.products.add.description')}  tooltip="Description"/>
        <div className={styles.group}>
          <TextInput onChange={onChange} value={product ? formAdd.form?.product_name : formAdd.form?.nb_persons} className={styles.field}  label={t('views.products.add.key_features')} name="nb_persons" type="text" placeholder={product ? t('views.products.add.value') : 'Number of persons'} tooltip="Maximum 100 characters. No HTML or emoji allowed" required/>
          <TextInput onChange={onChange} value={product ? formAdd.form?.product_name : formAdd.form?.nb_places}  className={styles.field} name="nb_places" type="text" placeholder={product ? t('views.products.add.value') : 'Number of places'}  required/>
          <TextInput onChange={onChange} value={formAdd.form?.product_name}  className={styles.field}  name="value3" type="text"  placeholder={t('views.products.add.value')} required />
          <TextInput onChange={onChange} value={formAdd.form?.product_name}  className={styles.field}  name="value4"  type="text"  placeholder={t('views.products.add.value')} required  />
        </div>
      </div>
    </Card>
  );
};

export default NameAndDescription;
