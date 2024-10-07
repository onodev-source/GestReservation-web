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

const NameAndDescription = ({ className, product, onChange, setDescripbe, formAdd, setCaracteristics }) => {
  const {t} = useTranslation()
  // Initialisation de l'état content avec un EditorState vide
  const [content, setContent] = useState(EditorState.createEmpty());
  const [contentcaract, setContentCaract] = useState(EditorState.createEmpty());

  const handleEditorChange = (newContent, setter, setValue) => {
    setter(newContent);
    setValue(newContent.getCurrentContent().getPlainText());
  };

  // Fonction pour synchroniser l'éditeur avec formAdd
  const useSyncEditorState  = (editorState, formValue, setter) => {
    useEffect(() => {
      if (formValue !== undefined) {
        const currentContent = editorState.getCurrentContent();
        const newContent = ContentState.createFromText(formValue);

        if (currentContent.getPlainText() !== formValue) {
          const newEditorState = EditorState.createWithContent(newContent);
          setter(newEditorState);
        }
      }
    }, [formValue, editorState]);
  };

  // Synchroniser l'état des éditeurs
  useSyncEditorState(content, formAdd.descripbe, setContent);
  useSyncEditorState(contentcaract, formAdd.caracteristics, setContentCaract);

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
        <TextInput onChange={onChange} value={product ? formAdd.form?.product_name : formAdd.form?.package_name} className={styles.field} label={product ? t('views.products.add.product_title') : t('views.packages.add.title_package')}  name="title" type="text" tooltip="Maximum 100 characters. No HTML or emoji allowed" required/>
        <Editor state={content} onChange={(newContent) => handleEditorChange(newContent, setContent, setDescripbe)} classEditor={styles.editor} label={t('views.products.add.description')}  tooltip="Description"/>
        {product ? (
          <Editor state={contentcaract} onChange={(newContent) => handleEditorChange(newContent, setContentCaract, setCaracteristics)} classEditor={styles.editor} label={t('views.products.add.key_features')}  tooltip="Key features "/>
        ) : (
          <div className={styles.group}>
            <TextInput onChange={onChange} value={product ? formAdd.form?.product_name : formAdd.form?.nb_persons} className={styles.field}  label={t('views.products.add.key_features')} name="nb_persons" type="text" placeholder={t('form.nber_people')} tooltip="Maximum 100 characters. No HTML or emoji allowed" required/>
            <TextInput onChange={onChange} value={product ? formAdd.form?.product_name : formAdd.form?.nb_places}  className={styles.field} name="nb_places" type="text" placeholder={t('form.nber_place')}  required/>
          </div>
        )}
        {/*<div className={styles.group}>
          <TextInput onChange={onChange} value={product ? formAdd.form?.product_name : formAdd.form?.nb_persons} className={styles.field}  label={t('views.products.add.key_features')} name="nb_persons" type="text" placeholder={product ? t('views.products.add.value') : 'Number of persons'} tooltip="Maximum 100 characters. No HTML or emoji allowed" required/>
          <TextInput onChange={onChange} value={product ? formAdd.form?.product_name : formAdd.form?.nb_places}  className={styles.field} name="nb_places" type="text" placeholder={product ? t('views.products.add.value') : 'Number of places'}  required/>
          <TextInput onChange={onChange} value={formAdd.form?.product_name}  className={styles.field}  name="value3" type="text"  placeholder={t('views.products.add.value')} required />
          <TextInput onChange={onChange} value={formAdd.form?.product_name}  className={styles.field}  name="value4"  type="text"  placeholder={t('views.products.add.value')} required  />
        </div>*/}
      </div>
    </Card>
  );
};

export default NameAndDescription;
