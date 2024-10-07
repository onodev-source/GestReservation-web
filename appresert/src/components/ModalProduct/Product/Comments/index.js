import React, { useCallback, useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Comments.module.sass";
import Icon from "../../../Icon";
import Item from "./Item";
import TooltipGlodal from "../../../TooltipGlodal";
import Editor from "../../../Editor";

// data
import { commentsProduct } from "../../../../mocks/comments";
import { useSelector } from "react-redux";
import RequestDashboard from "../../../../Services/Api/ApiServices";
import { ContentState, EditorState } from "draft-js";

const Comments = ({ className, onClose, detailsData }) => {
  const users = useSelector((state) => state.users);
  const [content, setContent] = useState(EditorState.createEmpty());
  const [comment, setComment] = useState('');
  const [commentByPack, setCommentByPack] = useState([]);
  const [loader, setLoader] = useState()

  // Fonction qui se déclenche à chaque changement de contenu sur l'editor
  const handleEditorChange = (newContent) => {
    setContent(newContent);
    
    setComment(newContent.getCurrentContent().getPlainText())
  };

  const addComment = async() => {
    setLoader(true)
    
    let data = {
      content: comment,
      package: detailsData?.id,
      parent_comment: users.users.id,
    };
    
    let res = await RequestDashboard('gestreserv/commentaries/', 'POST', data, users.access_token)

    if(res.status === 201) {
      setLoader(false)
    } else {
      //setLoader(false)
    }
  }

  const getAllcommentByPack = useCallback(async(id) => {
    let res = await RequestDashboard(`gestreserv/commentaries/by-package/${id}/`, 'GET', '', users.access_token);
    if (res.status === 200) {
      setCommentByPack(res?.response?.results);
    }
  },[users.access_token])

  const deleteCommentById = async(id) => {
    let res = await RequestDashboard(`gestreserv/commentaries/${id}/`, 'DELETE', '', users.access_token);
    if (res.status === 204) {
      getAllcommentByPack();
    }
  }

  useEffect(() => {
    getAllcommentByPack(detailsData?.id)
  }, [getAllcommentByPack, detailsData?.id]) 

  // Utilisez un effet pour synchroniser le contenu de l'éditeur avec formAdd.descripbe
  useEffect(() => {
    if (comment) {
      const currentContent = content?.getCurrentContent();
      const newContent = ContentState?.createFromText(comment);

      // Si le contenu a changé, mettez à jour l'état de l'éditeur sans réinitialiser le curseur
      if (currentContent?.getPlainText() !== comment) {
        const newEditorState = EditorState?.createWithContent(newContent);
        setContent(newEditorState);
      }
    }
  }, [comment, content]);

  return (
    <>
      <div className={cn(styles.comments, className)}>
        <div className={styles.head}>
          <div className={styles.title}>
            <div className={styles.counter}>4</div>
            Comments
          </div>
          <button className={styles.close} onClick={onClose}>
            <Icon name="close" size="24" />
          </button>
        </div>
        <Editor state={content} onComment={addComment} loader={loader} onChange={handleEditorChange}  classEditor={styles.editor} label="Review this product?"  tooltip="You’re product owner"  button="Comment" />
        <div className={styles.list}>
          {commentsProduct.map((x, index) => (
            <Item className={styles.item} item={x} key={index} />
          ))}
        </div>
      </div>
      <TooltipGlodal />
    </>
  );
};

export default Comments;
