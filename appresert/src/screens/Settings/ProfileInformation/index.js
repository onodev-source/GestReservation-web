import React, { useEffect, useState } from "react";
import cn from "classnames";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import { ContentState, EditorState } from "draft-js";
import styles from "./ProfileInformation.module.sass";
import Item from "../Item";
import { default as ScheduleItem } from "../../../components/Schedule/Item";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";
import Avatar from "../../../components/Avatar";
import { useSelector } from "react-redux";
import { formatDate } from "../../../Utils/formatDate";
//import { EditorState, convertFromRaw, convertToRaw } from "react-draft-wysiwyg";

const ProfileInformation = ({ className, onChange, formUpdate, setFormUpdate, setMediaUpdate }) => {
  const users = useSelector((state) => state.users);
  const [startDate, setStartDate] = useState(new Date(users.users?.date_of_birth));
  const [visibleDate, setVisibleDate] = useState(false);
  //const [content, setContent] = useState();
  const [content, setContent] = useState(EditorState.createEmpty());

  const [profileImg, setProfileImg] = useState([])
  const [type, setType] = useState('')
  

  const handleClick = () => {
    setStartDate(null);
    setTimeout(() => setStartDate(new Date()), 10);
    setVisibleDate(false);
  };

   // Fonction qui se déclenche à chaque changement de contenu sur l'editor
  const handleEditorChange = (newContent) => {
    setContent(newContent);
    
    setFormUpdate({...formUpdate, bio: newContent.getCurrentContent().getPlainText()})
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
        if (profileImg.length > 0) {
            URL.revokeObjectURL(profileImg[0].url);  // Suppression de l'ancienne image
        }

        // Remplacez l'ancienne image par la nouvelle (toujours une seule image)
        setProfileImg([{ url, file }]);
        setMediaUpdate({ url, file });
        setFormUpdate({ ...formUpdate, media: url });
        setType(mediaType);
        
        target.value = '';  // Réinitialiser l'input file
    } else {
        console.error("Le fichier sélectionné n'est pas une image.");
    }
  };

  useEffect(() => {
    setFormUpdate({ ...formUpdate, date_of_birth: formatDate(startDate, 'SEND') })
  },[startDate])
  
 // Utilisez un effet pour synchroniser le contenu de l'éditeur avec formAdd.descripbe
  useEffect(() => {
    if (formUpdate.bio !== undefined && formUpdate.bio !== null) {
      const currentContent = content?.getCurrentContent();
      const newContent = ContentState?.createFromText(formUpdate.bio);

      // Si le contenu a changé, mettez à jour l'état de l'éditeur sans réinitialiser le curseur
      if (currentContent?.getPlainText() !== formUpdate.bio) {
        const newEditorState = EditorState?.createWithContent(newContent);
        setContent(newEditorState);
      }
    }
  }, [formUpdate.bio, content]);
  
  return (
    <Item className={cn(styles.card, className)}  title="Profile information" classTitle="title-g-reen" >
      <div className={styles.profile}>
        <Avatar  user={{username: users.users?.email, photo: profileImg.length === 0 ? formUpdate.media : profileImg[0].url}} classname={styles.avatar}  width='96px'  height='96px'>
          <button className={styles.remove}>
            <Icon name="close" />
          </button>
        </Avatar>
        <div className={styles.file}>
          <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} />
          <button className={cn("button", styles.button)} type="button">
            <Icon name="add" size="24" />
            <span>Upload new picture</span>
          </button>
        </div>
        <button className={cn("button-stroke", styles.button)}>Remove</button>
      </div>
      <div className={styles.fieldset}>
        <TextInput
          onChange={onChange}
          className={styles.field}
          label="First name"
          name="first-name"
          type="text"
          value={formUpdate.first_name}
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
        />
        <TextInput
          onChange={onChange}
          className={styles.field}
          label="Last name"
          name="last-name"
          type="text"
          value={formUpdate.last_name}
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
        />
        <TextInput
          onChange={onChange}
          className={styles.field}
          label="Email"
          name="email"
          value={formUpdate.email}
          type="email"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
        />
        <TextInput
          onChange={onChange}
          className={styles.field}
          label="Tel"
          name="tel"
          value={formUpdate.tel}
          type="tel"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
        />
        <div className={styles.field}>
          <div className={cn( styles.label)}>
            Date of Birth{" "}
          </div>
          <ScheduleItem  className={styles.item} category="date Of Birth"  icon="calendar" value={startDate && format(startDate, "MMMM dd, yyyy")} visible={visibleDate} setVisible={setVisibleDate} >
            <div className={styles.date}>
              <DatePicker  selected={startDate}  onChange={(date) => setStartDate(date)}   dateFormatCalendar={"MMMM yyyy"} inline/>
              <div className={styles.footDate}>
                <button className={cn("button-stroke button-small", styles.button)} onClick={() => handleClick()} >
                  Clear
                </button>
                <button className={cn("button-small", styles.button)} onClick={() => setVisibleDate(false)}>
                  Close
                </button>
              </div>
            </div>
          </ScheduleItem>
        </div>
        <TextInput
          onChange={onChange}
          className={styles.field}
          value={formUpdate.location}
          label="Country"
          name="location"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
        />
        <TextInput
          onChange={onChange}
          className={styles.field}
          value={formUpdate.city}
          label="City"
          name="city"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
        />
        <Editor
          state={content}
          onChange={handleEditorChange}
          classEditor={styles.editor}
          label="Bio"
          name="bio"
          tooltip="Description"
        />
      </div>
    </Item>
  );
};

export default ProfileInformation;
