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
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";

const Settings = () => {
  const {t} = useTranslation()
  const users = useSelector((state) => state.users);
  
  const navigation = [
    /*{
      title: "Basics",
      action: () =>
        scrollToProfile.current.scrollIntoView({ behavior: "smooth" }),
    },*/
    {
      title: t('views.settings.account'),
      //action: () => scrollToProfile.current.scrollIntoView({ behavior: "smooth" }),
    },
    {
      title: t('views.settings.category'),
      //action: () =>scrollToLogin.current.scrollIntoView({ behavior: "smooth" }),
    },
    {
      title: t('views.settings.notifications'),
    },
    {
      title: t('views.settings.language'),
      //action: () =>/scrollToLogin.current.scrollIntoView({ behavior: "smooth" }),
    },
    {
      title: t('views.settings.help'),
     // action: () => scrollToLogin.current.scrollIntoView({ behavior: "smooth" }),
    },
    /*{
      title: "Payment",
      action: () =>
        scrollToPayment.current.scrollIntoView({ behavior: "smooth" }),
    },*/
  ];

  const options = [];
  navigation.map((x) => options.push(x.title));

  const [activeTab, setActiveTab] = useState(options[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loader, setLoader] = useState(false)
  const [errorSubmit, setErrorSubmit] = useState('')
  const [form, setForm] = useState({
    tel: '',
    email: '',    
    password: '',
    sexe: '',
    location: ''
  })
  //const scrollToProfile = useRef(null);
  //const scrollToLogin = useRef(null);

  const handleClick = (x, index) => {
    setActiveIndex(index);
    //x.action();
  };
  
  const textInputChange = (input) => {
    const target = input.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    switch (name) {
        case 'display-name':
          setForm({ ...form, name: value });
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
        case 'password':
          setForm({ ...form, password: value });
            break;
        default:
            break;
    }
  }
  
  const updateAccount =  async() => {
    setLoader(true)
    const data = {
      //first_name: form.name,
      phone_number: form.tel==='' ? '655889977': form.tel,
      gender: form.sexe==='' ? 'F': form.sexe,
      email: form.email,
      password: form.password==='' ? 'Audrey123': form.password,
      country: form.location,
      city: form.location
    }
    let res = await RequestDashboard('accounts/auth/users/me/', 'PUT', data, users.access_token);
    
    if (res.status === 201) {
      //setProduct(res.data);
      setLoader(false)
    }
    else if (res.status === 400) { 
      setLoader(false)
      setForm({ ...form, email: '', tel: '', sexe: '', location: '', password: '' });
      setErrorSubmit("Incorrect Email or Password"); 
    }
    else if (res.status === 401) { 
      setLoader(false)
      setForm({ ...form, email: '', tel: '', sexe: '', location: '', password: '' });
      setErrorSubmit( "Your email address has not been verified "); 
    }
    else { 
      setLoader(false)
      setForm({ ...form, email: '', tel: '', sexe: '', location: '', password: '' });
      setErrorSubmit("An error has occurred please try again"); 
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
                  <ProfileInformation onChange={textInputChange}/>
                </div>
                <div  className={cn(styles.item, {[styles.active]: activeTab === options[0], })} >
                  <div className={styles.anchor} ></div>
                  <Login />
                </div>
              </>
            }
            {(activeIndex === 1 ) &&
              <div  className={cn(styles.item, {  [styles.active]: activeTab === options[1], })} >
                <div className={styles.anchor}></div>
                <Category />
              </div>
            }
            {(activeIndex === 2) && 
              <div  className={cn(styles.item, {[styles.active]: activeTab === options[2],})} >
                <div className={styles.anchor} ></div>
                <Notifications />
              </div>
            }
            {(activeIndex === 3) && 
              <div className={cn(styles.item, { [styles.active]: activeTab === options[3],  })} >
                <div className={styles.anchor}></div>
                <Language />
              </div>
            }
            {(activeIndex === 4) && 
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
          {activeIndex !== 4 && <button onClick={updateAccount} className={cn("button", styles.button, styles.buttonStyle)}>{loader ? <Loader/> : "Save change"}</button>}
        </div>
      </div>
      <TooltipGlodal />
    </>
  );
};

export default Settings;
