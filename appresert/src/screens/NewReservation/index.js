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

const NewReservation = ({product}) => {
  //const users = useSelec((state) => state.users)
  
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

  
 /*const textInputChange = (input) => {
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
    let data= {
      title: form.title,
      description: form.description,
      start_date: formatDate(startDate, 'SEND'),
      end_date: formatDate(endDate, 'SEND')
    }
    let res = updatePost ? await RequestDashboard(`gestreserv/publicities/id`, 'PUT', data, users.access_token) : await RequestDashboard('gestreserv/publicities/', 'POST', data, users.access_token)

    if(res.status === 201) {
      setForm({ ...form, title: '', description: '', start_date: '', end_date: '' });
      setLoader(false)
      if (postRef.current) {
        postRef.current.click();
      }
    } else {
      setLoader(false)
      setErrorSubmit("An error has occurred please try again"); 
    }
  }*/

  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>
          <NameAndDescription className={styles.card} product={product}/>
          <DateAndHour className={styles.card} />
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
      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <Schedule  startDate={startDate}  setStartDate={setStartDate} startTime={startTime} setStartTime={setStartTime}/>
      </Modal>
    </>
  );
};

export default NewReservation;
