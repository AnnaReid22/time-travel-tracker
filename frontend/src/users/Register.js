//import * as React from "react";
import React, {useState} from 'react';
import axios from 'axios';
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from 'react-router-dom';
import validator from 'validator';
import { useHistory } from 'react-router-dom';

export default function FormPropsTextFields({ setLoggedIn, setUserID }) {
    let history = useHistory();
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
    const styles = {
        helper: {
             color: 'red'
        }
    }
    function handleChange(event) {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }
    function signUp(event) {
        const userValid = validateSignUp(user)
        setErrors({
            firstName: userValid.errors.firstName,
            lastName: userValid.errors.lastName,
            email: userValid.errors.email,
            password: userValid.errors.password,
            cPass: userValid.errors.cPass
        });
        if (userValid.success)
            makePostCall(user).then(function(postStatus) {
                if (postStatus === 201) {
                    history.push('/todos')
                }
                else {
                    alert("Email already in use, redirecting to login page.")
                    history.push('/login')
                }
            });
    };
    function validateSignUp(user) {
        const errors = {}
        let isValid = true

        if (!user || user.firstName.trim().length === 0) {
            isValid = false
            errors.firstName = "Please enter a first name."
        }
        if (!user || user.lastName.trim().length === 0) {
            isValid = false
            errors.lastName = "Please enter a last name."
        }
        if (!user || user.email.trim().length === 0 || !validator.isEmail(user.email)) {
            isValid = false
            errors.email = "Please enter a valid email address."
        }
        if (!user || user.password.trim().length === 0) {
            isValid = false
            errors.password = "Please enter a password."
        }
        if (!user || user.password !== user.cPass) {
            isValid = false
            errors.cPass = "Passwords do not match."
        }
        return {
            success: isValid,
            errors
        };
    }
    async function makePostCall(user){
        try {
           const response = await axios.post('https://cryptic-bastion-64970.herokuapp.com/users', user);
           if (response.status === 201) {
            setLoggedIn(true)
            setUserID(response.data.email)
            sessionStorage.setItem('userID', JSON.stringify(response.data.email));
            sessionStorage.setItem('loggedIn', JSON.stringify(true));
           }
           return response.status;
        }
        catch (error) {
           console.log(error.message);
           return false;
        }
    }


    return (
        <div className="registerBox">
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
                FormHelperTextProps={{style: styles.helper}}
            />
            <TextField
                required
                name="lastName"
                id="outlined-required"
                label="Last Name"
                style={{ height: "30px", width: "300px", top: 100, left: 450 }}
                value={user.lastName}
                onChange={handleChange}
                helperText={errors.lastName}
                FormHelperTextProps={{style: styles.helper}}
            />
            <TextField
                required
                name="email"
                id="outlined-required"
                label="Email"
                style={{ height: "30px", width: "300px", top: 100, left: 450 }}
                value={user.email}
                onChange={handleChange}
                helperText={errors.email}
                FormHelperTextProps={{style: styles.helper}}
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
                helperText={errors.password}
                FormHelperTextProps={{style: styles.helper}}
            />
            <TextField
                required
                name="cPass"
                id="outlined-password-input"
                label="Confirm Password"
                type="password"
                style={{ height: "30px", width: "300px", top: 100, left: 450 }}
                value={user.cPass}
                onChange={handleChange}
                helperText={errors.cPass}
                FormHelperTextProps={{style: styles.helper}}
            />
            <Button
                variant="outlined"
                style={{ height: "30px", width: "300px", top: 100, left: 450 }}
                startIcon={<LoginIcon />}
                onClick={signUp}
            >
                Sign Up
            </Button>
            <Button 
                component={Link} 
                to="/login" 
                style={{ height: "30px", width: "300px", top: 75, left: 450 }}
                variant="contained" 
                color="primary"
                >
                Log In
            </Button>
            </Stack>
        </div>
    );
}
