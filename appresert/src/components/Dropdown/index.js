import React, { useState } from "react";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Dropdown.module.sass";
import Tooltip from "../Tooltip";

const Dropdown = ({
  className,
  classDropdownHead,
  classDropdownLabel,
  value, // value sera un tableau si multiple est vrai
  setValue, // fonction pour mettre à jour les valeurs sélectionnées
  setActiveIndex,
  options,
  label,
  tooltip,
  small,
  upBody,
  language,
  multiple // ajout du paramètre multiple
}) => {
  const [visible, setVisible] = useState(false);

  const handleClick = (selectedValue, index) => {
    if (multiple) {
      // Gestion des sélections multiples
      if (value.includes(selectedValue)) {
        // Si l'élément est déjà sélectionné, on le retire
        setValue(value.filter(item => item !== selectedValue));
      } else {
        // Sinon, on l'ajoute
        setValue([...value, selectedValue]);
      }
    } else {
      // Gestion de la sélection unique
      setValue(selectedValue);
      setVisible(false);
    }

    if (setActiveIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      {label && (
        <div className={cn(styles.label, classDropdownLabel)}>
          {label}{" "}
          {tooltip && (
            <Tooltip
              className={styles.tooltip}
              title={tooltip}
              icon="info"
              place="right"
            />
          )}
        </div>
      )}
      <div
        className={cn(
          styles.dropdown,
          className,
          { [styles.small]: small },
          { [styles.active]: visible }
        )}
      >
        <div
          className={cn(styles.head, classDropdownHead)}
          onClick={() => setVisible(!visible)}
        >
          <div className={styles.selection}>
            {/* Affichage des sélections multiples ou unique */}
            {multiple
              ? value.join(", ") // Affiche les éléments sélectionnés séparés par des virgules
              : value}
          </div>
        </div>
        <div className={cn(styles.body, { [styles.bodyUp]: upBody })}>
          {options?.map((x, index) => (
            <div
              className={cn(
                styles.option,
                {
                  [styles.selectioned]: multiple
                    ? value.includes(x) // Si multiple est activé, vérifie si l'option est sélectionnée
                    : x === value // Sinon, vérifie si c'est l'option unique sélectionnée
                }
              )}
              onClick={() => handleClick(x, index)}
              key={index}
            >
              {x}
            </div>
          ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Dropdown;
