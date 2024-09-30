import React, {useEffect, useState } from "react";
import styles from "./NewPost.module.sass";
import cn from "classnames";
import Icon from "../../../../components/Icon";
import Avatar from "../../../../components/Avatar";
import { useSelector } from "react-redux";
import RequestDashboard from "../../../../Services/Api/ApiServices";
import TextInput from "../../../../components/TextInput";
import DatePicker from "react-datepicker";
import Item from "../../../../components/Schedule/Item";
import { format } from "date-fns";
import { formatDate } from "../../../../Utils/formatDate";
import ErrorMessage from "../../../../components/ErrorMessage";

const items = [
  {
    avatar: "/images/content/avatar.jpg",
    icon: "facebook-fill",
  },
  /*{
    avatar: "/images/content/avatar.jpg",
    icon: "twitter-fill",
  },*/
];

const files = [
  {
    icon: 'image-stroke',
    accept: '.jpg,.jpeg,.png'
  },
  {
    icon: 'video-stroke',
    accept: '.mp4'
  }
];

const NewPost = ({updatePost, postRef, postId, item, onRefresh}) => {
  const users = useSelector((state) => state.users);

  const [loader, setLoader] = useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  //const [publicityImg, setPublicityImg] = useState([])
  const [media, setMedia] = useState([])
  const [mediaType, setMediaType] = useState('')
  const [form, setForm] = useState({
      title: "",
      description: "",
      start_date: "",
      end_date: ""
  })
  const [visibleDate, setVisibleDate] = useState(false);
  const [visibleDateEnd, setVisibleDateEnd] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState('')

  const handleClick = () => {
    setStartDate(null);
    setTimeout(() => setStartDate(new Date()), 10);
    setVisibleDate(false);
  };

  const textInputChange = (input) => {
    const target = input.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    switch (name) {
      case 'title':
        setForm({ ...form, title: value });
          break;
      case 'description':
        setForm({ ...form, description: value });
          break;
      default:
          break;
    }
  }

  const handleFileChange = ({ target }) => {
    const file = target.files[0];
    if (!file) return;
  
    const mediaType = file.type.split('/')[0];
    if (mediaType !== 'image' && mediaType !== 'video') {
      console.error("Le fichier sélectionné n'est ni une image ni une vidéo.");
      return;
    }
  
    const url = URL.createObjectURL(file);
    if (media?.length > 0) URL.revokeObjectURL(media[0].url);

    setMediaType(mediaType)
    setMedia([{ url, file }]);
    target.value = '';  // Réinitialiser l'input file
  };

  const addOrEditPublicity = async() => {
    setLoader(true)
    let formData = new FormData();  // Utilisation de FormData pour gérer le fichier
    
    //ajout des donnees du package au fichier
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("start_date", formatDate(startDate, 'SEND'),);
    formData.append("end_date", formatDate(endDate, 'SEND'));
    // Ajout du fichier photo_user
    if ( media[0]?.file) {
      formData.append("photo_publicity", media[0]?.file);
    }
    let res = updatePost ? await RequestDashboard(`gestreserv/publicities/${postId}/`, 'PUT', formData, users.access_token) : await RequestDashboard('gestreserv/publicities/', 'POST', formData, users.access_token)
    let status = updatePost ? 200 : 201

    if(res.status === status) {
      setForm({ ...form, title: '', description: '', start_date: '', end_date: '' });
      setMedia([])
      setLoader(false)
      if (postRef.current) {
        postRef.current.click();
        onRefresh()
      }
    } else {
      setLoader(false)
      setErrorSubmit("An error has occurred please try again"); 
    }
  }

  useEffect(()=> {
    if(updatePost && item){
      setForm({...form, title: item.title, description: item.description, })
      setMedia(item.photo_publicity);
      setStartDate(new Date(item.start_date));
      setEndDate(new Date(item.end_date));
      
    }
  }, [updatePost, item])
  

  return (
    <div className={styles.post}>
      <div className={cn("title-purple", styles.title)}>{updatePost? 'Update post' : 'New post'}</div>
      <div className={styles.list}>
        {items.map((x, index) => (
          <div className={styles.group} key={index}>
            <Avatar user={{username: users.users?.email, photo: users.users?.photo_user}} classname={styles.avatar}>
              <div className={styles.social}>
                {/*<Icon name={x.icon} size="12" />*/}
              </div>
            </Avatar>
            <div className={styles.profile}>
              <span>{users.users.full_name ? users.users.full_name : users.users.email}</span>
              <span>@{users.users.email.length > 12 ? `${users.users.email.slice(0, 12)}...` : users.users.email}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.field}>
        <TextInput onChange={textInputChange}  className={styles.field} placeholder='Title' value={form.title} name="title" type="text" tooltip="Maximum 100 characters. No HTML or emoji allowed" required/>
        <textarea className={styles.textarea}  onChange={textInputChange} value={form.description} name="description" placeholder="What you would like to share?" />
      </div>
      {form.title !== '' && (
        <div className={styles.info}>
          {form.title}{" "}
          <span role="img" aria-label="fire">
            🔥
          </span>
        </div>
      )}
      {media?.length > 0 &&
        <div className={styles.preview}>
          {!updatePost ? (
            mediaType === 'image' ? 
              <img src={media[0].url} alt="Video" />
            :
              <video controls>
                <source src={media[0].url} type={media[0].file.type} />
              </video>
          ) :
            media[0].url ? (
              <img src={media[0].url} alt="Video" />
            ) :
              <img src={media} alt="Video" />
          }
        </div>
      }
      <div className={styles.dateContent}>
        <Item  className={styles.item} category="Start date"  icon="calendar" value={startDate && format(startDate, "MMMM dd, yyyy")} visible={visibleDate} setVisible={setVisibleDate} >
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
        </Item>
        <Item  className={styles.item} category="End date"  icon="calendar" value={endDate && format(endDate, "MMMM dd, yyyy")} visible={visibleDateEnd} setVisible={setVisibleDateEnd} >
          <div className={styles.date}>
            <DatePicker  selected={endDate}  onChange={(date) => setEndDate(date)}   dateFormatCalendar={"MMMM yyyy"} inline/>
            <div className={styles.footDate}>
              <button className={cn("button-stroke button-small", styles.button)} onClick={() => handleClick()} >
                Clear
              </button>
              <button className={cn("button-small", styles.button)} onClick={() => setVisibleDateEnd(false)}>
                Close
              </button>
            </div>
          </div>
        </Item>
      </div>
      {errorSubmit !== '' && (
        <ErrorMessage message={errorSubmit} onClose={() => setErrorSubmit('')}/>
      )}
      <div className={styles.foot}>
        <div className={styles.files}>
          {files.map((x, index) => (
            <div className={styles.file} key={index}>
              <input type="file" onChange={handleFileChange} accept={x.accept}/>
              <div className={styles.icon}>
                <Icon name={x.icon} size="20" />
              </div>
            </div>
          ))}
        </div>
        <button onClick={addOrEditPublicity} className={cn("button", styles.button)}>
          {loader ? (
            <loader/>
          ) : (
            <>
              <span>{updatePost? 'Edit' : 'Post'}</span>
              <Icon name="arrow-right" size="24" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default NewPost;
