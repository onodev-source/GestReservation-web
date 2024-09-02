import React, { useEffect, useState } from "react";
import styles from "./NewProduct.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Modal from "../../components/Modal";
import Schedule from "../../components/Schedule";
import NameAndDescription from "./NameAndDescription";
import ImagesAndCTA from "./ImagesAndCTA";
import Price from "./Price";
import CategoryAndAttibutes from "./CategoryAndAttibutes";
import ProductFiles from "./ProductFiles";
import Discussion from "./Discussion";
import Preview from "./Preview";
import Panel from "./Panel";
import RequestDashboard from "../../Services/Api/ApiServices";
import { useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";

const NewProduct = ({product, editPack, editProd}) => {
  const users = useSelector((state) => state.users);

  const [visiblePreview, setVisiblePreview] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [loader, setLoader] = useState(false)
  const [errorSubmit, setErrorSubmit] = useState('')
  const [category, setCategory] = useState('')
  const [descripbe, setDescripbe] = useState('')
  const [form, setForm] = useState({
    product_name: '',
    //product_description: '',    
    product_quantity: 0,
  });

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

  const textInputChange = (input) => {
    const target = input.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    switch (name) {
      case 'title':
        setForm({ ...form, product_name: value });
          break;
      case 'quantity':
        setForm({ ...form, product_quantity: parseInt(value) });
          break;
      default:
          break;
    }
  }
  
  const isFormFilled = () => {
    return (
      category !== '' &&
      descripbe !== '' &&
      form.product_name !== '' &&
      form.product_quantity > 0
    );
  };

  const addProduct =  async() => {
    setLoader(true)
    let data = {
      product_name: form.product_name,
      product_description: descripbe,
      product_quantity: form.product_quantity,
      category: {
        category_name: category
      },
    }
    let res =  await RequestDashboard( 'gestreserv/products/', 'POST', data, users.access_token);
    
    if (res.status === 201) {
      setErrorSubmit('The product has been successfully created')
      setLoader(false)
      setCategory('')
      setDescripbe('')
      setForm({ ...form, product_name: '', product_quantity: 0,});
    }
    else if (res.status === 400) { 
      setLoader(false)
      setForm({ ...form, email: '', tel: '', sexe: '', location: '', password: '' });
      setErrorSubmit("Incorrect Email or Password"); 
    }
    else if (res.status === 401) { 
      setLoader(false)
      setForm({ ...form, email: '', tel: '', sexe: '', location: '', password: '' });
      setErrorSubmit( "Your email address has not been verified "); 
    }
    else { 
      setLoader(false)
      setForm({ ...form, email: '', tel: '', sexe: '', location: '', password: '' });
      setErrorSubmit("An error has occurred please try again"); 
    }
  };

  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>
          {errorSubmit !== '' && (
            <ErrorMessage message={errorSubmit} onClose={() => setErrorSubmit('')}/>
          )}
          <NameAndDescription className={styles.card} product={product} onChange={textInputChange}  setDescripbe={setDescripbe}/>
         {/* <ImagesAndCTA className={styles.card} />*/}
          <Price className={styles.card} product={product} onChange={textInputChange} />
          <CategoryAndAttibutes className={styles.card} categoryAttribute={true} product={product} onChange={textInputChange} setCategoryProduct={setCategory}/>
          <CategoryAndAttibutes className={styles.card} product={product} onChange={textInputChange} setCategoryProduct={setCategory}/>
          {/*<ProductFiles className={styles.card} />*/}
          {/*<Discussion className={styles.card} />*/}
        </div>
        <div className={styles.col}>
          <ProductFiles className={styles.card} product={product} onChange={textInputChange}/>
          {/*<Preview
            visible={visiblePreview}
            onClose={() => setVisiblePreview(false)}
          />*/}
        </div>
      </div>
      <Panel onClick={addProduct} isFormFilled={isFormFilled} loader={loader} setVisiblePreview={setVisiblePreview} setVisibleSchedule={setVisibleModal} product={product} editPack={editPack}/>
      <TooltipGlodal />
      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <Schedule  startDate={startDate}  setStartDate={setStartDate} startTime={startTime} setStartTime={setStartTime}/>
      </Modal>
    </>
  );
};

export default NewProduct;
