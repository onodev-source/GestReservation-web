import React, { useCallback, useState } from "react";
import styles from "./Products.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import Form from "../../../components/Form";
import Dropdown from "../../../components/Dropdown";
import Market from "./Market";
import Table from "./Table";

// data
import { traffic } from "../../../mocks/traffic";
import { viewers } from "../../../mocks/viewers";
import { market } from "../../../mocks/market";
import { Link } from "react-router-dom";
import { Routes } from "../../../Constants";
import RequestDashboard from "../../../Services/Api/ApiServices";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const indicatorsTraffic = [
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
];

const Products = () => {
  const {t} = useTranslation()
  const users = useSelector((state) => state.users);
  const navDropdown = ["Sort by", "Category", "A-Z", "Z-A"];

  const [activeTab, setActiveTab] = useState(navDropdown[0]);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false)
  const [product, setProduct] = useState([]);

  const handleSubmit = (e) => {
    alert();
  };

  const getAllProduct = useCallback(async() => {
    setLoader(true)
    let res = await RequestDashboard('gestreserv/products/', 'GET', '', users.access_token);
    if (res.status === 200) {
      setProduct(res.response.results);
      setLoader(false)
    }
  }, [users.access_token]);
  
  React.useEffect(() => {
    getAllProduct()
  }, [getAllProduct])

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
          {activeTab === navDropdown[0] && <Market items={product} loader={loader} getAllProduct={getAllProduct}/>}
          {activeTab === navDropdown[1] && (
            <Table
              title="Traffic source"
              items={traffic}
              legend={indicatorsTraffic}
            />
          )}
          {activeTab === navDropdown[2] && (
            <Table title="Viewers" items={viewers} legend={indicatorsViewers} />
          )}
        </div>
      </div>
    </Card>
  );
};

export default Products;
