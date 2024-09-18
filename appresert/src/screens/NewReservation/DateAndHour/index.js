import React, { useState } from "react";
import cn from "classnames";
import styles from "./DateAndHour.module.sass";
import Card from "../../../components/Card";
import Schedule from "../../../components/Schedule";


const DateAndHour = ({ className, startDate, setStartDate, startTime, setStartTime, endDate,  setEndDate, endTime, setEndTime}) => {
  //const [startDate, setStartDate] = useState(new Date());
  //const [startTime, setStartTime] = useState(new Date());

  return (
    <Card  className={cn(styles.card, className)}  title="Period" classTitle="title-blue"  >
      <div className={cn(styles.images)}>
        <Schedule  startDate={startDate}  setStartDate={setStartDate}  endDate={endDate}  setEndDate={setEndDate} startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} addResert={true}/>
      </div>
    </Card>
  );
};

export default DateAndHour;
