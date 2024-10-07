import React, { useState } from "react";
import cn from "classnames";
import { useDispatch, useSelector } from 'react-redux';
import styles from "./Language.module.sass";
import Item from "../Item";
//import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
//import Editor from "../../../components/Editor";
import Dropdown from "../../../components/Dropdown";
import i18n from "../../../Services/I18n/i18n";
import { useTranslation } from "react-i18next";

const optionsCategory = [
  {title: "French", code: "fr"},
  {title: "English", code: "en"},
];


const Language = ({ className, onClick }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language)

  const [category, setCategory] = useState(language?.language === 'en' ? optionsCategory[1] : optionsCategory[0]);


  const handleLanguageChange = (selectedTitle) => {
    const selectedLanguage = optionsCategory.find(option => option.title === selectedTitle);
    if (selectedLanguage?.code) {
      setCategory(selectedLanguage);
      i18n.changeLanguage(selectedLanguage.code);

      let action = {
        type: "LANGUAGE",
        value: {
          language: selectedLanguage.code,
          languageName: selectedLanguage.code === 'fr' ? t('words.french') : t('words.english')
        }
      };
      dispatch(action);
      onClick(selectedLanguage?.code)
    }
  };

  return (
    <>
      <Item className={cn(styles.card, className)}  title={t("views.settings.change_language")} classTitle="title-green" >
        <div className={styles.fieldset}>
          <TextInput  className={styles.field}  label={t('form.name')}  name="display-name" type="text"
            tooltip="Maximum 100 characters. No HTML or emoji allowed"  required
          />
          {/*<TextInput className={styles.field} label="Email"  name="email" type="email"
            tooltip="Maximum 100 characters. No HTML or emoji allowed" required />*/}
          {/*<TextInput  className={styles.field}  label="Location" name="location"
            type="text" tooltip="Maximum 100 characters. No HTML or emoji allowed" required />*/}
          <Dropdown language={true}  className={styles.field}  label={t('form.choose_language')}  tooltip="Maximum 100 characters. No HTML or emoji allowed"  value={category.title} setValue={handleLanguageChange}
            options={optionsCategory.map(option => option.title)}
          />
        </div>
      </Item>
    </>
  );
};

export default Language;
