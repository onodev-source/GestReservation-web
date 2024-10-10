import React, { useCallback, useEffect, useState } from "react";
import styles from "./NewReservation.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
//import Modal from "../../components/Modal";
//import Schedule from "../../components/Schedule";
import NameAndDescription from "./NameAndDescription";
import Price from "./Price";
import CategoryAndAttibutes from "./CategoryAndAttibutes";
/*import ProductFiles from "./ProductFiles";
import Discussion from "./Discussion";
import Preview from "./Preview";*/
import Panel from "./Panel";
import DateAndHour from "./DateAndHour";
import RequestDashboard from "../../Services/Api/ApiServices";
import { useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import { formatDate } from "../../Utils/formatDate";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import cn from "classnames";
import Product from "../../components/Product";
import Slider from "react-slick";
import Icon from "../../components/Icon";
import { useParams } from "react-router";
import { formatTime } from "../../Utils/formatTime";
import { useTranslation } from "react-i18next";

const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <button {...props}>{children}</button>
);

const settings = {
  infinite: true,
  slidesToShow:  2,
  slidesToScroll: 1,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
  nextArrow: (
    <SlickArrow>
      <Icon name="arrow-right" size="24" />
    </SlickArrow>
  ),
  prevArrow: (
    <SlickArrow>
      <Icon name="arrow-left" size="24" />
    </SlickArrow>
  ),
  responsive: [
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const NewReservation = ({product, editOrder}) => {
  const {t} = useTranslation()
  const users = useSelector((state) => state.users)
  const { orderId } = useParams();
  
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [orderEdit, setOrderEdit] = useState();
  const [errorSubmit, setErrorSubmit] = useState('');
  const [selectedFilters, setSelectedFilters] = useState();
  const [form, setForm] = useState({
    order_number: '',
    price_hour: 0,
    price_day: 0,
    price_month: 0,    
    nb_persons: 0,
    package: '',
    type_event: '',
  });

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const handleChange = (id) => {
    // Si le produit est déjà sélectionné, désélectionnez-le
    if (selectedFilters === id) {
      setSelectedFilters(null); // Désélectionner
    } else {
      // Sinon, sélectionnez le produit
      setSelectedFilters(id);
    }
  };
  
 const textInputChange = (input) => {
    const target = input.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    switch (name) {
      case 'nb_persons':
        setForm({ ...form, nb_persons: value === '' ? 0 : parseInt(value) });
          break;
      case 'price_hour':
        setForm({ ...form, price_hour: value === '' ? 0 : parseInt(value) });
          break;
      case 'price_day':
        setForm({ ...form, price_day: value === '' ? 0 : parseInt(value)  });
          break;
      case 'price_month':
        setForm({ ...form, price_month: value === '' ? 0 : parseInt(value)  });
          break;
      default:
          break;
    }
  }

  const isFormFilled = () => {
    return (
      startDate !== '' &&
      endDate !== '' &&
      typeof selectedFilters === 'number' &&
      form.price_hour > 0 &&
      form.price_day > 0 &&
      form.price_month > 0 &&
      form.type_event !== '' &&
      form.nb_persons > 0 
    )
  };
  console.log('typevent', form.type_event);
  
  const handleResetForm = () => {
    setForm({ ...form, price_hour: '', price_day: '', price_month: '', nb_persons: 0});
  }

  const addOrEditReservation = async() => {
    setLoader(true)
    
    let data = {
      user_id: users.users.id,
      price_hour: form.price_hour,
      price_day: form.price_day,
      price_month: form.price_month,
      nb_persons: form.nb_persons,
      begin_date: formatDate(startDate, 'SEND'),
      end_date: formatDate(endDate, 'SEND'),
      begin_hour: formatDate(startTime, 'HOUR'),
      end_hour: formatDate(endTime, 'HOUR'),
      package_id: selectedFilters,
      type_event_id: parseInt(form.type_event)
    };

    let res = await RequestDashboard(editOrder ? `gestreserv/orders/${orderId}/` : 'gestreserv/orders/', editOrder ? 'PUT' : 'POST', data, users.access_token)
    let status = editOrder ? 200 : 201

    if(res.status === status) {
      setLoader(false)
      setForm({ ...form, price_hour: '', price_day: '', price_month: '', nb_persons: '' });
      setErrorSubmit(`The reservation has been successfully ${editOrder ? 'updated' : 'created'}`); 
    } else {
      setLoader(false)
      setErrorSubmit("An error has occurred please try again"); 
    }
  }
  
  const getAllPackages = useCallback(async() => {
    setLoading(true)
      let res = await RequestDashboard(`gestreserv/packages/`, 'GET', '', users.access_token);
      if (res.status === 200) {
        setPackages(res.response?.results);
        setLoading(false)
      }
  }, [users.access_token])
  
  useEffect(() => {
    if (editOrder && orderId !==undefined) {
      const getOrderById = async(id) => {
        setLoading(true)
          let res = await RequestDashboard(`gestreserv/orders/${id}/`, 'GET', '', users.access_token);
          if (res.status === 200) {
            setOrderEdit(res.response);
            setLoading(false)
          }
      }
      getOrderById(orderId);
    }
  }, [users.access_token, editOrder, orderId]);

  useEffect(() => {
    if (orderEdit) {
      const dateStart = new Date(orderEdit?.begin_date);
      const dateEnd = new Date(orderEdit.end_date);
      const [hours, minutes, seconds] = orderEdit.begin_hour.split(":");
      const [hoursEnd, minutesEnd, secondsEnd] = orderEdit.end_hour.split(":");
      dateStart.setHours(hours, minutes, seconds);
      dateEnd.setHours(hoursEnd, minutesEnd, secondsEnd);

      setForm({ price_hour: orderEdit.price_hour, price_day: orderEdit.price_day, price_month: orderEdit.price_month, nb_persons: orderEdit.nb_persons });  
      setSelectedFilters(orderEdit?.package?.id) 
      //setStartDate(new Date(item.start_date));
      setStartDate(new Date(orderEdit?.begin_date)) 
      setEndDate(new Date(orderEdit.end_date)) 
      setStartTime(dateStart) 
      setEndTime(dateEnd) 
    }
  }, [orderEdit]);

  useEffect(() => {
    getAllPackages();
  }, [getAllPackages]);

  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>
          <NameAndDescription className={styles.card} product={product} form={form} onChange={textInputChange}/>

          <Card className={cn(styles.card)} title={t('navigation.title.products_released')} classTitle="title-purple" head={''}  >
            <div className={styles.description}>
              {/*<TextInput className={styles.field} label="Product title"  name="title" type="text" tooltip="Maximum 100 characters. No HTML or emoji allowed" required/>
              <Editor state={content}onChange={setContent} classEditor={styles.editor} label="Description" tooltip="Description"/>*/}

              <div className={cn("slider-container", styles.wrapper)}>
                {loading ? 
                  <Loader/> : 
                  <Slider className={cn("products-slider", {"products-sliderSpacing" : !product})} {...settings}>
                    {packages?.map((x, index) => (
                      <Product getAllPackages={getAllPackages} className={styles.product} value={selectedFilters === x.id} isPackage={true} onChange={() => handleChange(x.id)} item={x}  key={x.id} isReserved={true} isPreviewHidden = {true}/>
                    ))}
                  </Slider>
                }
              </div>
            </div>
          </Card>

          <DateAndHour className={styles.card} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} endTime={endTime} setStartTime={setStartTime} startTime={startTime} setEndTime={setEndTime}/>

          {/*<CategoryAndAttibutes className={styles.card} categoryAttribute={true} product={product}/>
          <ProductFiles className={styles.card} />*/}

          <CategoryAndAttibutes className={styles.card} setForm={setForm} editOrder={editOrder} formEdit={orderEdit?.type_event?.type_event}/>

          {/*<Discussion className={styles.card} />*/}
        
          {errorSubmit !== '' && (
            <ErrorMessage message={errorSubmit} onClose={() => setErrorSubmit('')}/>
          )}
        </div>
        <div className={styles.col}>
          <Price className={styles.card} onChange={textInputChange} form={form}/>
          {/*<Preview
            visible={visiblePreview}
            onClose={() => setVisiblePreview(false)}
          />*/}
        </div>
      </div>
      <Panel loader={loader} setVisiblePreview={setVisiblePreview} isFormFilled={isFormFilled} onClick={addOrEditReservation} onResetForm={handleResetForm} setVisibleSchedule={setVisibleModal} product={product}/>
      <TooltipGlodal />
      {/*<Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <Schedule  startDate={startDate}  setStartDate={setStartDate} startTime={startTime} setStartTime={setStartTime}/>
      </Modal>*/}
    </>
  );
};

export default NewReservation;
