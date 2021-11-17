import * as React from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material'
import Confetti from 'react-confetti';
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router';


export default function IconLabelButtons({loggedIn}) {
   
  const history = useHistory();

  const handleRoute = () =>{ 
    history.push("/todos");
  }
  
  const handleRouteCal = () =>{ 
    history.push("/calendar");
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
            <Typography variant="h5" mt={5} ml={-13}>
                {"The actual due date was: "}
            </Typography>
            <Button variant="contained" style={{ height: '45px', width: '310px', top: 10, left: -50 }} onClick={handleRouteCal}>
                Go to Calendar
                
            </Button>
            <Button variant="contained" style={{ height: '45px', width: '310px', top: 80, left: -360}}onClick={handleRoute} >
                Go to Todo
            </Button>
        </Typography>
    );
}