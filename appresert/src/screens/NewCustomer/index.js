import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import { useParams } from "react-router";
import Loader from "../../components/Loader";
import { verifyInput } from "../../Utils/verifyInput";
import { formatDate } from "../../Utils/formatDate";

const NewCustomer = ({product, editCust}) => {
  const users = useSelector((state) => state.users);
  const { customerId } = useParams();

  const [visiblePreview, setVisiblePreview] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [customerEdit, setCustomerEdit] = useState()
  //const [descripbe, setDescripbe] = useState('')
  const [errorSubmit, setErrorSubmit] = useState('');
  //const [media, setMedia] = useState();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    tel: '',
    email: '',    
    password: '',
    //sexe: '',
    //city: '',
    //country: '',
    //date_of_birth: '',
   // bio: '',
    //category: '',
    //media: ''
  });

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());


  const isFormFilled = () => {
      
    return (
      form.first_name !== '' &&
      form.last_name !== '' &&
      verifyInput(form.tel, 'tel') !== false &&
      verifyInput(form.email) !== false &&
      form.password !== ''
    )
  };
  
  const textInputChange = (input) => {
    const target = input.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    switch (name) {
        case 'first-name':
          setForm({ ...form, first_name: value });
            break;
        case 'last-name':
          setForm({ ...form, last_name: value });
            break;
        case 'tel':
          setForm({ ...form, tel: value });
            break;
       /* case 'city':
          setForm({ ...form, city: value });
            break;
        case 'country':
          setForm({ ...form, country: value });
            break;
        case 'sexe':
          setForm({ ...form, sexe: value });
            break;*/
        case 'email':
          setForm({ ...form, email: value });
            break;
        case 'password':
          setForm({ ...form, password: value });
            break;
        default:
            break;
    }
  }
 

  const addOrUpdateCustomer = async () => {
    setLoader(true);

    // Ajout des données utilisateur 
    const userData = {
      email: form.email,
      first_name: form.first_name,
      last_name: form.last_name,
      password: form.password,
      date_of_commitment: formatDate(new Date(), 'SEND'),
      /*date_of_birth: form.date_of_birth,
      bio: descripbe,
      is_online: true,*/
      phone_number: form.tel,
      /*gender: form.sexe,
      country: form.country,
      city: form.city*/
    };

    try {
      // Appel API avec FormData
      let res = await RequestDashboard( editCust ? `gestreserv/customers/${customerId}` : 'gestreserv/customers/', editCust ? 'PUT' : 'POST', userData,   users.access_token );
      let status = editCust ? 200 : 201
      
      if (res.status === status) {
        setErrorSubmit(`The customer has been successfully ${editCust ? 'updated' : 'created'}`);
        setForm({ ...form, email: '', first_name: '', last_name: '', tel: '',  password: '' });
        //setDescripbe('')
        setLoader(false);
      } else if (res.status === 400) {
        setLoader(false);
        //setForm({ ...form, email: '', tel: '', sexe: '', location: '', password: '' });
        setErrorSubmit("Incorrect Email or Password");
      } else if (res.status === 401) {
        setLoader(false);
        //setForm({ ...form, email: '', tel: '', sexe: '', location: '', password: '' });
        setErrorSubmit("Your email address has not been verified");
      } else {
        setLoader(false);
        //setForm({ ...form, email: '', tel: '', sexe: '', location: '', password: '' });
        setErrorSubmit("An error has occurred, please try again");
      }
    } catch (error) {
      console.error("Error during API call", error);
      setLoader(false);
      setErrorSubmit("An unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (editCust && customerId) {
      const getCustomerById = async(id) => {
        setLoading(true)
        let res = await RequestDashboard(`gestreserv/customers/${id}/`, 'GET', '', users.access_token);
        if (res.status === 200) {
          setCustomerEdit(res.response);
          setLoading(false)
        }
      }
      getCustomerById(customerId);
    }
  }, [ users.access_token, customerId, editCust]);

  useEffect(() => {
    if (customerEdit) {
      setForm({ ...form, email: customerEdit.user.email, first_name: customerEdit.user.first_name, last_name: customerEdit.user.last_name, tel: customerEdit.user.phone_number,  password: customerEdit.user.password });
    }
  },[customerEdit])

  return (
    <>
      {loading ? (
        <Loader/>
      ) : (
        <>
          <div className={styles.row}>
            <div className={styles.col}>
              <NameAndDescription className={styles.card} product={product} onChange={textInputChange}  formAdd={{form}}/>
            {/* <ImagesAndCTA className={styles.card} />
              <CategoryAndAttibutes className={styles.card} setForm={setForm}/>*/}

              <Contact className={styles.card} profil={true} onChange={textInputChange} form={form}/>

              {/*<Location className={styles.card} product={product} onChange={textInputChange} form={form}/>
              <ProductFiles className={styles.card} />*/}

              <Profile className={styles.card} onChange={textInputChange} form={form}/>

              {errorSubmit !== '' && (
                <ErrorMessage message={errorSubmit} onClose={() => setErrorSubmit('')}/>
              )}
            </div>
            <div className={styles.col}>
              {/*<ImagesAndCTA className={styles.card} mediaUpdate={media} setMediaUpdate={setMedia}/>
              <ProductFile className={styles.card} product={product}/>*/}
              {/*<Preview
                visible={visiblePreview}
                onClose={() => setVisiblePreview(false)}
              />*/}
            </div>
          </div>
          <Panel onClick={addOrUpdateCustomer} isFormFilled={isFormFilled} setVisiblePreview={setVisiblePreview} setForm={setForm} loader={loader} setVisibleSchedule={setVisibleModal} product={product}/>
          <TooltipGlodal />
          <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
            <Schedule  startDate={startDate}  setStartDate={setStartDate} startTime={startTime} setStartTime={setStartTime}/>
          </Modal>
        </>
      )}
    </>
  );
};

export default NewCustomer;
