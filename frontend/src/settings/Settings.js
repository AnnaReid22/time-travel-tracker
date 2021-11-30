import * as React from "react";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Stack from "@mui/material/Stack";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Redirect } from "react-router";
import { Dialog, DialogTitle, DialogContent, Modal } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Close from "@mui/icons-material/Close";
import Check from "@mui/icons-material/Check";
import axios from "axios";

export default function IconLabelButtons({loggedIn, setLoggedIn}) {
  const [openProfile, setOpenProfile] = React.useState(false);
  const [openPreferences, setOpenPreferences] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

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
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  function handleLogout(){
    setLoggedIn(false)
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('userID');
  }

  function printUser() {
    return sessionStorage.getItem("userID");
  };

  async function deleteUser() {
    try {
      const response = await axios.delete('http://localhost:5000/user/'+ sessionStorage.getItem("userID").replaceAll("\"", ""));
        if (response.status === 201) {
          console.log("Successful account deletion");
          handleLogout();
        }
        else {
          console.log("Error, account not deleted from database.")
        }
    }
    catch (error) {
      console.log(error.message)
      console.log("hey")
      return false;
    }
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
      <Button
        variant="outlined"
        style={{ height: "30px", width: "300px", top: 100, left: 450 }}
        onClick={handleOpenDelete}
        startIcon={<DeleteForeverIcon />}
      >
        Delete Account
      </Button>

      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
      >
        <div style={{backgroundColor: 'white'}}>
          <DialogTitle style={{color:'black', justifyContent:"center"}}>
            Are you sure you want to delete your account?
          </DialogTitle>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              onClick={deleteUser}
              startIcon={<Check />}
              style={{marginLeft:"10px", marginBottom:"5px"}}>
                Yes
            </Button>
            <Button
              onClick={handleCloseDelete}
              startIcon={<Close />}
              style={{marginRight:"10px", marginBottom:"5px"}}>
                No
            </Button>
          </Stack>
        </div>
      </Modal>

    </Stack>
  );
}
