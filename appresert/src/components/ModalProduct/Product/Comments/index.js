import React, { useCallback, useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Comments.module.sass";
import Icon from "../../../Icon";
import Item from "./Item";
import TooltipGlodal from "../../../TooltipGlodal";
import Editor from "../../../Editor";

import { useSelector } from "react-redux";
import RequestDashboard from "../../../../Services/Api/ApiServices";
import { ContentState, EditorState } from "draft-js";
import NoContent from "../../../NoContent";
import { useTranslation } from "react-i18next";

const Comments = ({ className, onClose, detailsData }) => {
  const {t} = useTranslation()
  const users = useSelector((state) => state.users);
  const [content, setContent] = useState(EditorState.createEmpty());
  const [message, setMessage] = useState('');
  const [comment, setComment] = useState('');
  const [errorSubmit, setErrorSubmit] = useState('')
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
      user: {
        email: users.users.email
      },
      packages: [detailsData?.id]
    };
    
    let res = await RequestDashboard('gestreserv/commentaries/', 'POST', data, users.access_token)

    if(res.status === 201) {
      setComment('')
      setContent(EditorState.createEmpty())
      getAllcommentByPack(detailsData?.id)
      setLoader(false)
    } else {
      setLoader(false)
      setErrorSubmit('An error has occurred please try again')
    }
  }

  const getAllcommentByPack = useCallback(async(id) => {
    let res = await RequestDashboard(`gestreserv/commentaries/by-package/${id}/`, 'GET', '', users.access_token);
    if (res.status === 200) {
      setCommentByPack(res?.response?.results);
    } else if(res.status === 404) {
      setCommentByPack([]);
      setMessage(res.response?.detail)
    }
  },[users.access_token])

  const deleteCommentById = async(id) => {
    let res = await RequestDashboard(`gestreserv/commentaries/${id}/`, 'DELETE', '', users.access_token);
    if (res.status === 204) {
      getAllcommentByPack(detailsData?.id);
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
            <div className={styles.counter}>{commentByPack?.length}</div>
            {t('views.packages.comment')}
          </div>
          <button className={styles.close} onClick={onClose}>
            <Icon name="close" size="24" />
          </button>
        </div>
        <Editor state={content} onComment={addComment} errorSubmit={errorSubmit}  setErrorSubmit={setErrorSubmit} loader={loader} onChange={handleEditorChange} comment={comment}  classEditor={styles.editor} label={t('views.packages.reviews_this_package')}  tooltip="You’re product owner"  button="Comment" />
        <div className={cn(styles.list, styles.overflowAuto)}>
          {commentByPack.length > 0 ?
            commentByPack.map((x, index) => (
              <Item className={cn(styles.item)} item={x} key={index} getAllcommentByPack={() => getAllcommentByPack(detailsData?.id)} onDeleteCommment= {() => deleteCommentById(x.id)}/>
            ))
            : <NoContent message={message !== '' ? message : ''}/>
          }
        </div>
      </div>
      <TooltipGlodal />
    </>
  );
};

export default Comments;
