import React, { useState } from "react";
import cn from "classnames";
//import DatePicker from "react-datepicker";
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dateClick and selectable
//import '@fullcalendar/daygrid/main.css'; 
//import '@fullcalendar/timegrid/main.css'; 
//import '@fullcalendar/common/main.css'
import styles from "./Scheduled.module.sass";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Panel from "./Panel";
import Overview from "./Overview";
import Icon from "../../components/Icon";
import Actions from "../../components/Actions";
import Modal from "../../components/Modal";
//import Details from "../Refunds/Row/Details";
import Details from "./Details";
import TextInput from "../../components/TextInput";
import Schedule from "../../components/Schedule";


const item = 
{
  id: 4,
  product: "Academe 3D Education Icons",
  category: "UI design kit",
  image: "/images/content/product-pic-5.jpg",
  image2x: "/images/content/product-pic-5@2x.jpg",
  status: true,
  date: "9 Sep",
  man: "Reyna Nikolaus",
  amount: "9800000",
  avatar: "/images/content/avatar-5.jpg",
  parameters: [
    {
      title: "Request send",
      content: "Aug 20, 2021",
    },
    {
      title: "Reason",
      content: "Download link is broken",
    },
    {
      title: "Product downloaded",
      downloadedStatus: true,
      downloadedValue: true,
    },
    {
      title: "Purchase date",
      content: "July 01, 2021",
    },
    {
      title: "Purchase code",
      content: "6373ads-hd73h-8373DS",
    },
    {
      title: "Request ID",
      content: "8975ads-hd73h-8974DS",
    },
    {
      title: "Market fee",
      tooltip: "Description Market fee",
      price: 7.28,
    },
    {
      title: "Price",
      tooltip: "Description Price",
      price: 72.88,
    },
  ],
}

const Scheduled = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleAddModal, setVisibleAddModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

  const textInputChange = (input) => {
    const target = input.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    switch (name) {
        case 'nameEvent':
          setTitle(value);
            break;
        default:
            break;
    }
}


  const handleDateSelect = (selectInfo) => {
    setVisibleModal(true)
    setVisibleAddModal(true)
    //let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      setEvents((prevEvents) => [
        ...prevEvents, {  id: createEventId(), title: title,  start: startDate?.toISOString(), end: startDate?.toISOString(), allDay: selectInfo.allDay,},
      ]);
    }
  };

  /*const createEventId = () => {
    return String(events.length + 1);
  };*/
  const createEventId = () => {
    // Function to create a unique ID for each event
    return String(Date.now());
  };
  const handleCloseModal = () => { 
    setVisibleModal(false)
    setVisibleAddModal(false)
  }

  return (
    <>
      <Overview className={styles.card} />
      <Card  className={styles.card}  classCardHead={styles.head}   classTitle={cn("title-purple", styles.title)}>
        <div className={styles.wrapper}>
          <div className="calendar-container">
            <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={"dayGridMonth"}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              selectable={true}
              select={handleDateSelect}
              events={events}
              eventContent={(eventInfo) => (
                <div onClick={() => setVisibleModal(true)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '100%', background: '#F0C830', overflow: 'hidden', 
                  color: '#1A1D1F', borderRadius: '8px', padding: '5px 8px', cursor: 'pointer', boxShadow: '0 0 1px 2px #F0C830' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', wordBreak: 'break-word', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
                    {/*eventInfo.event.title*/}
                    <Icon name="reserved" size="18" style={{marginRight: '20px' }}/> Reserved
                  </div>
                  <Icon name="more-horizontal" size="24" style={{  marginLeft: '8px' }} />
                </div>
              )}
              buttonClassNames={{
                prev: 'custom-red-button',
                next: 'custom-red-button',
                today: 'custom-red-button'
              }}
            />
          </div>
          {/*<DatePicker  selected={startDate}  onChange={(date) => setStartDate(date)}   dateFormatCalendar={"MMMM yyyy"} inline className={styles}/>
          <Table items={products} title="Scheduled for" />*/}
        </div>
        {/*<Actions className={styles.actions} classActionsHead={styles.actionsHead} classActionsBody={styles.actionsBody}classActionsOption={styles.actionsOption}
        items={actions}/>*/}
      </Card>
      <Modal  outerClassName={styles.outer}  visible={visibleModal} onClose={handleCloseModal} >
        {visibleAddModal ?
          <div className={styles.details}>
            <div className={cn("title-purple", styles.title)}>Add event to calendar</div>
            <div className={styles.row}>
              <div className={styles.col}>
                <div className={styles.group}>
                  <TextInput onChange={textInputChange} className={styles.field} label="Event name" placeHolder="Name of event" name="nameEvent" type="text" tooltip="Maximum 100 characters. No HTML or emoji allowed" required/>
                  <Schedule  startDate={startDate}  setStartDate={setStartDate} endDate={endDate}  setEndDate={setEndDate} startTime={startTime} setStartTime={setStartTime} addResert={true}/>
                </div>
                <div className={styles.btns}>
                  <button className={cn("button-stroke", styles.button)} onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button className={cn("button", styles.button)}>
                    Add event
                  </button>
                </div>
              </div>
            </div>
          </div>
        : <Details item={item} />
        }
      </Modal>
      {/*<Panel />*/}
    </>
  );
};

export default Scheduled;
