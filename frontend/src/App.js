import "./App.css";
import Todos from "./todos/Todos.js";
import Settings from "./settings/Settings.js";
import Users from "./users/User.js";
import Calendar from "./calendar/Calendar.js";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Route path="/todos">
        <Todos />
      </Route>
      <Route path="/settings">
        <Settings />
      </Route>
      <Route path="/login">
        <Users />
      </Route>
      <Route path="/calendar">
        <Calendar />
      </Route>
    </BrowserRouter>
  );
}

export default App;
