import { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Dialog from '@mui/material/Dialog';
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import { Redirect } from "react-router";

const localizer = momentLocalizer(moment);
let allViews = Object.keys(Views).map(k => Views[k])

export default function MyCalendar({loggedIn, userID}) {
  const [events, setEvents]= useState([]);
  const [modalAdd, setModalAdd]= useState(false);
  const [modalEdit, setModalEdit]= useState(false);
  const [clickedEvent, setClickedEvent]= useState({});

  useEffect(() => { 
    async function getEvents(){
      try {
        const response = await axios.get('https://cryptic-bastion-64970.herokuapp.com/todos/' + userID);
        if(response.status === 201){
        for(let i = 0; i < response.data.length; i++) {
          let resp = response.data[i]
          resp.start = new Date(resp.start)
          resp.end = new Date(resp.end)
        }
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
  }, [userID]);

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
  if(!loggedIn){
    return <Redirect to="/login"></Redirect>
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
                  setModal={setModalAdd}
                  userID={userID}
                   />
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
