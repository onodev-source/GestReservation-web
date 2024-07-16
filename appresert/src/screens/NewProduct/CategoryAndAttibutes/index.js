import React, { useState } from "react";
import cn from "classnames";
import styles from "./CategoryAndAttibutes.module.sass";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import Tooltip from "../../../components/Tooltip";
import Checkbox from "../../../components/Checkbox";
import { WithContext as ReactTags } from "react-tag-input";

const compatibility1 = [
  {
    id: 0,
    title: "OnoPremium",
  },
  {
    id: 1,
    title: "OnoPrestige",
  },
  {
    id: 2,
    title: "OnoFlash",
  },
  {
    id: 3,
    title: "OnoLigth",
  },
  {
    id: 4,
    title: "OnoStandart",
  }
];
const compatibility2 = [
  {
    id: 0,
    title: "Conference",
  },
  {
    id: 1,
    title: "Reunion",
  },
  {
    id: 2,
    title: "Brunch",
  },
];
const compatibility3 = [
  {
    id: 0,
    title: "Jeu",
  },
  {
    id: 1,
    title: "Equipement",
  },
  {
    id: 2,
    title: "Comodite",
  },
  {
    id: 4,
    title: "Gadjet",
  }
];

const optionsCategory = ["Select category", "Category 1", "Category 2"];

const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const CategoryAndAttibutes = ({ className, categoryAttribute, product }) => {
  const [category, setCategory] = useState(optionsCategory[0]);

  const [selectedFilters, setSelectedFilters] = useState([]);

  const compatibility = categoryAttribute ? (product ? compatibility3 : compatibility1) : compatibility2;

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  const [tags, setTags] = useState([{ id: "Geometry", text: "Geometry" }]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = [...tags].slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const onClearAll = () => {
    setTags([]);
  };

  const onTagUpdate = (i, newTag) => {
    const updatedTags = tags.slice();
    updatedTags.splice(i, 1, newTag);
    setTags(updatedTags);
  };

  return (
    <Card className={cn(styles.card, className)}  title={categoryAttribute ? "Category & attibutes" : "Type of event"} classTitle="title-purple" >
      <div className={styles.images}>
        <Dropdown  className={styles.field}  label={categoryAttribute ? "Category" : "Type"}  tooltip="Maximum 100 characters. No HTML or emoji allowed"  value={category} setValue={setCategory}
          options={optionsCategory}
        />
        <div className={styles.label}>
          {categoryAttribute ? "Name" : "Event"}{" "}
          <Tooltip  className={styles.tooltip}  title="Maximum 100 characters. No HTML or emoji allowed" icon="info" place="right" />
        </div>
        <div className={styles.list}>
          {compatibility.map((x, index) => (
            <Checkbox
              className={styles.checkbox}
              content={x.title}
              value={selectedFilters.includes(x.id)}
              onChange={() => handleChange(x.id)}
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
            <span>1</span>/12 tags
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
            suggestions={[{ id: "1", text: "Geometry" }]}
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
