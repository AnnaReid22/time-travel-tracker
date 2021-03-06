import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { MenuItem } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { Checkbox } from '@mui/material';
import { FormGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import axios from 'axios';
import moment from "moment";
import { useEffect } from 'react';

export default function EditEventModal ({clicked, events, setEvents, setModal}) { 
    const [startDate, setStartDate] = React.useState(clicked.start);
    const [endDate, setEndDate] = React.useState(clicked.end);
    const [category, setCategory] = React.useState(clicked.category);
    const [important, setImportance] = React.useState(clicked.importance);
    const [givenStart, setGivenStart] = React.useState(clicked.givenStart);
    const [givenEnd, setGivenEnd] = React.useState(clicked.givenEnd);
    const [title, setTitle] = React.useState(clicked.title);
    const [description, setDescription] = React.useState(clicked.description);
    const [doNotPush, setDoNotPush] = React.useState(clicked.doNotPush);
    const [importChanged, setImportChanged] = React.useState(false);
    const [dateChanged, setDateChanged] = React.useState(false);
    const [importanceMeter, setImportanceMeter] = React.useState([
        {
          value: 1,
          label: '!',
        },
        {
          value: 3,
          label: '!!',
        },
        {
          value: 5000,
          label: '!!!',
        },
        {
          value: 7,
          label: '!!!!',
        },
      ]);

    useEffect(() => {
        async function initializeImportanceMeter() {
          setImportanceMeter(await getImportanceMeter());
        }
        initializeImportanceMeter();
    }, []);

    function handleClose() {
        setModal(false)
    }

    const handleChangeStartDate = (date) => {
        setStartDate(date);
        setGivenStart(date);
        setDateChanged(true);
    };

    const handleChangeEndDate = (date) => {
        setEndDate(date);
        setGivenEnd(date);
        setDateChanged(true);
    };

    const handleChangeDoNotPush = () => {
        setDoNotPush(!doNotPush)
    }

    const handleChangeCategory = (cat) => {
        setCategory(cat.target.value);
      };

    const handleChangeImportance = (im) => {
        setImportance(im.target.value);
        setImportChanged(true);
      };

    async function deleteEvent(){
        try {
            const response = await axios.delete('http://localhost:5000/todos/' + clicked._id);
            if(response.status === 204){
                events = events.filter(e => e._id !== clicked._id)
                setEvents([...events])
            }
            else {
                console.log("Error, event not deleted from database.")
            }
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    async function updateEvent(){
        var event = {
            title: title,
            start: startDate,
            end: endDate,
            description: description,
            importance: important,
            givenStart: givenStart,
            givenEnd: givenEnd,
            category: category,
            doNotPush: doNotPush,
            importChanged: importChanged,
            dateChanged: dateChanged,
            completed: false,
            display: true
        }
        try {
            if (!doNotPush && (importChanged || dateChanged)) {
                event.start = moment(givenStart).subtract(important, 'day');
                event.end = moment(givenEnd).subtract(important, 'day');
                var difference = moment(event.end).diff(event.start, 'hours')
                var today = new Date();
                if (event.start < today) {
                    event.start = today.setHours(0,0,0,0);
                    event.end = moment(event.start).add(difference, 'hours');
                }
            }
            const response = await axios.put('http://localhost:5000/todos/' + clicked._id, event);
            if(response.status === 204){
                events = events.filter(e => e._id !== clicked._id)
                event["_id"] = clicked._id
                setEvents([...events, event])
            }
            else {
                console.log("Error, event not deleted from database.")
            }
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    async function handleDelete(){
        await deleteEvent()
        setModal(false)
        window.location.reload(false);
    }
    async function handleUpdate(){
        await updateEvent()
        setModal(false)
        window.location.reload(false);
    }
    async function getImportanceMeter() {
        try {
          const response = await axios.get('http://localhost:5000/user/'+ sessionStorage.getItem("userID").replaceAll("\"", ""));
          if (response.status === 201) {
            console.log("Account found");
            var user = response.data;
            return user.importanceMeter
          }
          else {
            console.log("Error, account not found.")
          }
        }
        catch (error) {
          console.log(error.message)
          return false;
        }
      }

      const categories = [
        {
          value: 'School',
          label: 'School',
        },
        {
          value: 'Work',
          label: 'Work',
        },
        {
          value: 'Other',
          label: 'Other',
        },
      ];

    return (
        <div>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogContent >
                <DialogContentText style={{marginBottom: "30px"}}>
                    Please modify the information below to edit the event!
                </DialogContentText>
                <DateTimePicker
                    label="Start"
                    value={startDate}
                    onChange={handleChangeStartDate}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DateTimePicker
                    label="End"
                    value={endDate}
                    onChange={handleChangeEndDate}
                    renderInput={(params) => <TextField {...params} />}
                />
                <FormGroup style={{marginBottom: "30px"}}>
                    <FormControlLabel control=
                        {<Checkbox
                             checked={doNotPush}
                             onChange={handleChangeDoNotPush}   
                        />} label="Do NOT Push Up Date" />
                </FormGroup>
                <TextField
                    select
                    label="Select"
                    value={important}
                    onChange={handleChangeImportance}
                    helperText="Importance"
                    >
                    {importanceMeter.map((option) => (
                        <MenuItem key={option.label} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    label="Select"
                    value={category}
                    onChange={handleChangeCategory}
                    helperText="Please select a category"
                    >
                    {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                margin="dense"
                autoFocus
                id="name"
                label="Title"
                fullWidth
                variant="standard"
                value={title}
                onChange={(event) => {setTitle(event.target.value)}}
                />
                <TextField
                margin="dense"
                label="Description"
                fullWidth
                variant="standard"
                value={description}
                onChange={(event) => {setDescription(event.target.value)}}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDelete}>Delete</Button>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleUpdate}>Update</Button>
            </DialogActions>
        </div>
    );
}