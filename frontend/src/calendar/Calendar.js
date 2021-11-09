import { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
let allViews = Object.keys(Views).map(k => Views[k])

export default function MyCalendar() {
  const [events, setEvents]= useState([]);

  useEffect(() => { 
    async function getEvents(){
      try {
         const response = await axios.get('http://localhost:5000/todos');
         if(response.status === 201){
          setEvents(response.data)
         }
         else{
           console.log("Error!!!!")
         }
      }
      catch (error) {
         console.log(error);
         return false;
      }
     }
    getEvents();
  }, []);


  return (
    <Calendar
      events={events}
      step={60}
      showMultiDayTimes
      localizer={localizer}
      views={allViews}
      style={{ height: "100vh" }}
    />
  );
}
