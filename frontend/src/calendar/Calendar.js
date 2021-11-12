import { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Dialog from '@mui/material/Dialog';
import MyDialog from "./AddEventModal";

const localizer = momentLocalizer(moment);
let allViews = Object.keys(Views).map(k => Views[k])

export default function MyCalendar() {
  const [events, setEvents]= useState([]);
  const [modal, setModal]= useState(false);

  useEffect(() => { 
    async function getEvents(){
      try {
         const response = await axios.get('http://localhost:5000/todos');
         if(response.status === 201){
          setEvents(response.data)
         }
         else {
           console.log("Error, todos not found.")
         }
      }
      catch (error) {
         console.log(error);
         return false;
      }
     }
    getEvents();
  }, [events, setEvents]);

  function handleSelectedSlot() {
    setModal(true)
  }

  function handleClose() {
    setModal(false)
  }

  return (
    <div>
      <Calendar
        selectable
        events={events}
        step={60}
        showMultiDayTimes
        localizer={localizer}
        views={allViews}
        style={{ height: "100vh" }}
        onSelectSlot={handleSelectedSlot}
      />
      <Dialog open={modal} onClose={handleClose}>
        <MyDialog events={events} setEvents={setEvents} setModal={setModal}></MyDialog>
      </Dialog>
    </div>
  );
}
