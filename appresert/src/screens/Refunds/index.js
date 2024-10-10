import React, { useCallback, useState } from "react";
import cn from "classnames";
import styles from "./Refunds.module.sass";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import Row from "./Row";

// data
//import { refunds } from "../../mocks/refunds";
import Overview from "../Earning/Overview";
import Dropdown from "../../components/Dropdown";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import RequestDashboard from "../../Services/Api/ApiServices";
//import { Link } from "react-router-dom";
//import { Routes } from "../../Constants";

const intervals = ["Sort by: All", "Sort by: in progress", "Sort by: new request", "Sort by: A-Z"];

const Refunds = () => {
  const {t} = useTranslation()
  const users = useSelector((state) => state.users);

  //const [activeIndex, setActiveIndex] = useState(0);
  const [loader, setLoader] = useState(false);
  const [incomes, setIncomes] = useState([]);
  const [sorting, setSorting] = React.useState(intervals[0]);

  const getAllInvoices = useCallback(async() => {
    setLoader(true)
    let res = await RequestDashboard('gestreserv/invoices/', 'GET', '', users.access_token);
    if (res.status === 200) {
      //setIncomes(res.response.results);

        // Créer un tableau de promesses pour récupérer les détails des commandes
        const ordersPromises = res.response.results.map(async (invoice) => {
          const orderId = invoice.order;
          
          // Requête pour chaque commande via son orderId
          return RequestDashboard(`gestreserv/orders/${orderId}/`, 'GET', '', users.access_token)
            .then(orderRes => {
                if (orderRes.status === 200) {
                  // Extraire uniquement l'utilisateur et le package
                  const { user, package: packageDetails } = orderRes.response;

                  return { ...invoice, orderDetails: { user, package: packageDetails  } };

                } else {
                    // Si la commande n'est pas trouvée ou renvoie une erreur
                    return { ...invoice, orderDetails: null };
                }
            })
            .catch(() => {
                // En cas d'échec, on renvoie l'élément sans les détails
                return { ...invoice, orderDetails: null };
            });
        });
      // Utiliser Promise.allSettled pour attendre la résolution de toutes les promesses
      const results = await Promise.allSettled(ordersPromises);

      // Récupérer uniquement les résultats réussis ou avec les détails manquants (gestion d'erreur)
      const invoicesWithOrders = results.map(result => result.value);
        
      // Mettre à jour le state avec les factures enrichies
      setIncomes(invoicesWithOrders);

      setLoader(false)
    }
  }, [users.access_token]);

  
  const deleteInvoiceById = async(id) => {
    let res = await RequestDashboard(`gestreserv/invoices/${id}`, 'DELETE', '', users.access_token);
    if (res.status === 204) {
      getAllInvoices()
    }
  };
  
  React.useEffect(() => {
    getAllInvoices()
  }, [getAllInvoices])


  return (
    <>
      <Overview className={styles.card} />
      <Card  className={cn(styles.card, styles.cardMag)}  classCardHead={styles.head} title={t('views.invoice.list_income')} classTitle={cn("title-purple", styles.title)}
        head={
          <div className={styles.sorting}>
            <Dropdown className={styles.dropdown}  classDropdownHead={styles.dropdownHead} value={sorting} setValue={setSorting} options={intervals} small/>
          </div>
        }
      >
        <div className={styles.wrapper}>
          <div className={styles.table}>
            <div className={styles.row}>
              <div className={styles.col}>{t('views.packages.packages')}</div>
              <div className={styles.col}>{t('views.reservations.table.status')}</div>
              <div className={styles.col}>Date</div>
              <div className={styles.col}>{t('views.customers.customer')}</div>
              <div className={styles.col}>{t('views.reservations.table.pricing')}</div>
              <div className={styles.col}>Actions</div>
            </div>
            {loader ? 
              <Loader/> :
              incomes?.length > 0 ?
                incomes.map((x, index) => (
                  <Row item={x} key={index} onDeleteInvoice={() => deleteInvoiceById(x.id)}/>
                ))
              :
                <h4>No content</h4>
            }
          </div>
        </div>
        {/*<div className={styles.foot}>
          <button className={cn("button-stroke button-small", styles.button)}>
            <Loader className={styles.loader} />
            <span>Load more</span>
          </button>
        </div>*/}
      </Card>
    </>
  );
};

export default Refunds;
