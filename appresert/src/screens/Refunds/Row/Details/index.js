import React, { useState } from "react";
import styles from "./Details.module.sass";
import cn from "classnames";
import Product from "./Product";
import Parameter from "./Parameter";
import TooltipGlodal from "../../../../components/TooltipGlodal";
import Editor from "../../../../components/Editor";
import Avatar from "../../../../components/Avatar";
import Icon from "../../../../components/Icon";

const suggestions = [
  "Talk to customer to see if you can help.",
  "If not, approve or decline the request.",
  "Will Yess, approve or decline the request.",
];

const Details = ({ item, customersDetails, onClose }) => {
  const [content, setContent] = useState();

  const customerArray = [
    { title: 'Full name', content: item.full_name },
    { title: 'Email', content: item.email },
    { title: 'Date of birth', content: item.date_of_birth },
    { title: 'Gender', content: item.gender },
    { title: 'Phone', content: item.phone_number },
    { title: 'City', content: item.city },
    { title: 'Country', content: item.country },
    { title: 'Language', content: item.language },
    { title: 'Mode session', content: item.mode_session },
  ];

  const parameters = customersDetails ? customerArray : item?.parameters

  return (
    <>
      <div className={styles.details}>
        <div className={cn("title-purple", styles.title)}>{customersDetails ? "Customer details" : " Income details"}</div>
        <div className={styles.row}>
          <div className={cn(styles.col, { [styles.colMax]: customersDetails })}>
            <Product className={styles.product} item={item} customersDetails={customersDetails}/>
            <div className={styles.parameters}>
              {parameters?.map((x, index) => (
                <Parameter item={x} key={index} />
              ))}
            </div>
            {customersDetails &&
              <div className={styles.btns}>
                <button className={cn("button-stroke", styles.button)} onClick={onClose}>
                  Cancel
                </button>
                <button className={cn("button", styles.button)}>
                  Delete
                </button>
              </div>
            }
          </div>
          {!customersDetails &&
            <div className={styles.col}>
              <div className={styles.group}>
                <div className={styles.box}>
                  <div className={styles.info}>Package category</div>
                  <ul className={styles.list}>
                      <li >OnoPremium</li>
                  </ul>
                </div>
                <div className={styles.box}>
                  <div className={styles.info}>Products</div>
                  <ul className={styles.list}>
                    {suggestions.map((x, index) => (
                      <li key={index}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.box}>
                  <div className={styles.info}>Client</div>
                  <div className={styles.user}>
                    <Avatar user={{username: item.man, photo: item.avatar}} classname={styles.avatar}  width='32px'  height='32px'/>
                    {item.man}
                  </div>
                  <div className={styles.text}>
                    <div className={styles.textTel}>
                      <Icon name="phone" size="24" />
                      +237 698664117
                    </div>
                    <div>
                      <Icon name="mail" size="24" />
                      pouakoaudrey54@gmail.com
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.btns}>
                <button className={cn("button-stroke", styles.button)} onClick={onClose}>
                  Cancel
                </button>
                <button className={cn("button", styles.button)}>
                  Delete
                </button>
              </div>
            </div>
          }
        </div>
      </div>
      <TooltipGlodal />
    </>
  );
};

export default Details;
