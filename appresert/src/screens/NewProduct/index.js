import React, { useCallback, useEffect, useState } from "react";
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
import { useParams } from "react-router";
import Loader from "../../components/Loader";

const NewProduct = ({product, editPack, editProd}) => {
  const { productId } = useParams();
  const users = useSelector((state) => state.users);

  const [visiblePreview, setVisiblePreview] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [loader, setLoader] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorSubmit, setErrorSubmit] = useState('')
  const [allProduct, setAllProduct] = useState()
  const [productEdit, setProductEdit] = useState()
  const [category, setCategory] = useState('')
  const [descripbe, setDescripbe] = useState('')
  const [form, setForm] = useState({
    product_name: '',
    //product_description: '',    
    product_quantity: 0,
    package_name: '',
    package_price: '',
    nb_persons: 0,
    nb_places: 0,
  });

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

  const textInputChange = (input) => {
    const target = input.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    switch (name) {
      case 'title':
        setForm({ ...form, [product ? 'product_name' : 'package_name']: value });
          break;
      case 'quantity':
        setForm({ ...form, product_quantity: parseInt(value) });
          break;
      case 'dayly-amount':
        setForm({ ...form, package_price: value });
          break;
      case 'nb_persons':
        setForm({ ...form, nb_persons: parseInt(value) });
          break;
      case 'nb_places':
        setForm({ ...form, nb_places: parseInt(value) });
          break;
      default:
          break;
    }
  }
  
  const getAllProduct = useCallback(async() => {
    //setLoader(true)
    let res = await RequestDashboard('gestreserv/products/', 'GET', '', users.access_token);
    if (res.status === 200) {
      setAllProduct(res.response?.results);
      //setLoader(false)
    }
  }, [users.access_token]);

  const isFormFilled = () => {
      if (product) {
        return (
          category !== '' &&
          descripbe !== '' &&
          form.product_name !== '' &&
          form.product_quantity > 0
        )
      } else {
        return (
          category !== '' &&
          form.package_name !== '' &&
          form.package_price !== '' &&
          form.nb_persons > 0 &&
          form.nb_places > 0
        )
      }
  };

  const addorEditProduct =  async() => {
    setLoader(true)
    let data = {
      product_name: form.product_name,
      product_description: descripbe,
      product_quantity: form.product_quantity,
      category: {
        category_name: category
      },
    }
    let res = editProd ? await RequestDashboard(`gestreserv/products/${productId}/`, 'PUT', data, users.access_token) : await RequestDashboard( 'gestreserv/products/', 'POST', data, users.access_token);
    let status = editProd ? 200 : 201
    if (res.status === status) {
      setErrorSubmit(`The product has been successfully ${editProd ? 'updated' : 'created'}`)
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

  const addorEditPackage =  async() => {
    setLoader(true)
    let data = {
      package_name: form.package_name,
      package_price: form.package_price,
      nb_persons: form.nb_persons,
      nb_places: form.nb_places,
      category: {
        category_name: category
      },
    }
    let res = editPack ? await RequestDashboard(`gestreserv/packages/${productId}/`, 'PUT', data, users.access_token) : await RequestDashboard( 'gestreserv/packages/', 'POST', data, users.access_token);
    let status = editPack ? 200 : 201
    if (res.status === status) {
      setErrorSubmit(`The package has been successfully ${editPack ? 'updated' : 'created'}`)
      setLoader(false)
      setCategory('')
      //setDescripbe('')
      setForm({ ...form, package_name: '', package_price: '', nb_persons: 0, nb_places: 0,});
    }
    else if (res.status === 400) { 
      setLoader(false)
      setForm({ ...form, package_name: '', package_price: '', nb_persons: 0, nb_places: 0,});
      setErrorSubmit("Incorrect Email or Password"); 
    }
    else if (res.status === 401) { 
      setLoader(false)
      setForm({ ...form, package_name: '', package_price: '', nb_persons: 0, nb_places: 0,});
      setErrorSubmit( "Your email address has not been verified "); 
    }
    else { 
      setLoader(false)
      setForm({ ...form, package_name: '', package_price: '', nb_persons: 0, nb_places: 0,});
      setErrorSubmit("An error has occurred please try again"); 
    }
  };

  useEffect(() => {
    if (editProd && productId) {
      const getProductById = async(id) => {
        setLoading(true)
          let res = await RequestDashboard(`gestreserv/products/${id}/`, 'GET', '', users.access_token);
          if (res.status === 200) {
            setProductEdit(res.response);
            setLoading(false)
          }
      }
      getProductById(productId);
    }
  }, [productId, editProd, users.access_token]);

  useEffect(() => {
    if (productEdit) {
      setForm({
        product_name: productEdit.product_name,
        product_quantity: productEdit.product_quantity,
      });
      setCategory(productEdit?.category?.category_name || '');
      setDescripbe(productEdit?.product_description || '');
    }
  }, [productEdit]);
  
  React.useEffect(() => {
    getAllProduct()
  }, [getAllProduct])
  
  return (
    <>
      {loading ? (
        <Loader/>
      ) : (
        <>
          <div className={styles.row}>
            <div className={styles.col}>
              <NameAndDescription className={styles.card} product={product} onChange={textInputChange} setDescripbe={setDescripbe}  formAdd={{form, descripbe}}/>
            {/* <ImagesAndCTA className={styles.card} />*/}
              <Price className={styles.card} product={product} onChange={textInputChange} formAdd={form}/>
              <CategoryAndAttibutes className={styles.card} categoryAttribute={true} product={product} onChange={textInputChange} setCategoryProduct={setCategory} editProd formAdd={productEdit?.category}/>
              <CategoryAndAttibutes className={styles.card} product={product} onChange={textInputChange} setCategoryProduct={setCategory} editProd formAdd={productEdit?.category}/>
              {/*<ProductFiles className={styles.card} />*/}
              {/*<Discussion className={styles.card} />*/}

              {errorSubmit !== '' && (
                <ErrorMessage message={errorSubmit} onClose={() => setErrorSubmit('')}/>
              )}
            </div>
            <div className={styles.col}>
              <ProductFiles className={styles.card} product={product} onChange={textInputChange} allProduct={allProduct}/>
              {/*<Preview
                visible={visiblePreview}
                onClose={() => setVisiblePreview(false)}
              />*/}
            </div>
          </div>
        </>
      )}
      <Panel onClick={!product ? addorEditPackage : addorEditProduct} isFormFilled={isFormFilled} loader={loader} setVisiblePreview={setVisiblePreview} setVisibleSchedule={setVisibleModal} product={product} editPack={editPack}/>
      <TooltipGlodal />
      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <Schedule  startDate={startDate}  setStartDate={setStartDate} startTime={startTime} setStartTime={setStartTime}/>
      </Modal>
    </>
  );
};

export default NewProduct;
