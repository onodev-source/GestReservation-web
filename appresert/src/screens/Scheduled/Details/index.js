import React from "react";
import styles from "./Details.module.sass";
import cn from "classnames";
import Product from "./Product";
import Parameter from "./Parameter";
import TooltipGlodal from "../../../components/TooltipGlodal"
//import Editor from "../../../components/Editor";
import Icon from "../../../components/Icon";
import { formatDate } from "../../../Utils/formatDate";
import { formatTime } from "../../../Utils/formatTime";
import Avatar from "../../../components/Avatar";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";


const Details = ({ item, onClose }) => {
  const {t} = useTranslation()
  const users = useSelector((state) => state.users);
  //const [content, setContent] = useState();
  
  const parameters = [
    { title: t('views.reservations.table.date_begin'), content: `From ${formatDate(item.begin_date)} to ${formatTime(item.begin_hour)}`},
    { title: t('views.reservations.table.date_end'), content:`From ${formatDate(item.end_date)} to ${formatTime(item.end_hour)}` },
    { title: t('views.reservations.table.status'), content: item.statut},
    //{ title: 'Package price', content: `${Math.floor(item?.package_price)}XAF ` },
    { title: t('views.products.add.type_of_event'), content: item.type_event?.type_event },
    { title: t('views.packages.add.monthly_subscription'), content: `${Math.floor(item?.price_month)}XAF ` },
    { title: t('views.packages.add.dayly_subscription'), content: `${Math.floor(item?.price_day)}XAF` },
    { title: t('views.packages.add.hourly_subscription'), content: `${Math.floor(item?.price_hour)}XAF`  },
    { title: t('views.reservations.table.date_created'), content: `${formatDate(item.created_at)}`  },
  ];

  const suggestions = [
    { title: `${t('views.packages.add.title_package')}:`, content: item.package?.package_name},
    //{ title: 'Package Des:', content: item.package?.package_name},
    { title: `${t('views.packages.add.price_subscription')}:`, content: ` ${Math.floor(item.package?.package_price)}XAF`},
  ];
  //const parameters = customersDetails ? customerArray : orderArray

  return (
    <>
      <div className={styles.details}>
        <div className={cn("title-purple", styles.title)}>{t('views.reservations.agenda.aganda_details')}</div>
        <div className={styles.row}>
          <div className={cn(styles.col)}>
            <Product className={styles.product} item={item} />
            <div className={styles.parameters}>
              {parameters?.map((x, index) => (
                <Parameter item={x} key={index} />
              ))}
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.group}>
              <div className={styles.box}>
                <div className={styles.info}>{t('form.category_package')}</div>
                <ul className={styles.list}>
                    <li >{item.package?.category_name}</li>
                </ul>
              </div>
              <div className={styles.box}>
                <div className={styles.info}>{t('views.packages.detail_package')}</div>
                <ul className={styles.list}>
                  {suggestions.map((x, index) => (
                    <li key={index}>{x.title}  {x.content}</li>
                  ))}
                </ul>
              </div>
              {!users.users.is_customer && 
                <div className={styles.box}>
                  <div className={styles.info}>{t('views.customers.customer')}</div>
                  <div className={styles.user} style={{textTransform: 'capitalize'}}>
                    <Avatar user={{username: item.user.full_name !== '' ? item.user.full_name : item.user.email, photo: item.user?.photo_user}} classname={styles.avatar}  width='32px'  height='32px'/>
                    {item.user.full_name !== '' ? item.user.full_name : item.user.email}
                  </div>
                  <div className={styles.text}>
                    <div className={styles.textTel}>
                      <Icon name="phone" size="24" />
                      {item.user.phone_number}
                    </div>
                    <div>
                      <Icon name="mail" size="24" />
                      {item.user.email}
                    </div>
                  </div>
                </div>
              }
            </div>
            <div className={styles.btns}>
              <button className={cn("button-stroke", styles.button)} onClick={onClose}>
                Cancel
              </button>
              {/*<button className={cn("button", styles.button)}>
                Delete
              </button>*/}
            </div>
          </div>
        </div>
      </div>
      <TooltipGlodal />
    </>
  );
};

export default Details;
