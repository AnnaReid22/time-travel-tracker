import React, {useState} from 'react';
import axios from 'axios';
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function FormPropsTextFields() {
  let history = useHistory();
  const [user, getUser] = useState({
    email: "",
    password: "",
});
  function handleChange(event) {
    getUser({
        ...user,
        [event.target.name]: event.target.value
    });
}

function login(event) {
  findUser(user).then(function(result) {
  if(result === 200){
    console.log(result)
    history.push('/todos')
  }
  else{
    alert("Incorrect Email/Password Combination")
    console.log("not logged in")
  }
});
  
};

async function findUser(user){
  try {
     const response = await axios.post('http://127.0.0.1:5000/login', user);
     if (response.status === 200) {
       return 200
     }
     return false;  
    }
  catch (error) {
     console.log(error.message);
     return 401;
  }
}
  return (
    <Stack direction="column" spacing={5}>
      <label
        style={{ height: "30px", width: "300px", top: 100, left: 450 }}
        Add
        Task
      />
      <TextField
        required
        name="email"
        id="outlined-required"
        label="Email"
        style={{ height: "30px", width: "300px", top: 100, left: 450 }}
        value={user.email}
        onChange={handleChange}
      />
      <TextField
        required
        name="password"
        id="outlined-password-input"
        label="Password"
        value={user.password}
        type="password"
        autoComplete="current-password"
        style={{ height: "30px", width: "300px", top: 100, left: 450 }}
        onChange={handleChange}
      />
      <Button
        variant="outlined"
        style={{ height: "30px", width: "300px", top: 100, left: 450 }}
        startIcon={<LoginIcon />}
        onClick={login}
      >
        Log In
      </Button>
      <Button 
        component={Link} 
        to="/register" 
        style={{ height: "30px", width: "300px", top: 75, left: 450 }}
        variant="contained" 
        color="primary"
        >
        Register
      </Button>
    </Stack>
  );
}
