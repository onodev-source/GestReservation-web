import React from "react";
import styles from "./Editor.module.sass";
import cn from "classnames";
import { Editor as ReactEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Tooltip from "../Tooltip";

const Editor = ({
  state,
  name,
  onChange,
  classEditor,
  label,
  classLabel,
  tooltip,
  place,
  value,
  button,
}) => {

  // Fonction pour gérer les changements et inclure le nom
  const handleEditorChange = (editorState) => {
    onChange(name, editorState);  // Passer le name au onChange
  };

  return (
    <div className={cn( styles.editor, { [styles.editorButton]: button }, classEditor)} >
      {label && (
        <div className={cn(classLabel, styles.label)}>
          {label}{" "}
          {tooltip && (
            <Tooltip className={styles.tooltip} title={tooltip} icon="info"  place={place ? place : "right"} />
          )}
        </div>
      )}
      <ReactEditor editorState={state} toolbarClassName={styles.editorToolbar} wrapperClassName={styles.editorWrapper} editorClassName={styles.editorMain}  onEditorStateChange={onChange}
        toolbar={{
          options: ["inline", "emoji", "link", "list", "textAlign", "history"],
          inline: {
            options: [],
          },
          link: {
            options: ["link"],
          },
          list: {
            options: [],
          },
          textAlign: {
            options: [],
          },
          history: {
            options: [],
          },
        }}
      />
      {button && (
        <button className={cn("button-small", styles.button)}>{button}</button>
      )}
    </div>
  );
};

export default Editor;
