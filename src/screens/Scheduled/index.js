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
  const [visibleModal, setVisibleModal] = useState(false);


  const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      setEvents((prevEvents) => [
        ...prevEvents, {  id: createEventId(), title,  start: selectInfo.startStr, end: selectInfo.endStr, allDay: selectInfo.allDay,},
      ]);
    }
  };

  const createEventId = () => {
    return String(events.length + 1);
  };

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
                <div onClick={() => setVisibleModal(true)} style={{ display: 'flex', alignItems: 'center', maxWidth: '200px', background: '#F0C830', overflow: 'hidden', 
                  color: '#1A1D1F', borderRadius: '8px', padding: '5px 8px', cursor: 'pointer', boxShadow: '0 0 20px 5px #1A1D1F' }}>
                  <div style={{ flex: '1 1 auto', wordBreak: 'break-word', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
                    {eventInfo.event.title}
                  </div>
                  <Icon name="more-horizontal" size="24" style={{ flex: '0 0 auto', marginLeft: '8px' }} />
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
      <Modal  outerClassName={styles.outer}  visible={visibleModal} onClose={() => setVisibleModal(false)} >
        <Details item={item} />
      </Modal>
      {/*<Panel />*/}
    </>
  );
};

export default Scheduled;
