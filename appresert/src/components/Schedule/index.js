import React, { useState } from "react";
import styles from "./Schedule.module.sass";
import cn from "classnames";
import Item from "./Item";
import Icon from "../Icon";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";


const Schedule = ({
  className, startDate, setStartDate, endDate, setEndDate,
  startTime, setStartTime, endTime, setEndTime, addCustomer, addResert
}) => {
  const {t} = useTranslation()

  const [visibleStartDate, setVisibleStartDate] = useState(false);
  const [visibleEndDate, setVisibleEndDate] = useState(false);
  const [visibleStartTime, setVisibleStartTime] = useState(false);
  const [visibleEndTime, setVisibleEndTime] = useState(false);

  const navigationDate = [
    { id: 1, category: t('views.reservations.table.date_begin'), categoryHour: t('form.start_time') },
    { id: 2, category: t('views.reservations.table.date_end'), categoryHour: t('form.end_time') }
  ];

  const handleClearStartDate = () => {
    setStartDate(null);
    setTimeout(() => setStartDate(new Date()), 10);
    setVisibleStartDate(false);
  };

  return (
    <div className={cn(styles.schedule, className)}>
      {(addCustomer === false || addResert === false) && (
        <>
          <div className={cn("title-red", styles.title)}>Reschedule product</div>
          <div className={styles.note}>Choose a day and time in the future you want your product to be published.</div>
        </>
      )}
      <div className={cn(styles.list, { [styles.group]: addResert })}>
        {addResert ? (
          navigationDate.map((x) => (
            <Item className={cn(styles.item, styles.field)} key={`date-${x.id}`} category={x.category} icon="calendar"
              value={(x.id === 1 ? startDate : endDate) && format(x.id === 1 ? startDate : endDate, "MMMM dd, yyyy")}
              visible={x.id === 1 ? visibleStartDate : visibleEndDate}
              setVisible={x.id === 1 ? setVisibleStartDate : setVisibleEndDate}>
              <div className={styles.date}>
                <DatePicker selected={x.id === 1 ? startDate : endDate} onChange={(date) => x.id === 1 ? setStartDate(date) : setEndDate(date)} dateFormatCalendar={"MMMM yyyy"} inline />
                <div className={styles.foot}>
                  <button className={cn("button-stroke button-small", styles.button)} onClick={x.id === 1 ? handleClearStartDate : () => setEndDate(null)}>{t('words.clear')}</button>
                  <button className={cn("button-small", styles.button)} onClick={() => x.id === 1 ? setVisibleStartDate(false) : setVisibleEndDate(false)}>{t('words.close')}</button>
                </div>
              </div>
            </Item>
          ))
        ) : (
          <Item className={styles.item} category="Date" icon="calendar"
            value={startDate && format(startDate, "MMMM dd, yyyy")}
            visible={visibleStartDate} setVisible={setVisibleStartDate}>
            <div className={styles.date}>
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormatCalendar={"MMMM yyyy"} inline />
              <div className={styles.foot}>
                <button className={cn("button-stroke button-small", styles.button)} onClick={handleClearStartDate}>{t('words.clear')}</button>
                <button className={cn("button-small", styles.button)} onClick={() => setVisibleStartDate(false)}>{t('words.close')}</button>
              </div>
            </div>
          </Item>
        )}

        {addResert ? (
          navigationDate.map((x) => (
            <Item className={cn(styles.item, styles.field)} category={x.categoryHour} icon="clock"
              value={(x.id === 1 ? startTime : endTime) && format(x.id === 1 ? startTime : endTime, "h:mm aa")}
              visible={x.id === 1 ? visibleStartTime : visibleEndTime}
              setVisible={x.id === 1 ? setVisibleStartTime : setVisibleEndTime} key={`time-${x.id}`}>
              <div className={styles.time}>
                <div className={styles.top}>
                  <div className={styles.subtitle}>{(x.id === 1 ? startTime : endTime) && format(x.id === 1 ? startTime : endTime, "h:mm aa")}</div>
                  <button className={styles.close} onClick={() => x.id === 1 ? setVisibleStartTime(false) : setVisibleEndTime(false)}><Icon name="close" size="20" /></button>
                </div>
                <DatePicker selected={x.id === 1 ? startTime : endTime} onChange={(date) => x.id === 1 ? setStartTime(date) : setEndTime(date)} showTimeSelect showTimeSelectOnly timeIntervals={30} timeCaption={false} dateFormat="h:mm aa" inline />
              </div>
            </Item>
          ))
        ) : (
          !addCustomer && (
            <Item className={styles.item} category="Time" icon="clock"
              value={startTime && format(startTime, "h:mm aa")}
              visible={visibleStartTime} setVisible={setVisibleStartTime}>
              <div className={styles.time}>
                <div className={styles.top}>
                  <div className={styles.subtitle}>{startTime && format(startTime, "h:mm aa")}</div>
                  <button className={styles.close} onClick={() => setVisibleStartTime(false)}><Icon name="close" size="20" /></button>
                </div>
                <DatePicker selected={startTime} onChange={(date) => setStartTime(date)} showTimeSelect showTimeSelectOnly timeIntervals={30} timeCaption={false} dateFormat="h:mm aa" inline />
              </div>
            </Item>
          )
        )}
      </div>
      {(addCustomer === false || addResert === false) && (
        <div className={styles.btns}>
          <button className={cn("button", styles.button)}>Reschedule</button>
        </div>
      )}
    </div>
  );
};

export default Schedule;
