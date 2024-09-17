import React, { useState } from "react";
import cn from "classnames";
import styles from "./ImagesAndCTA.module.sass";
import Card from "../../../components/Card";
import File from "../../../components/File";
//import Dropdown from "../../../components/Dropdown";

//const optionsPurchase = ["Purchase now", "Purchase tomorrow", "Buy later"];

const ImagesAndCTA = ({ className, setMediaUpdate }) => {
  //const [purchase, setPurchase] = useState(optionsPurchase[0]);
  const [productOrPackageImg, setProductOrPackageImg] = useState([])
  
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

  return (
    <Card className={cn(styles.card, className)} title="Image" classTitle="title-blue" >
      <div className={styles.images}>
        <File  className={styles.field} onChange={handleFileChange} mediaUrl={productOrPackageImg.length > 0 ? productOrPackageImg[0]?.url : ''} title="Click or drop image" label="Upload image" tooltip="Maximum 100 characters. No HTML or emoji allowed" />
        {/*<Dropdown  className={styles.field}
          label="Dropdown"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          value={purchase}
          setValue={setPurchase}
          options={optionsPurchase}
        />*/}
      </div>
    </Card>
  );
};

export default ImagesAndCTA;
