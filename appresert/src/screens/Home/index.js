import React, { useCallback, useState } from "react";
import styles from "./Home.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Overview from "./Overview";
import PopularProducts from "../../components/PopularProducts";
import Comments from "./Comments";
import ProTips from "./ProTips";
import ProductViews from "./ProductViews";
import { useSelector } from "react-redux";
import RequestDashboard from "../../Services/Api/ApiServices";
import { getAllReservations } from "../../Utils/LikeComment";

const Home = () => {
  const users = useSelector((state) => state.users);

  const [loader, setLoader] = useState(false)
  const [homeData, setHomeData] = useState()
  const [popularProducts, setPopularProducts] = useState([])
  //const [lastUsersOnline, setLastUsersOnline] = useState([])
  const [orders, setOrders] = useState([])

  
  const getAllHomeData = useCallback(async() => {
    setLoader(true)
    let res = await RequestDashboard('gestreserv/dashboard/detailed/', 'GET', '', users.access_token);
    if (res.status === 200) {
      setHomeData(res.response.data);

      // Créer un tableau de promesses pour récupérer les détails des produits
      const productsPromises = res.response.data.popular_products.map(async (product) => {
        const productId = product?.id;
        
        // Requête pour chaque commande via son orderId
        return RequestDashboard(`gestreserv/products/${productId}/`, 'GET', '', users.access_token)
          .then(productRes => {
              if (productRes.status === 200) {
                // ajouter les informations du package dans l'attribut details

                return { ...product, details: productRes.response };

              } else {
                  // Si le produit n'est pas trouvée ou renvoie une erreur
                  return { ...product, details: null };
              }
          })
          .catch(() => {
              // En cas d'échec, on renvoie l'élément sans les détails
              return { ...product, details: null };
          });
      });
      // Utiliser Promise.allSettled pour attendre la résolution de toutes les promesses
      const results = await Promise.allSettled(productsPromises);

      // Récupérer uniquement les résultats réussis ou avec les détails manquants (gestion d'erreur)
      const products = results?.map(result => result.value);
        
      // Mettre à jour le state avec le details des produits enrichies
      setPopularProducts(products);
      setLoader(false)
    }
  }, [users.access_token]);

 /* const getDetailsLastUsersOnline = useCallback(async() => {


    // Récupérer les détails des utilisateurs de manière asynchrone
    const usersPromises = homeData?.latest_online_users?.map(async (user) => {
      const userId = user?.id;
      console.log('user appekl', user);
      
      // Récupérer les détails de chaque utilisateur (endpoint correct)
      
        try {
          const userRes = await RequestDashboard(`accounts/api/v1/gestreserv/users/profile/${userId}/`, 'GET', '', users.access_token);
          if (userRes.status === 200) {
            console.log('appel sest bien passee', userRes.response);
            return { ...user, details: userRes.response };
          } else {
            console.log('ERORRRRRRRRRRRRR', userRes.response);
            return { ...user, details: null };
          }
        } catch (error) {
          console.log('Castchhhhhhhhhhhhhhhhhh');
          return { ...user, details: null };
        }
    });

    // Attendre la résolution de toutes les promesses pour les utilisateurs
    const usersResults = await Promise.allSettled(usersPromises);
    const users = usersResults?.map(result => result.value);

    // Mettre à jour l'état avec les utilisateurs enrichis
    setLastUsersOnline(users);
  }, [users.access_token])*/
  
  React.useEffect(() => {
    getAllHomeData();
    //getDetailsLastUsersOnline();
    getAllReservations({setLoading: setLoader, users: users, setOrders:setOrders})
  
  }, [getAllHomeData, users])

     

//console.log('lastUsersOnline', lastUsersOnline);

  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>
          <Overview className={styles.card} homeData={homeData}/>
          <ProductViews className={styles.card} loader={loader} orders={homeData?.reservations_summary}/>
          <ProTips className={styles.card} loader={loader} orders={orders}/>
          {/*<MoreCustomers />*/}
        </div>
        <div className={styles.col}>
          <PopularProducts className={styles.card} views="4" popularProducts={popularProducts}/>
          <Comments className={styles.card} />
          {/*<RefundRequests title="Refund requests" classTitle="title-red" />*/}
        </div>
      </div>
      <TooltipGlodal />
    </>
  );
};

export default Home;
