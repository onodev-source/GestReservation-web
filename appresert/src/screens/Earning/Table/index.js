import React, {useEffect } from "react";
import styles from "./Table.module.sass";
import cn from "classnames";
//import { numberWithCommas } from "../../../utils.js";
import Card from "../../../components/Card/index.js";
import Form from "../../../components/Form/index.js";
import Dropdown from "../../../components/Dropdown/index.js";
import { Link } from "react-router-dom";
import Modal from "../../../components/Modal/index.js";
import Details from "../../Refunds/Row/Details/index.js";
import Actions from "../../../components/Actions/index.js";
import Routes from "../../../Constants/Routes.js";
import RequestDashboard from "../../../Services/Api/ApiServices";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader/index.js";
import { formatDate } from "../../../Utils/formatDate.js";
import { formatTime } from "../../../Utils/formatTime.js";
import { useTranslation } from "react-i18next";
import NoContent from "../../../components/NoContent/index.js";
import { getAllReservations } from "../../../Utils/LikeComment.js";

;

const Table = ({activityUser, userId}) => {
  const {t} = useTranslation()
  const users = useSelector((state) => state.users);
  const navigation = [t("words.filter"), t("words.Completed"), t("words.pending"), t("words.canceled")]

  //const [visible, setVisible] = React.useState(false);
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selectedOrder, setSelectedOrder] = React.useState(null);  // État pour l'élément sélectionné
  const [activeTab, setActiveTab] = React.useState(navigation[0]);
  const [orders, setOrders] = React.useState([]);
  const [filterOrders, setFilterOrders] = React.useState([]);


  const actions = [
    {
      id: 1,
      title: "Edit",
      icon: "edit",
      url: Routes.RESERVATION_EDIT,
    },
    {
      id: 4,
      title: "Pay",
      icon: "payment",
      action: {},
    },
    {
      id: 3,
      title: "Details",
      icon: "arrow-right",
      action: {},
    },
    {
      id: 2,
      title: "Delete",
      icon: "trash",
      action: {},
    }
  ];

  const filteredActions = users.users.is_customer ? actions.filter(item => item.id !== 4)  : actions;

  const handleSubmit = (e) => {
    alert();
  };

  // Fonction pour ouvrir le modal avec l'élément sélectionné
  const handleShowDetails = (order) => {
    setSelectedOrder(order);  // On met à jour l'élément sélectionné
    setVisibleModal(true);    // On rend le modal visible
  };

  const deleteReservationById = async(id) => {
    let res = await RequestDashboard(`gestreserv/orders/${id}/`, 'DELETE', '', users.access_token);
    if (res.status === 204) {
      getAllReservations({setLoading: setLoading, activityUser: activityUser, userId: userId, users: users, setOrders: setOrders})
    }
  }

  const PayReservation = async(order) => {
    
    let data = {
      order_ids: [order.id],
      order_event: order.type_event?.type_event,
      invoice_amount: order.packages_detail[0]?.package_price,
      payment_method: 'CASH',
      payment_statut: "PENDING",
      payment_type: 'FULL',
    };

    let res = await RequestDashboard('gestreserv/invoices/', 'POST', data, users.access_token)

    if(res.status === 201) {
      let resp = await RequestDashboard(`gestreserv/invoices/${res.response?.id}/update_status/`, 'PUT', data, users.access_token)
      if (resp.status === 200) {
        getAllReservations({setLoading: setLoading, activityUser: activityUser, userId: userId, users: users, setOrders: setOrders})
      }
      /*setLoader(false)
      setForm({ ...form, price_hour: '', price_day: '', price_month: '', nb_persons: '' });
      setErrorSubmit(`The reservation has been successfully ${editOrder ? 'updated' : 'created'}`); */
    } else {
     /* setLoader(false)
      setErrorSubmit("An error has occurred please try again"); */
    }
  }

  useEffect(() => {
    getAllReservations({setLoading: setLoading, activityUser: activityUser, userId: userId, users: users, setOrders: setOrders})
  }, [users, activityUser, userId]);
 

  // Filtrer les reservations en fonction des éléments de navigation
  React.useEffect(() => {
    if (navigation?.indexOf(activeTab) === 1) {
      // Filtrage pour inclure toutes les reservations et affiche par status complet
      const filtered = orders?.filter((order) => order.statut === "COMPLETED")  
      setFilterOrders(filtered);
      
    } else if (navigation?.indexOf(activeTab) === 2) {
      // Filtrage pour inclure toutes les reservations  et affiche par status pending
      const filtered = orders?.filter((order) => order.statut === "PENDING")
      setFilterOrders(filtered);
    } else if (navigation?.indexOf(activeTab) === 3) {
      // Filtrage pour inclure toutes les reservations  et affiche par status cancel
      const filtered = orders?.filter((order) => order.statut === "CANCELED")
      setFilterOrders(filtered);
    }
     else {  
      setFilterOrders(orders);
    }
  }, [orders, activeTab]);


  return (
    <div className={cn(styles.wrapper, {[styles.wrapperNone] : activityUser})}>
      <Card className={cn(styles.card, {[styles.wrapperNone] : activityUser})} title={!activityUser && t('views.reservations.reservations_list')} classTitle={cn("title-red", styles.cardTitle)} classCardHead={cn(styles.head)}
      head={ !activityUser &&
        <>
          <Form className={styles.form} value={search}
            setValue={setSearch} onSubmit={() => handleSubmit()} placeholder={t('views.reservations.search_by_date_and_price')} type="text"
            name="search" icon="search"
          />
          <div className={styles.sorting}>
            <Dropdown classDropdownHead={styles.dropdownHead} value={activeTab} setValue={setActiveTab} options={navigation} small />
            <Link className={cn("button button-small", styles.button)} to={Routes.RESERVATION_ADD} >
            {t('views.reservations.add_reservation')}
            </Link>
          </div>
        </>
      }>
      </Card>
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.col}>{t('views.reservations.table.date_begin')}</div>
          <div className={styles.col}>{t('views.reservations.table.date_end')}</div>
          <div className={styles.col}>{t('views.reservations.table.status')}</div>
          <div className={styles.col}>{t('views.reservations.table.package')}</div>
          <div className={styles.col}>{t('form.nber_people')}</div>
          <div className={styles.col}>{t('views.reservations.table.pricing')}</div>
          <div className={styles.col}>Actions</div>
        </div>
        {loading ?
          <Loader/> : (
            (navigation?.indexOf(activeTab) !== 0 ? filterOrders : orders).length > 0 ? (
              (navigation?.indexOf(activeTab) !== 0 ? filterOrders : orders)?.map((x, index) => (
                <React.Fragment key={x.order_number}>
                  <div className={styles.row} key={x.order_number}>
                    <div className={styles.col}>{t('words.from')} {formatDate(x.begin_date)} <br/> {t('words.to_s')} {formatTime(x.begin_hour)} </div>
                    <div className={styles.col}>{t('words.to')} {formatDate(x.end_date)} <br/> {t('words.at')} {formatTime(x.end_hour)}</div>
                    <div className={styles.col}>
                      {x.statut !=="PENDING" ? (
                        <div
                          className={cn(
                            { "status-green-dark": x.statut === "COMPLETED" }, { "status-red-dark": x.statut === "CANCELED" },
                            styles.status
                          )}
                        >
                          {x.statut}
                        </div>
                      ) : (
                        <div
                          className={cn(
                            { "status-yellow": x.statut === "PENDING" },
                            styles.status
                          )}
                        >
                          Pending
                        </div>
                      )}
                    </div>
                    <div className={styles.col}>{x.packages_detail[0]?.package_name}</div>
                    <div className={styles.col}>{x.nb_persons}</div>
                    <div className={styles.col}>{Math?.floor(x.packages_detail[0]?.package_price)}XAF 
                      {/*${numberWithCommas(x?.price_month?.toFixed(2))*/}
                    </div>
                    <div className={styles.col}>
                      <Actions onDetailsClick={() => handleShowDetails(x)} onPaidClick={() => PayReservation(x)} onDeleteClick={() => deleteReservationById(x.id)} className={styles.actions} classActionsHead={styles.actionsHead} classActionsBody={styles.actionsBody } classActionsOption={styles.actionsOption} items={filteredActions} orderIdSelect={x.id} order={true} key={x.order_number}/>
                    </div>
                  </div>
                  <Modal  outerClassName={styles.outer}  visible={visibleModal} onClose={() => setVisibleModal(false)}  key={x.order_number}>
                    {selectedOrder && <Details item={selectedOrder} onDeleteOrder={() => deleteReservationById(x.id)} onClose={() =>  setVisibleModal(false)}/>} {/* Afficher les détails de l'élément sélectionné */}
                  </Modal>
                </React.Fragment>
              ))
            ) : (
              <div className={styles.row} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <NoContent message={activityUser ? 'No reservations found for this user.' : ''}/>
              </div>
            )
          )
        }
      </div>
    </div>
  );
};

export default Table;
