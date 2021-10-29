//import * as React from "react";
import React, {useState} from 'react';
import axios from 'axios';
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";

export default function FormPropsTextFields(props) {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        cPass: ""
    });
    const [errors, setErrors] = useState({   
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        cPass: ""
    })
    function handleChange(event) {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }
    function signUp(event) {
        //validatefunc
        const userValid = validateSignUp(user)
        setErrors({
            firstName: userValid.errors.firstName
        });
        if (userValid.success)
            makePostCall(user)
    };
    function validateSignUp(user) {
        const errors = {}
        errors.firstName = "error first name"
        return {
            success: false,
            message: "test",
            errors
        };
    }
    async function makePostCall(user){
        try {
           const response = await axios.post('http://127.0.0.1:5000/users', user);
           if (response.status === 201) {
             console.log("201");
           }
           return response.data;
        }
        catch (error) {
           console.log(error.message);
           return false;
        }
    }

    /* function submitForm() {
        props.handleSubmit(user);
        setUser({ firstName: "", lastName: "", email: "", password: "" });
    } */

    return (
        <Stack direction="column" spacing={5}>
        <label
            style={{ height: "30px", width: "300px", top: 100, left: 450 }}
            Add
            Task
        />
        <TextField
            required
            name="firstName"
            id="outlined-required"
            label="First Name"
            style={{ height: "30px", width: "300px", top: 100, left: 450 }}
            value={user.firstName}
            onChange={handleChange}
            helperText={errors.firstName}
        />
        <TextField
            required
            name="lastName"
            id="outlined-required"
            label="Last Name"
            style={{ height: "30px", width: "300px", top: 100, left: 450 }}
            value={user.lastName}
            onChange={handleChange}
            
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
            type="password"
            style={{ height: "30px", width: "300px", top: 100, left: 450 }}
            value={user.password}
            onChange={handleChange}
        />
        <TextField
            required
            name="cPass"
            id="outlined-password-input"
            label="Confirm Password"
            type="password"
            style={{ height: "30px", width: "300px", top: 100, left: 450 }}
            onChange={handleChange}
        />
        <Button
            variant="outlined"
            style={{ height: "30px", width: "300px", top: 100, left: 450 }}
            startIcon={<LoginIcon />}
            onClick={signUp}
        >
            Sign Up
        </Button>
        </Stack>
    );
}
