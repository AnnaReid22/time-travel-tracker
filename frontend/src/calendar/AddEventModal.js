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

export default function AddEventModal ({clicked, events, setEvents, setModal}) { 
    const [startDate, setStartDate] = React.useState(clicked.start);
    const [endDate, setEndDate] = React.useState(clicked.end);
    const [category, setCategory] = React.useState('Other');
    const [important, setImportance] = React.useState('!');
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [doNotPush, setDoNotPush] = React.useState(false);

    function handleClose() {
        setModal(false)
    }

    const handleChangeStartDate = (date) => {
        setStartDate(date);
    };

    const handleChangeEndDate = (date) => {
        console.log(date)
        setEndDate(date);
    };

    const handleChangeDoNotPush = () => {
        setDoNotPush(!doNotPush);
    }

    const handleChangeCategory = (cat) => {
        setCategory(cat.target.value);
      };

    const handleChangeImportance = (im) => {
        setImportance(im.target.value);
      };

    async function addNewEvent(){
        var event = {
            title: title,
            start: startDate,
            end: endDate,
            description: description,
            importance: important,
            givenStart: startDate,
            givenEnd: endDate,
            category: category,
            doNotPush: doNotPush,
            completed: false
        }
        try {
            if (!doNotPush) {
                var today = new Date();
                event.start = moment(startDate).subtract(important, 'day');
                event.end = moment(endDate).subtract(important, 'day');
                var difference = moment(event.end).diff(event.start, 'hours');
                if (event.start < today) {
                    event.start = today.setHours(0,0,0,0);
                    event.end = moment(event.start).add(difference, 'hours');
                }
            }
            const response = await axios.post('http://localhost:5000/todos', event);
            if(response.status === 201 && event.givenStart >= today.setHours(0,0,0,0)){
                setEvents([...events, response.data])
            }
            else if (event.givenStart < today.setHours(0,0,0,0)) {
                alert("Please select a date that has not passed.")
                console.log("Error, event not added to database.")
            }
            else {
                console.log("Error, event not added to database.")
            }
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    const handleSubmit = () => {
        addNewEvent()
        setModal(false)
    }

    const importance = [
        {
          value: 1,
          label: '!',
        },
        {
          value: 3,
          label: '!!',
        },
        {
          value: 5,
          label: '!!!',
        },
        {
          value: 7,
          label: '!!!!',
        },
      ];

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
            <DialogTitle>Add Event</DialogTitle>
            <DialogContent >
                <DialogContentText style={{marginBottom: "30px"}}>
                    Please enter the information below to add a new event!
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
                             onClick={handleChangeDoNotPush}   
                        />} label="Do NOT Push Up Date" />
                </FormGroup>
                <TextField
                    select
                    label="Select"
                    value={important}
                    onChange={handleChangeImportance}
                    helperText="Importance"
                    >
                    {importance.map((option) => (
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
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Add</Button>
            </DialogActions>
        </div>
    );
}