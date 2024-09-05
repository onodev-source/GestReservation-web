import React, { useState } from "react";
import cn from "classnames";
import styles from "./ProductFiles.module.sass";
import Card from "../../../components/Card";
import File from "../../../components/File";
import { useTranslation } from "react-i18next";
import Dropdown from "../../../components/Dropdown";
import { WithContext as ReactTags } from "react-tag-input";

const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const ProductFiles = ({ className, product, allProduct }) => {
  const { t } = useTranslation();

  // State to manage the selected products
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [tags, setTags] = useState([]);

  const productNamesAndId = allProduct?.map(product => ({ id: product.id, product_name: product.product_name }));
  const productNames = allProduct?.map(product => product.product_name);

  const handleChange = (selectedItems) => {
    const itemsArray = Array.isArray(selectedItems) ? selectedItems : [selectedItems];
    setSelectedProducts(itemsArray);
    const newTags = itemsArray.map(item => {
      const foundProduct = allProduct.find(product => product.product_name === item);
      return { id: String(foundProduct.id), text: foundProduct.product_name };
    });
    setTags(newTags);
  };

  const handleDelete = (i) => {
    const newTags = tags.filter((tag, index) => index !== i);
    setTags(newTags);
    setSelectedProducts(newTags.map(tag => tag.text));
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
    setSelectedProducts([]);
  };

  const onTagUpdate = (i, newTag) => {
    const newTags = [...tags];
    newTags[i] = newTag;
    setTags(newTags);
    setSelectedProducts(newTags.map(tag => tag.text));
  };

  return (
    <Card className={cn(styles.card, className, styles.preview)} title={product ? t('views.products.add.upload_image') : "Upload image package"} classTitle="title-blue">
      <div className={styles.files}>
        <File className={styles.field} title={t('views.products.add.click_or_drop_image')} label={t('views.products.add.preload')} tooltip="Maximum 100 characters. No HTML or emoji allowed" />
        <Dropdown
          className={styles.field} label='Products' tooltip="Maximum 100 characters. No HTML or emoji allowed"  value={selectedProducts} setValue={handleChange} options={productNames}
          multiple
        />
        {selectedProducts.length > 0 && (
          <div className={styles.tags}>
            <ReactTags
              handleDelete={handleDelete}
              handleDrag={handleDrag}
              delimiters={delimiters}
              handleTagClick={handleTagClick}
              onClearAll={onClearAll}
              onTagUpdate={onTagUpdate}
              suggestions={productNamesAndId?.map((x) => ({ id: String(x.id), text: x.product_name }))}
              placeholder="Enter products name"
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
        )}
      </div>
    </Card>
  );
};

export default ProductFiles;
