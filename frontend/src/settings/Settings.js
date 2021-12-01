import * as React from "react";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Stack from "@mui/material/Stack";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Redirect } from "react-router";
import { DialogTitle, DialogContent, Modal } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Close from "@mui/icons-material/Close";
import Check from "@mui/icons-material/Check";
import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

export default function IconLabelButtons({loggedIn, setLoggedIn}) {
  const [openProfile, setOpenProfile] = React.useState(false);
  const [openPreferences, setOpenPreferences] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [importanceMeter, setImportanceMeter] = React.useState([
    {
      value: 1,
      label: '!',
    },
    {
      value: 3,
      label: '!!',
    },
    {
      value: 5000,
      label: '!!!',
    },
    {
      value: 7,
      label: '!!!!',
    },
  ]);

  useEffect(() => {
    async function initializeImportanceMeter() {
      console.log("i hate react")
      setImportanceMeter(await getImportanceMeter());
    }
    initializeImportanceMeter();
  }, []);

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
    async function initializeImportanceMeter() {
      setImportanceMeter(await getImportanceMeter());
    }
    initializeImportanceMeter();
    setOpenPreferences(false);
  };
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  function handleChange(event){
    for (let i in importanceMeter) {
      if (importanceMeter[i].label === event.target.name) {
        importanceMeter[i].value = event.target.value;
        break;
      }
    }
  }

  function handleLogout(){
    setLoggedIn(false)
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('userID');
  }

  function printUser() {
    return sessionStorage.getItem("userID");
  };

  async function getImportanceMeter() {
    try {
      const response = await axios.get('http://localhost:5000/user/'+ sessionStorage.getItem("userID").replaceAll("\"", ""));
      if (response.status === 201) {
        console.log("Account found");
        var user = response.data;
        console.log(user)
        console.log(user.importanceMeter)
        return user.importanceMeter
      }
      else {
        console.log("Error, account not found.")
      }
    }
    catch (error) {
      console.log(error.message)
      console.log("hey")
      return false;
    }
  }

  async function putImportanceMeter(){
    const email = sessionStorage.getItem("userID").replaceAll("\"", "")
    const importanceMeterContainer = {
        importanceArray: importanceMeter
    }
    try {
        const response = await axios.put('http://localhost:5000/user/' + email, importanceMeterContainer);
        if(response.status === 201){
             console.log("Importance meter updated on backend")
        }
        else {
            console.log("Error, importance meter not updated.")
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
    setOpenPreferences(false)
}

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
        onClick={handleOpenPreferences}
        variant="outlined"
        style={{ height: "30px", width: "300px", top: 100, left: 450 }}
        startIcon={<SettingsIcon />}
      >
        Preferences
      </Button>

      <Modal
        open={openPreferences}
        onClose={handleClosePreferences}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        component="form"
      >
        <div style={{backgroundColor: 'white', height:"450px", width:"545px"}}>
          <DialogTitle style={{color:'black', marginBottom:"10px"}}>
            Edit Date Adjustment Levels By Importance
          </DialogTitle>
          <Stack direction="row" spacing={2}>
            <DialogContent style={{color:'black', marginLeft:"40px", marginBottom:"20px"}}>!: Adjustment in Days</DialogContent>
            <TextField
              required
              type="number"
              name="!"
              label="!"
              id="outlined-required"
              defaultValue={importanceMeter[0].value}
              onChange={handleChange}
              style={{marginRight:"80px", marginBottom: "20px"}}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <DialogContent style={{color:'black', marginLeft:"39px", marginBottom:"20px"}}>!!: Adjustment in Days</DialogContent>
            <TextField
              required
              type="number"
              name="!!"
              label="!!"
              id="outlined-required"
              defaultValue={importanceMeter[1].value}
              onChange={handleChange}
              style={{marginRight:"80px", marginBottom: "20px"}}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <DialogContent style={{color:'black', marginLeft:"38px", marginBottom:"20px"}}>!!!: Adjustment in Days</DialogContent>
            <TextField
              required
              type="number"
              name="!!!"
              label="!!!"
              id="outlined-required"
              defaultValue={importanceMeter[2].value}
              onChange={handleChange}
              style={{marginRight:"80px", marginBottom: "20px"}}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <DialogContent style={{color:'black', marginLeft:"37px", marginBottom:"20px"}}>!!!!: Adjustment in Days</DialogContent>
            <TextField
              required
              type="number"
              name="!!!!"
              label="!!!!"
              id="outlined-required"
              defaultValue={importanceMeter[3].value}
              onChange={handleChange}
              style={{marginRight:"80px", marginBottom: "10px"}}
            />
          </Stack>
          <Stack direction="row" justifyContent="left" marginLeft="15px" marginTop="5px">
            <Button onClick={handleClosePreferences}>
              Cancel
            </Button>
            <Button onClick={putImportanceMeter}>
              Save
            </Button>
          </Stack>
        </div>
      </Modal>

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
          <DialogContent style={{color:'black', justifyContent:"center"}}>
            Are you sure you want to delete your account?
          </DialogContent>
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
