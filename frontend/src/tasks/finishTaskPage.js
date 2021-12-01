import * as React from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material'
import Confetti from 'react-confetti';
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router';
import moment from "moment";


export default function IconLabelButtons({loggedIn}) {
   
  const history = useHistory();
  const handleRoute = () =>{ 
    history.push("/todos");
  }
  var data = sessionStorage.getItem('objectToPass')
  const title = getTitle(data)
    
  function getTitle(data){
    var title = JSON.parse(data).title
    console.log(title)
    return title
  }
  const time = getTime(data)
  function getTime(data){
    var date = JSON.parse(data).time
    console.log(date)
    date = moment(date).format('L, h:mm a');
    return date
  }

  const handleRouteCal = () =>{ 
    history.push("/calendar");
  }
  const handleRouteCom = () =>{ 
    history.push("/completed");
  }
  if(!loggedIn){
    return <Redirect to="/login"></Redirect>
  }
    return (
        <Typography variant="h4" mt={20} ml={60}>
            {"You did it!"}
            <Typography variant="h4" mt={0} ml={-13}>
                {"You are a time traveler!"}
            </Typography>
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
            />
            <Typography variant="h5" mt={5} ml={-25} >
            The actual due date for "<b>{title}</b>" is <b>{time}</b>
            </Typography>
         
            <Button variant="contained" style={{ height: '45px', width: '310px', top: 10, left: -50 }} onClick={handleRouteCal}>
                Go to Calendar
                
            </Button>
            <Button variant="contained" style={{ height: '45px', width: '310px', top: 80, left: -360}}onClick={handleRoute} >
                Go to Todo
            </Button>
            <Button variant="contained" style={{ height: '45px', width: '310px', top: 100, left: -50}}onClick={handleRouteCom} >
                Go to Completed
            </Button>
        </Typography>
    );
}