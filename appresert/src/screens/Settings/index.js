import React, { useState } from "react";
import cn from "classnames";
import styles from "./Settings.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Dropdown from "../../components/Dropdown";
import ProfileInformation from "./ProfileInformation";
import Login from "./Login";
import Notifications from "./Notifications";
//import Payment from "./Payment";
import Category from "./Category";
import Help from "./Help";
import Item from "./Item";
import Language from "./Language";
import { useTranslation } from "react-i18next";
import RequestDashboard from "../../Services/Api/ApiServices";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";

const Settings = () => {
  const {t} = useTranslation()
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  
  const navigations = [
    /*{
      title: "Basics",
      action: () =>
        scrollToProfile.current.scrollIntoView({ behavior: "smooth" }),
    },*/
    {
      id: 1,
      title: t('views.settings.account'),
      //action: () => scrollToProfile.current.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: 2,
      title: t('views.settings.category'),
      action: () => setIsCategory(true),
    },
    {
      id: 3,
      title: t('views.settings.notifications'),
    },
    {
      id: 4,
      title: t('views.settings.language'),
      //action: () =>/scrollToLogin.current.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: 5,
      title: t('views.settings.help'),
     // action: () => scrollToLogin.current.scrollIntoView({ behavior: "smooth" }),
    },
    /*{
      title: "Payment",
      action: () =>
        scrollToPayment.current.scrollIntoView({ behavior: "smooth" }),
    },*/
  ];
  const navigation = users.users.is_customer ? navigations.filter(item => item.id !== 2)  : navigations;

  const options = [];
  navigation.map((x) => options.push(x.title));

  const [activeTab, setActiveTab] = useState(options[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loader, setLoader] = useState(false)
  const [isCategory, setIsCategory] = useState(false)
  const [errorSubmit, setErrorSubmit] = useState('')
  const [typeCategory, setTypeCategory] = useState('')
  const [media, setMedia] = useState()
  const [form, setForm] = useState({
    first_name: users.users.first_name,
    last_name: users.users.last_name,
    tel: users.users.phone_number,
    email: users.users.email,    
    password: users.users.password,
    sexe: users.users.gender,
    location: users.users.country,
    date_of_birth: users.users.date_of_birth,
    company_name: users.users.company_name,
    bio: users.users.bio,
    language: users.users.language,
    mode_session: users.users.mode_session,
    is_online: users.users.is_online,
    is_customer: users.users.is_customer,
    category: '',
    media: users.users?.photo_user
  })
  //const scrollToProfile = useRef(null);
  //const scrollToLogin = useRef(null);

  const handleClick = (x, index) => {
    setActiveIndex(index);
    if(x.action){
      x.action();
    } else {
      setIsCategory(false)
    }
  };
  
  const textInputChange = (input) => {
    const target = input.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    switch (name) {
        case 'first-name':
          setForm({ ...form, first_name: value });
            break;
        case 'last-name':
          setForm({ ...form, last_name: value });
            break;
        case 'tel':
          setForm({ ...form, tel: value });
            break;
        case 'location':
          setForm({ ...form, location: value });
            break;
        case 'sexe':
          setForm({ ...form, sexe: value });
            break;
        case 'email':
          setForm({ ...form, email: value });
            break;
        case 'new-password':
          setForm({ ...form, password: value });
            break;
        case 'category':
          setForm({ ...form, category: value });
            break;
        default:
            break;
    }
  }
 

  //start_date: formatDate(startDate, 'SEND'),
  const updateAccountAndCategory = async () => {
    setLoader(true);
  
    let formData = new FormData();  // Utilisation de FormData pour gérer le fichier
  
    if (!isCategory) {
      // Ajout des données utilisateur au FormData
      formData.append("first_name", form.first_name);
      formData.append("last_name", form.last_name);
      formData.append("phone_number", form.tel);
      formData.append("gender", form.sexe);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("country", form.location);
      formData.append("city", form.location);
      formData.append("date_of_birth", form.date_of_birth);
      formData.append("bio", form.bio);
      formData.append("language", form.language);
      formData.append("password", form.password);
  
      // Ajout du fichier photo_user
      if (media?.file) {
        formData.append("photo_user", media.file);
      }
    } else {
      if(typeCategory !== 'Select category type'){
        // Si c'est une catégorie, on ajoute seulement le nom de la catégorie
        formData.append("category_name", form.category);
        formData.append("type_category", typeCategory);
      } else {
        setErrorSubmit("Please select category type.");
      }
    }
  
    try {
      // Appel API avec FormData
      let res = await RequestDashboard( !isCategory ? 'accounts/auth/users/me/' : 'gestreserv/categories/', !isCategory ? 'PUT' : 'POST', formData,   users.access_token );
      let status = !isCategory ? 200 : 201
      
      if (res.status === status) {
        // Traitement si succès
        if (!isCategory) {
          let action = {
            type: "USERS",
            value:  res.response ,
          };
          dispatch(action);
          setErrorSubmit('The users has been successfully updated');
        } else {
          setErrorSubmit('The category has been successfully created');
        }
        setLoader(false);
      } else if (res.status === 400) {
        setLoader(false);
        setForm({ ...form, email: '', tel: '', sexe: '', location: '', password: '' });
        setErrorSubmit("Incorrect Email or Password");
      } else if (res.status === 401) {
        setLoader(false);
        setForm({ ...form, email: '', tel: '', sexe: '', location: '', password: '' });
        setErrorSubmit("Your email address has not been verified");
      } else {
        setLoader(false);
        setForm({ ...form, email: '', tel: '', sexe: '', location: '', password: '' });
        setErrorSubmit("An error has occurred, please try again");
      }
    } catch (error) {
      console.error("Error during API call", error);
      setLoader(false);
      setErrorSubmit("An unexpected error occurred. Please try again.");
    }
  };
  
  
  return (
    <>
      <div className={styles.settings}>
        <div className={styles.menu}>
          {navigation.map((x, index) => (
            <button  className={cn(styles.button, {  [styles.active]: activeIndex === index,  })}
              key={index} onClick={() => handleClick(x, index)}
            >
              {x.title}
            </button>
          ))}
        </div>
        <div className={styles.wrapper}>
          <Dropdown className={styles.dropdown} classDropdownHead={styles.dropdownHead} value={activeTab}
            setValue={setActiveTab}
            setActiveIndex={setActiveIndex}
            options={options}
          />
          <div className={cn({[styles.list] : activeIndex !== 4})}>
            {(activeIndex === 0 ) &&
              <>
                <div  className={cn(styles.item, {  [styles.active]: activeTab === options[0], })} >
                  <div className={styles.anchor} ></div>
                  <ProfileInformation onChange={textInputChange} formUpdate={form} setFormUpdate={setForm} setMediaUpdate={setMedia}/>
                </div>
                <div  className={cn(styles.item, {[styles.active]: activeTab === options[0], })} >
                  <div className={styles.anchor} ></div>
                  <Login onChange={textInputChange} formUpdate={form}/>
                </div>
              </>
            }
            {!users.users.is_customer &&
              (activeIndex === 1 ) &&
                <div className={cn(styles.item, {  [styles.active]: activeTab === options[1], })} >
                  <div className={styles.anchor}></div>
                  <Category onChange={textInputChange} errorSubmit={errorSubmit} setErrorSubmit={setErrorSubmit} setTypeCategory={setTypeCategory}/>
                </div>
            }
            {((users.users.is_customer && activeIndex === 1) || (!users.users.is_customer && activeIndex === 2)) && 
              <div  className={cn(styles.item, {[styles.active]: activeTab === options[2],})} >
                <div className={styles.anchor} ></div>
                <Notifications />
              </div>
            }
            {((users.users.is_customer && activeIndex === 2) || (!users.users.is_customer && activeIndex === 3)) && 
              <div className={cn(styles.item, { [styles.active]: activeTab === options[3],  })} >
                <div className={styles.anchor}></div>
                <Language onChange={textInputChange} formUpdate={form}/>
              </div>
            }
            {((users.users.is_customer && activeIndex === 3) || (!users.users.is_customer && activeIndex === 4)) && 
              <div  className={cn(styles.item, {[styles.active]: activeTab === options[4],})} >
                <div className={styles.anchor} ></div>
                <Help />
              </div>
            }
            {/*<div className={cn(styles.item, { [styles.active]: activeTab === options[3],  })} >
              <div className={styles.anchor} ref={scrollToPayment}></div>
              <Payment />
            </div>*/}
          </div> 
          {((users.users.is_customer && activeIndex !== 3) || (!users.users.is_customer && activeIndex !== 4)) && <button onClick={updateAccountAndCategory} className={cn("button", styles.button, styles.buttonStyle)}>{loader ? <Loader/> : "Save change"}</button>}
        </div>
      </div>
      <TooltipGlodal />
    </>
  );
};

export default Settings;
