import React, { useCallback, useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Released.module.sass";
import Card from "../../components/Card";
import Form from "../../components/Form";
//import Icon from "../../components/Icon";
//import Market from "./Market";
import Product from "../../components/Product";
import Loader from "../../components/Loader";
import Panel from "./Panel";

// data
//import { products } from "../../mocks/products";
import { Link } from "react-router-dom";
//import Dropdown from "../../components/Dropdown";
import { Routes } from "../../Constants";
import { useSelector } from "react-redux";
import RequestDashboard from "../../Services/Api/ApiServices";
import { useTranslation } from "react-i18next";

//const sorting = ["list", "grid"];
//const navDropdown = ["Sort by", "Category", "A-Z", "Z-A"];

const Released = () => {
  //const [activeIndex, setActiveIndex] = useState(0);
  const {t} =useTranslation()
  const users = useSelector((state) => state.users);
  //const [activeTab, setActiveTab] = useState(navDropdown[0]);
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    alert();
  };

  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  const getAllPackages = useCallback(async() => {
    setLoading(true)
      let res = await RequestDashboard(`gestreserv/packages/`, 'GET', '', users.access_token);
      if (res.status === 200) {
        setPackages(res.response?.results);
        setLoading(false)
      }
  }, [users.access_token])

  useEffect(() => {
    getAllPackages();
  }, [getAllPackages]);

  return (
    <>
      <Card className={styles.card} classCardHead={styles.head} title={t("views.packages.packages")} classTitle={cn("title-purple", styles.title)}
        head={
          <>
            <Form className={styles.form} value={search} setValue={setSearch}  onSubmit={() => handleSubmit()} placeholder={t("views.packages.search_package")}  type="text" name="search" icon="search"/>
            <div className={styles.sorting}>
              {/*{sorting.map((x, index) => (
                <button className={cn(styles.link, {  [styles.active]: index === activeIndex, })}  onClick={() => setActiveIndex(index)} key={index}>
                  <Icon name={x} size="24" />
                </button>
              ))}
              <Dropdown classDropdownHead={styles.dropdownHead} value={activeTab} setValue={setActiveTab} options={navDropdown} small />*/}
              {!users.users.is_customer &&
                <Link className={cn("button button-small", styles.button)} to={Routes.PACKAGES_ADD} >
                  {t("views.packages.add_package")} 
                </Link>
              }
            </div>
          </>
        }
      >
        <div className={styles.wrapper}>
          {/*{activeIndex === 0 && <Market />}
          {activeIndex === 0 && (*/}
          {loading ? 
            <Loader/> :
            <>
              <div className={styles.list}>
                {packages?.map((x, index) => (
                  <Product getAllPackages={getAllPackages} className={styles.product} value={selectedFilters?.includes(x.id)} isPackage={true} onChange={() => handleChange(x.id)} item={x}  key={x.id} modalDetail={true} isPreviewHidden = {true}/>
                ))}
              </div>
              {/*<div className={styles.foot}>
                <button  className={cn("button-stroke button-small", styles.button)} >
                  <Loader className={styles.loader} />
                  <span>Load more</span>
                </button>
              </div>*/}
            </>
            }
          {/*)}*/}
        </div>
      </Card>
      <Panel />
    </>
  );
};

export default Released;
