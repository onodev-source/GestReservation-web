import React, { useState } from "react";
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
  const navDropdown = ["Sort by", "Category", "A-Z", "Z-A"];

  const [activeTab, setActiveTab] = useState(navDropdown[0]);
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState([]);

  const handleSubmit = (e) => {
    alert();
  };

  React.useEffect(() => {

    const getAllProduct =  async() => {
        let res = await RequestDashboard('admin/gestreserv/product/', 'GET', '');
        if (res.status === 200) {
          setProduct(res.data);
        }
    };
    getAllProduct()
  }, [])

  console.log('product---------', product);
  return (
    <Card className={styles.card}  title="Products" classTitle={cn("title-purple", styles.title)}  classCardHead={styles.head}
      head={
        <>
          <Form className={styles.form}  value={search}  setValue={setSearch} onSubmit={() => handleSubmit()} placeholder="Search product" type="text"  name="search" icon="search"/>
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
            
              <Link className={cn("button button-small", styles.button)} to={Routes.PRODUITS_ADD} >
                Add product
              </Link>
            </div>
        </>
      }
    >
      <div className={styles.products}>
        <div className={styles.wrapper}>
          {activeTab === navDropdown[0] && <Market items={market} />}
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
