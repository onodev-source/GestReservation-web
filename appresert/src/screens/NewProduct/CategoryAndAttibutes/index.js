import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./CategoryAndAttibutes.module.sass";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import Tooltip from "../../../components/Tooltip";
import Checkbox from "../../../components/Checkbox";
import { WithContext as ReactTags } from "react-tag-input";
import { useTranslation } from "react-i18next";
import RequestDashboard from "../../../Services/Api/ApiServices";
import { useSelector } from "react-redux";

const compatibility1 = [
  { id: 0, title: "OnoPremium" },
  { id: 1, title: "OnoPrestige" },
  { id: 2, title: "OnoFlash" },
  { id: 3, title: "OnoLigth" },
  { id: 4, title: "OnoStandart" },
];
const compatibility2 = [
  { id: 0, title: "Conference" },
  { id: 1, title: "Reunion" },
  { id: 2, title: "Brunch" },
];
const compatibility3 = [
  { id: 0, title: "Jeu" },
  { id: 1, title: "Equipement" },
  { id: 2, title: "Comodite" },
  { id: 4, title: "Gadjet" },
];

const optionsCategory = ["Category product", "Category package"];

const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const CategoryAndAttibutes = ({ className, categoryAttribute, product, onChange, setCategoryProduct }) => {
  const { t } = useTranslation();
  const users = useSelector((state) => state.users);
  const [category, setCategory] = useState(optionsCategory[0]);
  const [categoryData, setCategoryData] = useState([]);

  const [selectedFilter, setSelectedFilter] = useState(null);
  const [tags, setTags] = useState([]);

  const compatibility = categoryAttribute ? (product ? compatibility3 : compatibility1) : compatibility2;

  const handleChange = (id, title) => {
    if (selectedFilter === id) {
      setSelectedFilter(null);
      setTags([]);
    } else {
      setSelectedFilter(id);
      setTags([{ id: String(id), text: title }]);
      setCategoryProduct(title)
    }
  };

  const handleDelete = () => {
    setTags([]);
    setSelectedFilter(null);
  };

  const handleAddition = (tag) => {
    /*setTags([tag]);
    setSelectedFilter(parseInt(tag.id));*/
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = [...tags];
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const onClearAll = () => {
    setTags([]);
    setSelectedFilter(null);
  };

  const onTagUpdate = (i, newTag) => {
    setTags([newTag]);
    setSelectedFilter(parseInt(newTag.id));
  };

  useEffect(() => {
    const getAllCategory = async () => {
      let res = await RequestDashboard('gestreserv/categories/', 'GET', '', users.access_token);
      if (res.status === 200) {
        setCategoryData(res.response.results);
      }
    };
    getAllCategory();
    
  }, [users.access_token]);

  return (
    <Card className={cn(styles.card, className)} title={categoryAttribute ? t('views.products.add.category_attributes') : t('views.products.add.type_of_event')} classTitle="title-purple">
      <div className={styles.images}>
        <Dropdown className={styles.field} label={categoryAttribute ? t('views.products.add.category') : t('views.products.add.type')} tooltip="Maximum 100 characters. No HTML or emoji allowed" value={category} setValue={setCategory} options={optionsCategory} />
        <div className={styles.label}>
          {categoryAttribute ? t('views.products.add.name') : t('views.products.add.event')}{" "}
          <Tooltip className={styles.tooltip} title="Maximum 100 characters. No HTML or emoji allowed" icon="info" place="right" />
        </div>
        <div className={styles.list}>
          {categoryData.map((x, index) => (
            <Checkbox
              className={styles.checkbox}
              content={x.category_name}
              value={selectedFilter === x.id}
              onChange={() => handleChange(x.id, x.category_name)}
              key={index}
            />
          ))}
        </div>
        <div className={styles.head}>
          <div className={styles.label}>
            Tags{" "}
            <Tooltip
              className={styles.tooltip}
              title="Maximum 100 characters. No HTML or emoji allowed"
              icon="info"
              place="right"
            />
          </div>
          <div className={styles.counter}>
            <span>{tags.length}</span>/12 tags
          </div>
        </div>
        <div className={styles.tags}>
          <ReactTags
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            delimiters={delimiters}
            handleTagClick={handleTagClick}
            onClearAll={onClearAll}
            onTagUpdate={onTagUpdate}
            suggestions={categoryData.map((x) => ({ id: String(x.id), text: x.category_name }))}
            placeholder="Enter tags to describe your item"
            minQueryLength={2}
            maxLength={20}
            autofocus={false}
            allowDeleteFromEmptyInput={true}
            autocomplete={true}
            readOnly={false}
            allowUnique={true}
            allowDragDrop={true}
            inline={true}
            inputFieldPosition="inline"
            allowAdditionFromPaste={true}
            editable={true}
            clearAll={true}
            tags={tags}
            className={styles.tagsContent}
          />
        </div>
      </div>
    </Card>
  );
};

export default CategoryAndAttibutes;
