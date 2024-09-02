import React, { useState } from "react";
import cn from "classnames";
import styles from "./ProfileInformation.module.sass";
import Item from "../Item";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";
import Avatar from "../../../components/Avatar";
import { useSelector } from "react-redux";
//import { EditorState, convertFromRaw, convertToRaw } from "react-draft-wysiwyg";

const ProfileInformation = ({ className, onChange, formUpdate, setFormUpdate }) => {
  const users = useSelector((state) => state.users);
  //const [content, setContent] = useState();
  const [content, setContent] = useState(
    /*formUpdate.bio
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(formUpdate.bio)))
      : EditorState.createEmpty()*/
  );

  const [profileImg, setProfileImg] = useState({
    media: '',
    type: ''
  })

  const handleEditorChange = (editorState) => {
    setContent(editorState);
    //const bioRaw = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    //setFormUpdate((prevForm) => ({ ...prevForm, bio: bioRaw }));
  };


  //fonction  de gestion des images du profile
  const handleFileChange = ({target}) => {
    const file = target.files[0];

    // Vérifiez si un fichier a été sélectionné
    if (!file) {
        return; // Sortir si aucun fichier n'est sélectionné
    }

    const mediasCopy = [...profileImg];
    const mediaType = file.type.split('/')[0];

    // Vérifiez que le fichier est une image
    if (mediaType === 'image') {
        // Créez une URL pour l'image
        const url = URL.createObjectURL(file);
        
        // Ajoutez l'image à la liste
        mediasCopy.push({ url, file });
        setProfileImg({...profileImg, media: mediasCopy, type: mediaType});
    } else {
        console.error('Le fichier sélectionné n\'est pas une image.');
    }
  };

  return (
    <Item className={cn(styles.card, className)}  title="Profile information" classTitle="title-green" >
      <div className={styles.profile}>
        <Avatar user={profileImg.media === '' ? users.users : profileImg.media} classname={styles.avatar}  width='96px'  height='96px'>
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
          label="Display name"
          name="display-name"
          type="text"
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
          value={formUpdate.location}
          label="Location"
          name="location"
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
