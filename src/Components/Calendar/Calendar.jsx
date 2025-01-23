import React from 'react';
import {useState} from 'react'
import * as dateFns from 'date-fns';
import './Calendar.css';

const formatOfYear = 'yyy';
const formatOfMonth = 'MMM';
const formatOfWeek = 'eee';
const formatOfDay = 'd';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectDate, setSelectDate] = useState(new Date());
    const today = new Date();

    // get first day of current date 
    const firstDay = dateFns.startOfMonth(currentDate); 
    // find the last day of current month 
    const lastDay = dateFns.lastDayOfMonth(currentDate);
    // get first day of week of firstDay 
    const startDate = dateFns.startOfWeek(firstDay);
    // get last day of week of lastDay  
    const endDate = dateFns.lastDayOfWeek(lastDay);

    // render all days 
    const totalDate = dateFns.eachDayOfInterval({ start:startDate, end:endDate });
    // console.log(totalDate);

    const weeks = (date => {
        const weeks = [];
        for (let day = 1; day <= 7; day++) {
            weeks.push(date[day]);
        }
        return weeks;
    })(totalDate);

    const isToday = day => dateFns.isSameDay(day,today);
    const isSelectedDate = day => dateFns.isSameDay(day,selectDate);
    console.log('selected: ', selectDate);
    return (
        <div>  
            <div id='calendarHead'>
                <button onClick={()=>setCurrentDate(dateFns.subMonths(currentDate, 1))}>last</button>
                <span>{dateFns.format(currentDate, formatOfMonth)} {dateFns.format(currentDate, formatOfYear)} </span>
                <button onClick={()=>setCurrentDate(dateFns.addMonths(currentDate, 1))}>next</button>
            </div>
            <div className='weekDiv'>
                {weeks.map(week => (
                <span>{dateFns.format(week, formatOfWeek)}</span>
                ))}
                {totalDate.map(date => (
                    <span style={{ color:  !dateFns.isSameMonth(date, currentDate) ? '#ddd' : (isToday(date) ? 'green' : (isSelectedDate(date) ? 'red' : ''))}}
                    onClick={() => setSelectDate(date)}>{dateFns.format(date, formatOfDay)}</span>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
