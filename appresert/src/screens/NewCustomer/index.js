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
import { useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";

const NewCustomer = ({product, editCust}) => {
  const users = useSelector((state) => state.users);

  const [visiblePreview, setVisiblePreview] = useState(false);
  const [loader, setLoader] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [descripbe, setDescripbe] = useState('')
  const [errorSubmit, setErrorSubmit] = useState('');
  const [media, setMedia] = useState();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    tel: '',
    email: '',    
    password: '',
    sexe: '',
    city: '',
    country: '',
    date_of_birth: '',
    bio: '',
    category: '',
    media: ''
  });

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());


  const isFormFilled = () => {
      
    return (
      form.first_name !== '' &&
      form.tel !== '' &&
      form.city !== '' &&
      form.country !== '' &&
      form.sexe !== '' &&
      form.email !== '' &&
      form.password !== '' &&
      form.nb_persons > 0 &&
      form.nb_places > 0
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
        case 'city':
          setForm({ ...form, city: value });
            break;
        case 'country':
          setForm({ ...form, country: value });
            break;
        case 'sexe':
          setForm({ ...form, sexe: value });
            break;
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
 

  //start_date: formatDate(startDate, 'SEND'),
  const addOrUpdateCustomer = async () => {
    setLoader(true);
  
    let formData = new FormData();  // Utilisation de FormData pour gérer le fichier
  
      // Ajout des données utilisateur au FormData
      formData.append("first_name", form.first_name);
      formData.append("last_name", form.last_name);
      formData.append("phone_number", form.tel);
      formData.append("gender", form.sexe);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("country", form.country);
      formData.append("city", form.city);
      formData.append("date_of_birth", form.date_of_birth);
      formData.append("bio", descripbe);
      formData.append("password", form.password);
      formData.append("re_password", form.password);
  
      // Ajout du fichier photo_user
      if (media?.file) {
        formData.append("photo_user", media.file);
      }
    
      
    try {
      // Appel API avec FormData
      let res = await RequestDashboard( editCust ? 'accounts/auth/users/me/' : 'accounts/auth/users/', editCust ? 'PUT' : 'POST', formData,   users.access_token );
      let status = editCust ? 200 : 201
      
      if (res.status === status) {
        setErrorSubmit('The customer has been successfully created');
        setForm({ ...form, email: '', first_name: '', last_name: '', tel: '', sexe: '', country: '', city: '', password: '' });
        setDescripbe('')
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
  
  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>
          <NameAndDescription className={styles.card} product={product} onChange={textInputChange} setDescripbe={setDescripbe}  formAdd={{form, descripbe}}/>
         {/* <ImagesAndCTA className={styles.card} />*/}
          <CategoryAndAttibutes className={styles.card} setForm={setForm}/>
          <Contact className={styles.card} profil={true} onChange={textInputChange} form={form}/>
          <Location className={styles.card} product={product} onChange={textInputChange} form={form}/>
          {/*<ProductFiles className={styles.card} />*/}
          <Profile className={styles.card} onChange={textInputChange} form={form}/>

          {errorSubmit !== '' && (
            <ErrorMessage message={errorSubmit} onClose={() => setErrorSubmit('')}/>
          )}
        </div>
        <div className={styles.col}>
          <ImagesAndCTA className={styles.card} mediaUpdate={media} setMediaUpdate={setMedia}/>
          {/*<ProductFile className={styles.card} product={product}/>*/}
          {/*<Preview
            visible={visiblePreview}
            onClose={() => setVisiblePreview(false)}
          />*/}
        </div>
      </div>
      <Panel onClick={addOrUpdateCustomer} setVisiblePreview={setVisiblePreview} loader={loader} setVisibleSchedule={setVisibleModal} product={product}/>
      <TooltipGlodal />
      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <Schedule  startDate={startDate}  setStartDate={setStartDate} startTime={startTime} setStartTime={setStartTime}/>
      </Modal>
    </>
  );
};

export default NewCustomer;
