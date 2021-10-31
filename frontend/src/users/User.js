import React, {useState} from 'react';
import axios from 'axios';
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";

export default function FormPropsTextFields() {
  const [user, getUser] = useState({
    email: "",
    password: "",
});
const [errors, setErrors] = useState({   
  email: "",
})
  function handleChange(event) {
    getUser({
        ...user,
        [event.target.name]: event.target.value
    });
}
function login(event) {
  findUser(user)
};
async function findUser(user){
  try {
     const response = await axios.post('http://127.0.0.1:5000/login', user);
     if (response.status === 200) {
       console.log("logged in")
     }
     return response.data  }
  catch (error) {
     console.log(error.message);
     return false;
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
    </Stack>
  );
}
