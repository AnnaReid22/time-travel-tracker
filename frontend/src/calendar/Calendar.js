import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

export default function MyCalendar() {
  return (
    <Calendar
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      defaultView="month"
      style={{ height: "100vh" }}
    />
  );
}
