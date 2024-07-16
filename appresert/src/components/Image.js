import React from "react";
import useDarkMode from "@fisch0920/use-dark-mode";

const Image = ({ className, src, srcDark, srcSet, srcSetDark, alt }) => {
  const darkMode = useDarkMode(false);

  return (
    <img
      className={className}
      srcSet={darkMode.value ? srcSetDark : srcSet}
      src={darkMode.value ? srcDark : src}
      alt={alt}
    />
  );
};

export default Image;
