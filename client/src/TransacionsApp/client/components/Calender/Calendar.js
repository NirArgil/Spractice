import React, { useState } from 'react'
import Calendar from 'react-calendar';
import './CalendarV.scss';

export const CalendarV = () => {
   
    return (
      <div className="calendar-container">
        <Calendar
          calendarType="US"
          locale="en-US"
        />
      </div>     
    );
}