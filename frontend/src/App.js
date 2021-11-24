import { useState } from "react";
import "./App.css";
import Todos from "./todos/Todos.js";
import Settings from "./settings/Settings.js";
import Users from "./users/User.js";
import Register from "./users/Register.js";
import Calendar from "./calendar/Calendar.js";
import Finish from "./tasks/finishTaskPage";
import Complete from "./todos/completedTodos.js";
import { BrowserRouter, Route } from "react-router-dom";
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from "@mui/lab/LocalizationProvider";

function getLoggedIn() {
  const tokenString = sessionStorage.getItem('loggedIn');
  const userToken = JSON.parse(tokenString);
  if(userToken){
    return true
  }
  else{
    return false
  }
}

function getUserID() {
  const tokenString = sessionStorage.getItem('userID');
  const userToken = JSON.parse(tokenString);
  if(userToken){
    return userToken
  }
  else{
    return ""
  }
}

function App() {
  const [loggedIn, setLoggedIn] = useState(getLoggedIn() ? true : false );
  const [userID, setUserID] = useState(getUserID());
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <BrowserRouter>
        <Route path="/login" >
          <Users setLoggedIn={setLoggedIn} setUserID={setUserID}/>
        </Route>
        <Route path="/todos">
          <Todos loggedIn={loggedIn} userID={userID}/>
        </Route>
        <Route path="/settings">
          <Settings setLoggedIn={setLoggedIn} loggedIn={loggedIn} setUserID={setUserID}/>
        </Route>
        <Route path="/register">
          <Register setLoggedIn={setLoggedIn} setUserID={setUserID}/>
        </Route>
        <Route path="/calendar">
          <Calendar loggedIn={loggedIn} userID={userID}/>
        </Route>
        <Route path="/finish">
          <Finish loggedIn={loggedIn} userID={userID}/>
        </Route>
        <Route path="/completed">
          <Complete loggedIn={loggedIn} userID={userID}/>
        </Route>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
