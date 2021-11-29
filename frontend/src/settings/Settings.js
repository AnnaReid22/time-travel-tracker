import * as React from "react";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Stack from "@mui/material/Stack";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Redirect } from "react-router";
import { Dialog, DialogTitle, DialogContent, Modal } from "@mui/material";
import { hydrate } from "react-dom";

export default function IconLabelButtons({loggedIn, setLoggedIn}) {
  const [openProfile, setOpenProfile] = React.useState(false);
  const [openPreferences, setOpenPreferences] = React.useState(false);

  const handleOpenProfile = () => {
    setOpenProfile(true);
  };
  const handleCloseProfile = () => {
    setOpenProfile(false);
  };
  const handleOpenPreferences = () => {
    setOpenPreferences(true);
  };
  const handleClosePreferences = () => {
    setOpenPreferences(false);
  };

  function handleLogout(){
    setLoggedIn(false)
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('userID');
  }

  function printUser() {
    return sessionStorage.getItem("userID");
  };

  if(!loggedIn){
    return <Redirect to="/login"></Redirect>
  }

  return (
    <Stack direction="column" spacing={4}>
      <Button
        variant="outlined"
        style={{ height: "30px", width: "300px", top: 100, left: 450 }}
        startIcon={<AccountCircleIcon />}
        onClick={handleOpenProfile}
      >
        Profile
      </Button>

      <Modal
        open={openProfile}
        onClose={handleCloseProfile}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
      >
        <div style={{backgroundColor: 'white'}}>
          <DialogTitle style={{color:'black'}}>
            Profile Info
          </DialogTitle>
          <DialogContent style={{color:'black'}}>
            Username: <span id="userEmail" style={{color:'black'}}>{printUser()}</span>
          </DialogContent>
          <Button 
            onClick={handleCloseProfile}
            style={{marginLeft:"5px", marginBottom:"5px"}}>
              Close
          </Button>
        </div>
      </Modal>

      <Button
        variant="outlined"
        style={{ height: "30px", width: "300px", top: 100, left: 450 }}
        startIcon={<SettingsIcon />}
      >
        Preferences
      </Button>
      <Button
        variant="outlined"
        style={{ height: "30px", width: "300px", top: 100, left: 450 }}
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
      >
        LogOut
      </Button>
    </Stack>
  );
}
