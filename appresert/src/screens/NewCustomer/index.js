import React, { useState } from "react";
import styles from "./NewProduct.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Modal from "../../components/Modal";
import Schedule from "../../components/Schedule";
import NameAndDescription from "./NameAndDescription";
import ImagesAndCTA from "./ImagesAndCTA";
import CategoryAndAttibutes from "./CategoryAndAttibutes";
import Panel from "./Panel";
import Location from "./Location";
import Contact from "./Contact";
import Profile from "./Profile";
import RequestDashboard from "../../Services/Api/ApiServices";

const NewCustomer = ({product, editCust}) => {
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [loader, setLoader] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState('');
  const [form, setForm] = useState({

  });

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

 /* const textInputChange = (input) => {
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
  
  const isFormFilled = () => {
    return (
      category !== '' &&
      form.package_name !== '' &&
      form.package_price !== '' &&
      form.nb_persons > 0 &&
      form.nb_places > 0
    )
  };

  const addorEditCustomer =  async() => {
    setLoader(true)
    let data = {
      package_name: form.package_name,
      package_price: form.package_price,
      nb_persons: form.nb_persons,
      nb_places: form.nb_places,
    }
    let res = editCust ? await RequestDashboard(`gestreserv/packages/${packageId}/`, 'PUT', data, users.access_token) : await RequestDashboard( 'gestreserv/packages/', 'POST', data, users.access_token);
    let status = editCust ? 200 : 201

    if (res.status === status) {
      setErrorSubmit(`The customer has been successfully ${editCust ? 'updated' : 'created'}`)
      setLoader(false)
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
  };*/
  
  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>
          <NameAndDescription className={styles.card} product={product}/>
         {/* <ImagesAndCTA className={styles.card} />*/}
          <CategoryAndAttibutes className={styles.card}/>
          <Contact className={styles.card} profil={true}/>
          <Location className={styles.card} product={product} />
          {/*<ProductFiles className={styles.card} />*/}
          <Profile className={styles.card} />
        </div>
        <div className={styles.col}>
          <ImagesAndCTA className={styles.card} />
          {/*<ProductFile className={styles.card} product={product}/>*/}
          {/*<Preview
            visible={visiblePreview}
            onClose={() => setVisiblePreview(false)}
          />*/}
        </div>
      </div>
      <Panel  setVisiblePreview={setVisiblePreview} setVisibleSchedule={setVisibleModal} product={product}/>
      <TooltipGlodal />
      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <Schedule  startDate={startDate}  setStartDate={setStartDate} startTime={startTime} setStartTime={setStartTime}/>
      </Modal>
    </>
  );
};

export default NewCustomer;
