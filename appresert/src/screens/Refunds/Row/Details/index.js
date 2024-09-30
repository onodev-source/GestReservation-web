import React, { useState } from "react";
import styles from "./Details.module.sass";
import cn from "classnames";
import Product from "./Product";
import Parameter from "./Parameter";
import TooltipGlodal from "../../../../components/TooltipGlodal";
import Editor from "../../../../components/Editor";
import Avatar from "../../../../components/Avatar";
import Icon from "../../../../components/Icon";
import { formatDate } from "../../../../Utils/formatDate";
import { formatTime } from "../../../../Utils/formatTime";


const Details = ({ item, customersDetails, onClose, incomeDetail }) => {
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
  const orderArray = [
    { title: 'Date begin', content: `From ${formatDate(item.begin_date)} to ${formatTime(item.begin_hour)}`},
    { title: 'Date end', content:`From ${formatDate(item.end_date)} to ${formatTime(item.end_hour)}` },
    { title: 'Status', content: item.statut},
    //{ title: 'Package price', content: `${Math.floor(item?.package_price)}XAF ` },
    { title: 'Type event', content: item.type_event?.type_event },
    { title: 'Price month', content: `${Math.floor(item?.price_month)}XAF ` },
    { title: 'Price Day', content: `${Math.floor(item?.price_day)}XAF` },
    { title: 'Price hour', content: `${Math.floor(item?.price_hour)}XAF`  },
    { title: 'Date created', content: `${formatDate(item.created_at)}`  },
  ];
  const suggestions = [
    { title: 'Package name:', content: item.package?.package_name},
    //{ title: 'Package Des:', content: item.package?.package_name},
    { title: 'Package price:', content: ` ${Math.floor(item.package?.package_price)}XAF`},
  ];
  const incomeArray = [
    { title: 'Order number:', content: item.order_number},
    { title: 'Invoice Number:', content: item.invoice_number},
    { title: 'Invoice amount:', content: `${Math.floor(item.invoice_amount)}XAF `},
    { title: 'Invoice date:', content: ` ${formatDate(item.invoice_date, 'GET')}`},
    { title: 'Invoice method:', content: item.payment_method},
    { title: 'Invoice type:', content: item.payment_type},
    { title: 'Payment statut:', content: item.payment_statut},
  ];
 
  const parameters = customersDetails ? customerArray : (incomeDetail ? incomeArray : orderArray)


  return (
    <>
      <div className={styles.details}>
        <div className={cn("title-purple", styles.title)}>{customersDetails ? "Customer details" : (incomeDetail ? "Income detail" : "Order details")}</div>
        <div className={styles.row}>
          <div className={cn(styles.col, { [styles.colMax]: customersDetails || incomeDetail })}>
            {!incomeDetail && <Product className={styles.product} item={item} customersDetails={customersDetails}/>}
            <div className={styles.parameters}>
              {parameters?.map((x, index) => (
                <Parameter item={x} key={index} />
              ))}
            </div>
            {(customersDetails || incomeDetail) &&
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
          {(customersDetails===false || incomeDetail === false) &&
            <div className={styles.col}>
              <div className={styles.group}>
                <div className={styles.box}>
                  <div className={styles.info}>Package category</div>
                  <ul className={styles.list}>
                      <li >{item.package?.category_name}</li>
                  </ul>
                </div>
                <div className={styles.box}>
                  <div className={styles.info}>Package details</div>
                  <ul className={styles.list}>
                    {suggestions.map((x, index) => (
                      <li key={index}>{x.title}  {x.content}</li>
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
