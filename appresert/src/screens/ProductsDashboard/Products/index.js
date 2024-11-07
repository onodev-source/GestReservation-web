import React, { useState } from "react";
import styles from "./Products.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import Form from "../../../components/Form";
import Dropdown from "../../../components/Dropdown";
import Market from "./Market";
import Table from "./Table";

// data
//import { traffic } from "../../../mocks/traffic";
//import { viewers } from "../../../mocks/viewers";
//import { market } from "../../../mocks/market";
import { Link } from "react-router-dom";
import { Routes } from "../../../Constants";
//import RequestDashboard from "../../../Services/Api/ApiServices";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getAllProduct } from "../../../Utils/LikeComment";
import Loader from "../../../components/Loader";

/*const indicatorsTraffic = [
  {
    title: "Market",
    color: "#FFBC99",
  },
  {
    title: "Social media",
    color: "#CABDFF",
  },
  {
    title: "Direct",
    color: "#B5E4CA",
  },
  {
    title: "UI8",
    color: "#B1E5FC",
  },
  {
    title: "Others",
    color: "#FFD88D",
  },
];

const indicatorsViewers = [
  {
    title: "Followers",
    color: "#B5E4CA",
  },
  {
    title: "Others",
    color: "#CABDFF",
  },
];*/

const Products = () => {
  const {t} = useTranslation()
  const users = useSelector((state) => state.users);

  const navDropdown = [t('words.filter'), t("views.products.add.category"), t('words.active')];

  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState(navDropdown[0]);
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);

  const handleSubmit = (e) => {
    alert();
  };
  
  // Charger toutes les produits au montage du composant
  React.useEffect(() => {
    getAllProduct(setLoader, users, setProducts)
  }, [users])
  

  // Filtrer les produits en fonction des éléments de navDropdown
  React.useEffect(() => {
    if (navDropdown?.indexOf(activeTab) === 1) {
      // Filtrage pour inclure tous les produits et affiche par categorie
      setLoading(true)
      const groupedCategory = products.reduce((acc, product) => {
        const category = product.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(product);
        return acc;
      }, {});
      setFilterProducts(groupedCategory);
      setLoading(false)
      
    } else if (navDropdown?.indexOf(activeTab) === 2) {
      // Filtrage pour inclure tous les produits et affiche de celle qui sont actif
      const filtered = products?.filter((product) => product.is_active)
      setFilterProducts(filtered);
    }
     else {  
      setFilterProducts(products);
    }
  }, [products, activeTab]);

  return (
    <Card className={styles.card}  title={t('views.products.products')} classTitle={cn("title-purple", styles.title)}  classCardHead={styles.head}
      head={
        <>
          <Form className={styles.form}  value={search}  setValue={setSearch} onSubmit={() => handleSubmit()} placeholder={t('views.products.search_product')} type="text"  name="search" icon="search"/>
          <div className={styles.control}>
            <button className={cn("button-stroke button-small", styles.button)}>
              Deleted
            </button>
            <button className={cn("button-stroke button-small", styles.button)}>
              Set status
            </button>
            <div className={styles.counter}>3 selected</div>
          </div>
            <div className={styles.sorting}>
              {/*{sorting.map((x, index) => (
                <button className={cn(styles.link, {  [styles.active]: index === activeIndex, })}  onClick={() => setActiveIndex(index)} key={index}>
                  <Icon name={x} size="24" />
                </button>
              ))}*/}
              <Dropdown classDropdownHead={styles.dropdownHead} value={activeTab} setValue={setActiveTab} options={navDropdown} small />
              {!users.users.is_customer &&
                <Link className={cn("button button-small", styles.button)} to={Routes.PRODUITS_ADD} >
                  {t('views.products.add_product')}
                </Link>
              }
            </div>
        </>
      }
    >
      <div className={styles.products}>
        <div className={styles.wrapper}>
          {(activeTab === navDropdown[0] || activeTab === navDropdown[2]) && <Market items={activeTab === navDropdown[0] ? products : (activeTab === navDropdown[2] && filterProducts)} loader={loader} setLoader={setLoader} setProducts={activeTab === navDropdown[0] ? setProducts : (activeTab === navDropdown[2] && setFilterProducts)}/>}
          {activeTab === navDropdown[1] && (
            loading ? <Loader/> :
              <Table title={t('words.categories')}
                items={filterProducts} itemsProducts={products} setLoader={setLoading} setFilterProducts={setFilterProducts}/>
          )}
          {/*activeTab === navDropdown[2] && (
            <Table title="Viewers" items={viewers} legend={indicatorsViewers} />
          )*/}
        </div>
      </div>
    </Card>
  );
};

export default Products;
