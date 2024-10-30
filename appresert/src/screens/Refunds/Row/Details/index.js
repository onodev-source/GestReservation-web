import React, { useRef} from "react";
import styles from "./Details.module.sass";
import cn from "classnames";
import Product from "./Product";
import Parameter from "./Parameter";
import TooltipGlodal from "../../../../components/TooltipGlodal";
//import Editor from "../../../../components/Editor";
import Avatar from "../../../../components/Avatar";
import Icon from "../../../../components/Icon";
import { formatDate } from "../../../../Utils/formatDate";
import { formatTime } from "../../../../Utils/formatTime";
import { useTranslation } from "react-i18next";


const Details = ({ item, customersDetails, onClose, incomeDetail, onDeleteInvoice, onDeleteOrder, onDeleteCust }) => {
  const {t} = useTranslation()
  //const [content, setContent] = useState();
  const detailRef = useRef(null)

  const customerArray = [
    { title: t('form.full_name'), content: item.full_name },
    { title: t('form.email'), content: item.email },
    { title: t('form.date_birth'), content: item.date_of_birth },
    { title: t('form.gender'), content: item.gender },
    { title: t('form.phone_number'), content: item.phone_number },
    { title: t('form.city'), content: item.city },
    { title: t('form.country'), content: item.country },
    { title: t('views.settings.language'), content: item.language },
    { title: t('form.mode_session'), content: item.mode_session },
  ];
  const orderArray = [
    { title: t('views.reservations.table.date_begin'), content: `From ${formatDate(item.begin_date)} to ${formatTime(item?.begin_hour)}`},
    { title: t('views.reservations.table.date_end'), content:`From ${formatDate(item.end_date)} to ${formatTime(item?.end_hour)}` },
    { title: t('views.reservations.table.status'), content: item.statut},
    //{ title: 'Package price', content: `${Math.floor(item?.package_price)}XAF ` },
    { title: t('views.products.add.type_of_event'), content: item.type_event?.type_event },
    { title: t('views.packages.add.monthly_subscription'), content: `${Math.floor(item?.price_month)}XAF ` },
    { title: t('views.packages.add.dayly_subscription'), content: `${Math.floor(item?.price_day)}XAF` },
    { title: t('views.packages.add.hourly_subscription'), content: `${Math.floor(item?.price_hour)}XAF`  },
    { title: t('views.reservations.table.date_created'), content: `${formatDate(item.created_at)}`  },
  ];
  const suggestions = (!customersDetails && !incomeDetail) && [
    { title: `${t('views.packages.add.title_package')}:`, content: item?.packages[0]?.package_name},
    //{ title: 'Package Des:', content: item.package?.package_name},
    { title: `${t('views.packages.add.price_subscription')}:`, content: ` ${Math.floor(item?.packages[0]?.package_price)}XAF`},
  ];
  const incomeArray = incomeDetail && [
    { title: t('views.reservations.number_reservation'), content: item.order_number[0]?.order_number},
    { title: t('views.invoice.number_income'), content: item.invoice_number},
    { title: t('views.invoice.amount_income'), content: `${Math.floor(item.invoice_amount)}XAF `},
    { title: t('views.invoice.date_income'), content: ` ${formatDate(item.invoice_date, 'GET')}`},
    { title: t('views.invoice.method_income'), content: item.payment_method},
    { title: t('views.invoice.type_income'), content: item.payment_type},
    { title: t('views.invoice.statut_paiement'), content: item.payment_statut},
  ];
 
  const parameters = customersDetails ? customerArray : (incomeDetail ? incomeArray : orderArray)

  /*const handleClick = () => {
    // Exécute une fonction en fonction des conditions
    if (incomeDetail) {
      onDeleteInvoice(); // Si incomeDetail est vrai, appelle onDeleteInvoice
    } else if (customersDetails) {
      onDeleteCust(); // Si customersDetails est vrai, appelle onDeleteCust
    } else if (!customersDetails && !incomeDetail) {
      onDeleteOrder(); // Si ni customersDetails ni incomeDetail ne sont vrais, appelle onDeleteOrder
    }

    // Après l'exécution de la fonction, vérifie si detailRef existe et effectue l'action
    if (detailRef?.current) {
      detailRef.current.click();
    }
  };*/

  return (
    <>
      <div className={styles.details}>
        <div className={cn("title-purple", styles.title)}>{customersDetails ? t('views.customers.detail_customer') : (incomeDetail ? t('views.invoice.detail_income') : t('views.reservations.detail_reservation'))}</div>
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
                <button className={cn("button-stroke", styles.button)} onClick={onClose} ref={detailRef}>
                  {t('words.cancel')}
                </button>
                {/*<button className={cn("button", styles.button)} onClick={handleClick}>
                  {t('words.deleted')}
                </button>*/}
              </div>
            }
          </div>
          {(!customersDetails && !incomeDetail) &&
            <div className={styles.col}>
              <div className={styles.group}>
                <div className={styles.box}>
                  <div className={styles.info}>{t('form.category_package')}</div>
                  <ul className={styles.list}>
                      <li >{item.packages[0]?.category_name}</li>
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
                <div className={styles.box}>
                  <div className={styles.info}>{t('views.customers.customer')}</div>
                  <div className={styles.user} style={{textTransform: 'capitalize'}}>
                    <Avatar user={{username: item.user.full_name !== '' ? item.user.full_name : item.user.email, photo: item.user?.photo_user}} classname={styles.avatar}  width='32px'  height='32px'/>
                    {item.user.full_name !== '' ? item.user.full_name : item.user.email}
                  </div>
                  <div className={styles.text}>
                    <div className={styles.textTel}>
                      <Icon name="phone" size="24" />
                      {item.user?.phone_number}
                    </div>
                    <div>
                      <Icon name="mail" size="24" />
                      {item.user?.email}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.btns}>
                <button className={cn("button-stroke", styles.button)} onClick={onClose} ref={detailRef}>
                  {t('words.cancel')}
                </button>
                {/*<button className={cn("button", styles.button)} onClick={handleClick}>
                  {t('words.deleted')}
                </button>*/}
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
