import { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Dialog from '@mui/material/Dialog';
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";

const localizer = momentLocalizer(moment);
let allViews = Object.keys(Views).map(k => Views[k])

export default function MyCalendar() {
  const [events, setEvents]= useState([]);
  const [modalAdd, setModalAdd]= useState(false);
  const [modalEdit, setModalEdit]= useState(false);
  const [clickedEvent, setClickedEvent]= useState({});

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
  }, []);

  function handleSelectedSlot(event) {
    setClickedEvent(event)
    setModalAdd(true)
  }

  function handleCloseAdd() {
    setModalAdd(false)
  }

  function handleSelectedEvent(event) {
    setClickedEvent(event)
    setModalEdit(true)
  }

  function handleCloseEdit() {
    setModalEdit(false)
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
        onSelectSlot={(event) => handleSelectedSlot(event)}
        onSelectEvent={(event) => handleSelectedEvent(event)}
      />
      <Dialog open={modalAdd} onClose={handleCloseAdd}>
        <AddEventModal clicked={clickedEvent} 
                  events={events} 
                  setEvents={setEvents} 
                  setModal={setModalAdd} />
      </Dialog>
      <Dialog open={modalEdit} onClose={handleCloseEdit}>
        <EditEventModal clicked={clickedEvent} 
                  events={events} 
                  setEvents={setEvents} 
                  setModal={setModalEdit} />
      </Dialog>
    </div>
  );
}
