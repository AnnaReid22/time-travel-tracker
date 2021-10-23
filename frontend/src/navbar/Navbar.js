import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import logo from '../images/logo_outline.png';
import styles from './navbar.module.css';


export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                        <a href="../todos/Todos.js">
                            <img src={logo} alt="logo" className={styles.navImage}/>
                        </a>
                    </Typography>
                    <Button color="inherit">
                        <a href="../todos/Todos.js">
                            <Typography>
                                To Dos
                            </Typography>
                        </a>
                    </Button>
                    <Button color="inherit">
                        <a href="../calendar/Calendar.js">
                            <Typography>
                                Calendar
                            </Typography>
                        </a>
                    </Button>
                    <Button color="inherit">
                        <a href="../settings/Settings.js">
                            <Typography>
                                Settings
                            </Typography>
                        </a>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}