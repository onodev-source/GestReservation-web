import React, { useState } from "react";
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
import { products } from "../../mocks/products";
import { Link } from "react-router-dom";
import Dropdown from "../../components/Dropdown";

//const sorting = ["list", "grid"];
const navDropdown = ["Sort by", "Category", "A-Z", "Z-A"];

const Released = () => {
  //const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(navDropdown[0]);
  const [search, setSearch] = useState("");

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

  return (
    <>
      <Card className={styles.card} classCardHead={styles.head} title="Packages" classTitle={cn("title-purple", styles.title)}
        head={
          <>
            <Form className={styles.form} value={search} setValue={setSearch}  onSubmit={() => handleSubmit()} placeholder="Search package"  type="text" name="search" icon="search"/>
            <div className={styles.sorting}>
              {/*{sorting.map((x, index) => (
                <button className={cn(styles.link, {  [styles.active]: index === activeIndex, })}  onClick={() => setActiveIndex(index)} key={index}>
                  <Icon name={x} size="24" />
                </button>
              ))}*/}
              <Dropdown classDropdownHead={styles.dropdownHead} value={activeTab} setValue={setActiveTab} options={navDropdown} small />
            
              <Link className={cn("button", styles.button)} to="/packages/add" >
                Add package
              </Link>
            </div>
          </>
        }
      >
        <div className={styles.wrapper}>
          {/*{activeIndex === 0 && <Market />}
          {activeIndex === 0 && (*/}
            <>
              <div className={styles.list}>
                {products.map((x, index) => (
                  <Product  className={styles.product} value={selectedFilters.includes(x.id)}  onChange={() => handleChange(x.id)} item={x}  key={index}/>
                ))}
              </div>
              <div className={styles.foot}>
                <button  className={cn("button-stroke button-small", styles.button)} >
                  <Loader className={styles.loader} />
                  <span>Load more</span>
                </button>
              </div>
            </>
          {/*)}*/}
        </div>
      </Card>
      <Panel />
    </>
  );
};

export default Released;
