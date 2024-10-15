import React, { useEffect, useState } from "react";
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

const ProductFiles = ({ className, product, allProduct, setMediaUpdate, mediaUpdate, editProd, setProductIds, editPack, formUpdate }) => {
  const { t } = useTranslation();

  // State to manage the selected products
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productOrPackageImg, setProductOrPackageImg] = useState([])
  const [tags, setTags] = useState([]);

  const productNamesAndId = allProduct?.map(product => ({ id: product.id, product_name: product.product_name }));
  const productNames = allProduct?.map(product => product.product_name);

  const handleChange = (selectedItems) => {
    const itemsArray = Array.isArray(selectedItems) ? selectedItems : [selectedItems];
    const filteredItems = itemsArray.filter(item => item !== t('form.select_product'));
    let filteredItemsAddOrEdit = []

    if(editPack) {
      const updatedSelectedProducts = [ ...filteredItems]; // Ajoute la nouvelle sélection 
      filteredItemsAddOrEdit = updatedSelectedProducts
      setSelectedProducts(updatedSelectedProducts); // Met à jour avec la nouvelle sélection + formUpdate
    } else {
      filteredItemsAddOrEdit = filteredItems
      setSelectedProducts(filteredItems);
    }                                        
     
    const newTags = filteredItemsAddOrEdit?.map(item => {
      const foundProduct = allProduct.find(product => product.product_name === item);
      return { id: String(foundProduct.id), text: foundProduct.product_name };
    });
    setTags(newTags);
    setProductIds(newTags.map(tag => tag.text));
  };

  const handleDelete = (i) => {
    const newTags = tags?.filter((tag, index) => index !== i);
    setTags(newTags);
    setSelectedProducts(newTags?.map(tag => tag.text));
    setProductIds(newTags?.map(tag => tag.text));
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
    setProductIds([]);
  };

  const onTagUpdate = (i, newTag) => {
    const newTags = [...tags];
    newTags[i] = newTag;
    setTags(newTags);
    setSelectedProducts(newTags?.map(tag => tag.text));
    setProductIds(newTags?.map(tag => tag.text));
  };

  const handleFileChange = ({ target }) => {
    const file = target.files[0];

    // Vérifiez si un fichier a été sélectionné
    if (!file) {
        return; // Sortir si aucun fichier n'est sélectionné
    }

    const mediaType = file.type.split('/')[0];

    // Vérifiez que le fichier est une image
    if (mediaType === 'image') {
        // Créez une URL pour l'image
        const url = URL.createObjectURL(file);

        // Libérez l'ancienne URL si elle existe
        if (productOrPackageImg.length > 0) {
            URL.revokeObjectURL(productOrPackageImg[0].url);  // Suppression de l'ancienne image
        }

        // Remplacez l'ancienne image par la nouvelle (toujours une seule image)
        setProductOrPackageImg([{ url, file }]);
        setMediaUpdate({ url, file });
        
        target.value = '';  // Réinitialiser l'input file
    } else {
        console.error("Le fichier sélectionné n'est pas une image.");
    }
  };

  useEffect(() => {
    if (editPack && formUpdate) {
      setSelectedProducts(formUpdate?.map(product => product.product_name))
      const initialTags = formUpdate.map(item => ({
        id: String(item.id),
        text: item.product_name
      }));
      setTags(initialTags);
      setProductIds(initialTags.map(tag => tag.text));
    }
  }, [formUpdate, editPack])
  
  
  return (
    <Card className={cn(styles.card, className, styles.preview)} title={product ? t('views.products.add.upload_image') : t('views.packages.add.upload_image_package')} classTitle="title-blue">
      <div className={styles.files}>
        <File className={styles.field} onChange={handleFileChange} mediaUrl={productOrPackageImg.length > 0 ? mediaUpdate?.url : ((editProd || editPack) ? mediaUpdate : '')} title={t('views.products.add.click_or_drop_image')} label={t('views.products.add.preload')} tooltip="Maximum 100 characters. No HTML or emoji allowed" />
        {!product &&
          <>
            <Dropdown
              className={styles.field} label={t('views.products.products')} tooltip="Maximum 100 characters. No HTML or emoji allowed"  value={selectedProducts?.length > 0 ? selectedProducts : [t('form.select_product')]} setValue={handleChange} options={productNames}
              multiple
            />
            {selectedProducts?.length > 0 && (
              <div className={styles.tags}>
                <ReactTags
                  handleDelete={handleDelete}
                  handleDrag={handleDrag}
                  delimiters={delimiters}
                  handleTagClick={handleTagClick}
                  onClearAll={onClearAll}
                  onTagUpdate={onTagUpdate}
                  suggestions={productNamesAndId?.map((x) => ({ id: String(x.id), text: x.product_name }))}
                  placeholder={t('views.products.enter_product_name')}
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
          </>
        }
      </div>
    </Card>
  );
};

export default ProductFiles;
