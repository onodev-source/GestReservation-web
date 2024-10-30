import React, { useCallback, useEffect, useState } from "react";
import cn from "classnames";
import styles from "./ProTips.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import ModalPreview from "../../../components/ModalPreview";
import { useTranslation } from "react-i18next";
import RequestDashboard from "../../../Services/Api/ApiServices";
import { useSelector } from "react-redux";
import NoContent from "../../../components/NoContent";
import { formatTime } from "../../../Utils/formatTime";
import Details from "../../Refunds/Row/Details/index.js";
import Modal from "../../../components/Modal";
import Loader from "../../../components/Loader/index.js";
import { getAllReservations } from "../../../Utils/LikeComment.js";

/*const tips = [
  {
    title: "Early access",
    icon: "schedule",
    statusColor: "purple",
    statusText: "New",
    avatar: "/images/content/avatar.jpg",
    action: "3 mins read",
  },
  {
    title: "Asset use guidelines",
    icon: "arrow-right",
    statusColor: "green",
    statusText: "Small label",
    avatar: "/images/content/avatar.jpg",
    action: "Time",
  },
  {
    title: "Exclusive downloads",
    icon: "design",
    avatar: "/images/content/avatar-1.jpg",
    action: "2 mins read",
  },
  {
    title: "Behind the scenes",
    icon: "video-recorder",
    statusColor: "red",
    statusText: "Hot",
    avatar: "/images/content/avatar-2.jpg",
    action: "3 mins read",
  },
  {
    title: "Asset use guidelines",
    icon: "phone",
    statusColor: "green",
    statusText: "Popular",
    avatar: "/images/content/avatar-3.jpg",
    action: "Time",
  },
  {
    title: "Life & work updates",
    icon: "multiselect",
    avatar: "/images/content/avatar-4.jpg",
    action: "3 mins read",
  },
];*/

const ProTips = ({ className, loader, orders }) => {
  const {t} = useTranslation()
  /*const users = useSelector((state) => state.users)
  const [orders, setOrders] = useState([]);
  const [loader, setLoading] = useState(false);*/
  const [visibleModalPreview, setVisibleModalPreview] = useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);  // État pour l'élément sélectionné

  // Fonction pour ouvrir le modal avec l'élément sélectionné
  const handleShowDetails = (order) => {
    setSelectedOrder(order);  // On met à jour l'élément sélectionné
    setVisibleModalPreview(true);    // On rend le modal visible
  };


  return (
    <>
      <Card className={cn(styles.card, className)} title={t("views.home.last_reservations")} classTitle="title-green">
        <div className={styles.tips}>
          <div className={styles.info}>
            {t('views.reservations.last_six_reservation')}
          </div>
          <div className={styles.list}>
            {loader ? <Loader/> :
              orders?.length > 0 ?
                orders.slice(0, 6).map((x, index) => (
                  <React.Fragment key={x.order_number}>
                    <div className={styles.item}  key={x.order_number} onClick={() => handleShowDetails(x)}>
                      <div className={cn(styles.icon, {'status-green': x.statut === "COMPLETED", [styles.iconColor]: x.statut === "COMPLETED"})}>
                        <Icon name='schedule' size="24" />
                      </div>
                      <div className={styles.details}>
                        <div className={styles.title}>{t('views.reservations.reserved_lots')} : {x.packages[0]?.package_name.length >= 20 ? `${x.packages[0]?.package_name.slice(0, 17)}...` : x.packages[0]?.package_name}</div>
                        <div className={styles.line}>
                          {x.statut && (
                            <div  className={cn(
                                { "status-yellow": x.statut === "PENDING" },
                                { "status-green-dark": x.statut === "COMPLETED" },
                                { "status-red-dark": x.statut === "FAILED" },
                                styles.status
                              )}>
                              {x.statut}
                            </div>
                          )}
                          <div className={styles.user}>
                            <div className={cn(styles.avatar, styles.avatarFlex)}>
                              {x.user?.photo_user ? 
                                <img src={x.user?.photo_user} alt="Avatar" />
                                : 
                                <span>{x.user?.email?.slice(0, 2)}</span>
                              }
                            </div>
                            <div className={styles.action}>{formatTime(`${x.begin_date}T${x.begin_hour}`, 'GETDATEHOUR')} {t('words.to')} <br/> {formatTime(`${x.end_date}T${x.end_hour}`, 'GETDATEHOUR')}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {selectedOrder && 
                      <Modal  outerClassName={styles.outer}  visible={visibleModalPreview} onClose={() => setVisibleModalPreview(false)}  key={x.order_number}>
                        <Details item={selectedOrder} onClose={() =>  setVisibleModalPreview(false)}/> {/* Afficher les détails de l'élément sélectionné */}
                      </Modal>
                    }
                  </React.Fragment>
                ))
                : <NoContent message={""}/>
            }
          </div>
        </div>
      </Card>
      {/*<ModalPreview
        visible={visibleModalPreview}
        onClose={() => setVisibleModalPreview(false)}
        video="/images/content/video.mp4"
        title="Use guidelines"
      />*/}
    </>
  );
};

export default ProTips;
