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


const Scheduled = () => {
  const [events, setEvents] = useState([]);
  const [visibleActions, setVisibleActions] = React.useState(false);

  const actions = [
    {
      title: "Edit product",
      icon: "edit",
      url: "/products/add"
    },
    {
      title: "Delete product",
      icon: "trash",
      action: () => console.log("Delete product"),
    },
    {
      title: "Details product",
      icon: "arrow-right",
      action: () => setVisibleActions(true),
    }
  ];

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
            <FullCalendar  
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
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
                <div style={{ display: 'flex', alignItems: 'center', maxWidth: '200px', background: '#F0C830', overflow: 'hidden', color: '#1A1D1F', borderRadius: '8px', padding: '5px 8px' }}>
                  <div style={{ flex: '1 1 auto', wordBreak: 'break-word', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
                    {eventInfo.event.title}
                  </div>
                  <Icon name="more-horizontal" size="24" style={{ flex: '0 0 auto', marginLeft: '8px' }} />
                </div>
              )}
            />
          </div>
          {/*<DatePicker  selected={startDate}  onChange={(date) => setStartDate(date)}   dateFormatCalendar={"MMMM yyyy"} inline className={styles}/>
          <Table items={products} title="Scheduled for" />*/}
        </div>
        {/*<Actions className={styles.actions} classActionsHead={styles.actionsHead} classActionsBody={styles.actionsBody}classActionsOption={styles.actionsOption}
        items={actions}/>*/}
      </Card>
      {/*<Panel />*/}
    </>
  );
};

export default Scheduled;
