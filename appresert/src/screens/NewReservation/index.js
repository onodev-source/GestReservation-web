import React, { useState } from "react";
import styles from "./NewReservation.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Modal from "../../components/Modal";
import Schedule from "../../components/Schedule";
import NameAndDescription from "./NameAndDescription";
import Price from "./Price";
import CategoryAndAttibutes from "./CategoryAndAttibutes";
import ProductFiles from "./ProductFiles";
import Discussion from "./Discussion";
import Preview from "./Preview";
import Panel from "./Panel";
import DateAndHour from "./DateAndHour";
import RequestDashboard from "../../Services/Api/ApiServices";
import { useSelector } from "react-redux";

const NewReservation = ({product}) => {
  const users = useSelector((state) => state.users)
  
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState('');
  const [form, setForm] = useState({
    order_number: '',
    price_hour: '',
    price_day: '',
    price_month: '',    
    nb_persons: '',
    package: '',
    type_event: '',
  });

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  
 const textInputChange = (input) => {
    const target = input.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    switch (name) {
      case 'title':
        setForm({ ...form, title: value });
          break;
      case 'description':
        setForm({ ...form, description: value });
          break;
      default:
          break;
    }
  }

  const addOrEditReservation = async() => {
    setLoader(true)
    
    let data = {
      customer: {
        user: {
          first_name: users.users.first_name,
          last_name: users.users.last_name,
          phone_number: users.users.phone_number,
          email: users.users.email,    
          password: users.users.password,
        }
      },
      order_number: form.order_number,
      price_hour: form.price_hour,
      price_day: form.price_day,
      price_month: form.price_month,
      nb_persons: form.nb_persons,
      begin_date: startDate,
      end_date: endDate,
      begin_hour: startTime,
      end_hour: endTime,
      package: form.package,
      type_event: form.type_event
    };
    let res = await RequestDashboard('gestreserv/publicities/', 'POST', data, users.access_token)

    if(res.status === 201) {
      setForm({ ...form, title: '', description: '', start_date: '', end_date: '' });
      setLoader(false)
    } else {
      setLoader(false)
      setErrorSubmit("An error has occurred please try again"); 
    }
  }

  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>
          <NameAndDescription className={styles.card} product={product}/>
          <DateAndHour className={styles.card} setStartDate={setStartDate} setEndDate={setEndDate} setStartTime={setStartTime} setEndTime={setEndTime}/>
          <CategoryAndAttibutes className={styles.card} categoryAttribute={true} product={product}/>
          {/*<ProductFiles className={styles.card} />*/}
          <CategoryAndAttibutes className={styles.card} product={product}/>
          {/*<Discussion className={styles.card} />*/}
        </div>
        <div className={styles.col}>
          <Price className={styles.card} />
          {/*<Preview
            visible={visiblePreview}
            onClose={() => setVisiblePreview(false)}
          />*/}
        </div>
      </div>
      <Panel  setVisiblePreview={setVisiblePreview} setVisibleSchedule={setVisibleModal} product={product}/>
      <TooltipGlodal />
      {/*<Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <Schedule  startDate={startDate}  setStartDate={setStartDate} startTime={startTime} setStartTime={setStartTime}/>
      </Modal>*/}
    </>
  );
};

export default NewReservation;
