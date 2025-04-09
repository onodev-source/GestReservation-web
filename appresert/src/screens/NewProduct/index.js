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
  const { packageId } = useParams();
  const users = useSelector((state) => state.users);

  const [visiblePreview, setVisiblePreview] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [loader, setLoader] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorSubmit, setErrorSubmit] = useState('')
  const [allProduct, setAllProduct] = useState()
  const [productEdit, setProductEdit] = useState()
  const [packageEdit, setPackageEdit] = useState()
  const [category, setCategory] = useState('')
  const [descripbe, setDescripbe] = useState('')
  const [caracteristics, setCaracteristics] = useState('')
  const [media, setMedia] = useState()
  const [productIds, setProductIds] = useState([])
  const [form, setForm] = useState({
    product_name: '',
    //product_description: '',    
    product_quantity: 0,
    package_name: '',
    package_price: '',
    nb_persons: 0,
    nb_places: 0,
    category_id: 0
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
        setForm({ ...form, product_quantity: value === '' ? 0 : parseInt(value) });
          break;
      case 'dayly-amount':
        setForm({ ...form, package_price: value });
          break;
      case 'nb_persons':
        setForm({ ...form, nb_persons: value === '' ? 0 : parseInt(value)  });
          break;
      case 'nb_places':
        setForm({ ...form, nb_places: value === '' ? 0 : parseInt(value)  });
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
        const type = editProd ? 'string' :  'object'
        return (
          (typeof media === type) &&
          category !== '' &&
          descripbe !== '' &&
          form.product_name !== '' &&
          form.product_quantity > 0
        )
      } else {
        const type = editPack ? 'string' : 'object'
        return (
          (typeof media === type) &&
          category !== '' &&
          descripbe !== '' &&
          productIds?.length > 0 &&
          form.package_name !== '' &&
          form.package_price !== '' &&
          form.nb_persons > 0 &&
          form.nb_places > 0
        )
      }
  };

  const addorEditProduct =  async() => {
    setLoader(true)
    let formData = new FormData();  // Utilisation de FormData pour gérer le fichier
      // Ajout des données du produit au FormData
    formData.append("product_name", form.product_name);
    formData.append("product_description", descripbe);
    formData.append("product_quantity", form.product_quantity);
    formData.append("caracteristics_products", caracteristics);
    formData.append('category',  category);
    formData.append('is_active',  true);
    // Ajout du fichier photo_user
    if (media?.file) {
      formData.append("photo_products", media.file);
    }

    let res = editProd ? await RequestDashboard(`gestreserv/products/${productId}/`, 'PUT', formData, users.access_token) : await RequestDashboard( 'gestreserv/products/', 'POST', formData, users.access_token);
    let status = editProd ? 200 : 201
    if (res.status === status) {
      setErrorSubmit(`The product has been successfully ${editProd ? 'updated' : 'created'}`)
      setLoader(false)
      setCategory('')
      setDescripbe('')
      setCaracteristics('')
      setForm({ ...form, product_name: '', product_quantity: ''});
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
    let formData = new FormData();  // Utilisation de FormData pour gérer le fichier
    
    //ajout des donnees du package au fichier
    formData.append("package_name", form.package_name);
    formData.append("package_price", form.package_price);
    formData.append("package_description", descripbe);
    formData.append("nb_persons", form.nb_persons);
    formData.append("nb_places", form.nb_places);
    // Ajouter l'objet "category" en tant que chaîne JSON
    //formData.append("categories", JSON.stringify({ category_name: category }));
    formData.append('category_name',  category)
    //formData.append("category_id", form.category_id);
    //formData.append("product_names", JSON.stringify(productIds));
    productIds.forEach(product => {
      formData.append('product_names', product);
    });
    // Ajout du fichier photo_user
    if (media?.file) {
      formData.append("photos_packages", media?.file);
    }
    
    let res = editPack ? await RequestDashboard(`gestreserv/packages/${packageId}/`, 'PUT', formData, users.access_token) : await RequestDashboard( 'gestreserv/packages/', 'POST', formData, users.access_token);
    let status = editPack ? 200 : 201

    if (res.status === status) {
      setErrorSubmit(`The package has been successfully ${editPack ? 'updated' : 'created'}`)
      setLoader(false)
      setCategory('')
      setDescripbe('')
      //setProductIds([])
      setForm({ ...form, package_name: '', package_price: '', nb_persons: '', nb_places: '',});
    }
    else if (res.status === 400) { 
      setLoader(false)
      //setForm({ ...form, package_name: '', package_price: '', nb_persons: '', nb_places: '',});
      setErrorSubmit(res.response?.package_name[0]); 
    }
    else if (res.status === 401) { 
      setLoader(false)
      //setForm({ ...form, package_name: '', package_price: '', nb_persons: 0, nb_places: 0,});
      setErrorSubmit( "Your email address has not been verified "); 
    }
    else { 
      setLoader(false)
     // setForm({ ...form, package_name: '', package_price: '', nb_persons: 0, nb_places: 0,});
      setErrorSubmit("An error has occurred please try again"); 
    }
  };

  const handleResetForm = () => {
    if (product) {
      setMedia()
      setForm({ ...form, product_name: '', product_quantity: 0});
    } else {
      setMedia()
      setForm({ ...form, package_name: '', package_price: '', nb_persons: 0, nb_places: 0});
    }
  }

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
    if (editPack && packageId) {
      const getPackageById = async(id) => {
        setLoading(true)
          let res = await RequestDashboard(`gestreserv/packages/${id}/`, 'GET', '', users.access_token);
          if (res.status === 200) {
            setPackageEdit(res.response);
            setLoading(false)
          }
      }
      getPackageById(packageId);
    }
  }, [productId, editProd, users.access_token, editPack, packageId]);

  useEffect(() => {
    if (productEdit) {
      setForm({
        product_name: productEdit.product_name,
        product_quantity: productEdit.product_quantity,
      });
      setCategory(productEdit?.category|| '');
      setDescripbe(productEdit?.product_description || '');
      setCaracteristics(productEdit?.caracteristics_products || '');
      setMedia(productEdit?.photo_products || '');
    }
    if (packageEdit) {
      setForm({
        package_name: packageEdit.package_name,
        package_price: Math.floor(packageEdit.package_price),
        nb_persons: packageEdit.nb_persons,
        nb_places: packageEdit.nb_places,
      });
      setCategory(packageEdit?.category?.category_name || '');
      setMedia(packageEdit?.photos_packages || '');
      setDescripbe(packageEdit?.package_description || '');
    }
  }, [productEdit, packageEdit]);
  
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
              <NameAndDescription className={styles.card} product={product} onChange={textInputChange} setDescripbe={setDescripbe} setCaracteristics={setCaracteristics}  formAdd={{form, descripbe, caracteristics}}/>
            {/* <ImagesAndCTA className={styles.card} />*/}
              <Price className={styles.card} product={product} onChange={textInputChange} formAdd={form}/>
              <CategoryAndAttibutes className={styles.card} categoryAttribute={true} product={product} onChange={textInputChange} setCategoryProduct={setCategory} editProd={editProd} editPack={editPack} formAdd={product ? productEdit?.category : packageEdit?.category.category_name} setForm={setForm}/>
              {/*<CategoryAndAttibutes className={styles.card} product={product} onChange={textInputChange} setCategoryProduct={setCategory} editProd={editProd} formAdd={productEdit?.category} setForm={setForm}/>
              <ProductFiles className={styles.card} />*/}
              {/*<Discussion className={styles.card} />*/}

              {errorSubmit !== '' && (
                <ErrorMessage message={errorSubmit} onClose={() => setErrorSubmit('')}/>
              )}
            </div>
            <div className={styles.col}>
              <ProductFiles className={styles.card} product={product} onChange={textInputChange} allProduct={allProduct} editProd={editProd} mediaUpdate={media} setMediaUpdate={setMedia} formUpdate={packageEdit?.products} setProductIds={setProductIds} editPack={editPack}/>
              {/*<Preview
                visible={visiblePreview}
                onClose={() => setVisiblePreview(false)}
              />*/}
            </div>
          </div>
        </>
      )}
      <Panel onClick={!product ? addorEditPackage : addorEditProduct} onResetForm={handleResetForm} isFormFilled={isFormFilled} loader={loader} setVisiblePreview={setVisiblePreview} setVisibleSchedule={setVisibleModal} product={product} editPack={editPack}/>
      <TooltipGlodal />
      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <Schedule  startDate={startDate}  setStartDate={setStartDate} startTime={startTime} setStartTime={setStartTime}/>
      </Modal>
    </>
  );
};

export default NewProduct;
