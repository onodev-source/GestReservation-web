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


const ProTips = ({ className, loader, orders }) => {
  const {t} = useTranslation()
 
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
                orders?.slice(0, 6).map((x, index) => (
                  <React.Fragment key={x.order_number}>
                    <div className={styles.item}  key={x.order_number} onClick={() => handleShowDetails(x)}>
                      <div className={cn(styles.icon, {'status-green': x.statut === "COMPLETED", [styles.iconColor]: x.statut === "COMPLETED"})}>
                        <Icon name='schedule' size="24" />
                      </div>
                      <div className={styles.details}>
                        <div className={styles.title}>{t('views.reservations.reserved_lots')} : {x.packages_detail[0]?.package_name?.length >= 20 ? `${x.packages_detail[0]?.package_name?.slice(0, 17)}...` : x.packages_detail[0]?.package_name}</div>
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
                              {x.user_detail?.photo_user ? 
                                <img src={x.user_detail?.photo_user} alt="Avatar" />
                                : 
                                <span>{x.user_detail?.email?.slice(0, 2)}</span>
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
                : <NoContent message={""} styleSpace={{margin: '20px 0px 0px 20px',}}/>
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
