import "./App.css";
import Todos from "./todos/Todos.js";
import Settings from "./settings/Settings.js";
import Users from "./users/User.js";
import Calendar from "./calendar/Calendar.js";
import Confirm from "./tasks/confirmationPage.js";
import Finish from "./tasks/finishTaskPage";
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
      <Route path="/confirmation">
        <Confirm />
      </Route>
      <Route path="/finish">
        <Finish />
      </Route>
    </BrowserRouter>
  );
}

export default App;
