import React from "react";
import styles from "./Editor.module.sass";
import cn from "classnames";
import { Editor as ReactEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Tooltip from "../Tooltip";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";

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
  button, onComment, loader, errorSubmit, setErrorSubmit, comment
}) => {


  return (
    <div className={cn( styles.editor, { [styles.editorButton]: button }, classEditor)} >
      
      {(errorSubmit && errorSubmit !== '') && (
        <ErrorMessage message={errorSubmit} onClose={() => setErrorSubmit('')}/>
      )}
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
        <button className={cn("button-small", styles.button, {[styles.disabled]: comment === ''})} disabled={comment === '' ? true : false} onClick={onComment}>{loader ? <Loader/> : button}</button>
      )}
    </div>
  );
};

export default Editor;
