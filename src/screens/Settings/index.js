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

const Settings = () => {
  const navigation = [
    /*{
      title: "Basics",
      action: () =>
        scrollToProfile.current.scrollIntoView({ behavior: "smooth" }),
    },*/
    {
      title: "Account",
      //action: () => scrollToProfile.current.scrollIntoView({ behavior: "smooth" }),
    },
    {
      title: "Category",
      //action: () =>scrollToLogin.current.scrollIntoView({ behavior: "smooth" }),
    },
    {
      title: "Notifications",
    },
    {
      title: "Language",
      //action: () =>/scrollToLogin.current.scrollIntoView({ behavior: "smooth" }),
    },
    {
      title: "Help",
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
  //const scrollToProfile = useRef(null);
  //const scrollToLogin = useRef(null);

  const handleClick = (x, index) => {
    setActiveIndex(index);
    //x.action();
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
                  <ProfileInformation />
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
          {activeIndex !== 4 && <button className={cn("button", styles.button, styles.buttonStyle)}>Save change</button>}
        </div>
      </div>
      <TooltipGlodal />
    </>
  );
};

export default Settings;
