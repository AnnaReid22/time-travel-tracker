import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export function AddToCompleteModal (items) { 
    const history = useHistory();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleRouteComplete = () =>{ 
        setCompleteToTrue()
        history.push("/finish");
    }
    async function setCompleteToTrue(){
        const ids = items["selectedItems"]
        for(let i = 0; i < ids.length; i++) {
            const completed = {
                completed: true
            }
            try {
                const response = await axios.put('http://localhost:5000/todos/completed/' + ids[i], completed);
                if(response.status === 204){
                    console.log("completed was set to false")
                }
                else {
                    console.log("Error, event not deleted from database.")
                }
            }
            catch (error) {
                console.log(error);
                return false;
            }
        }
    }
    return (
        <div>
         <IconButton >
             <CheckIcon onClick={handleOpen}/>     
         </IconButton>
         <Modal
             open={open}
             onClose={handleClose}
             aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description"
         >
         <Box sx={style}>
           <Typography id="modal-modal-title" variant="h5" component="h2"align={"center"}>
            Have you completed this task?
             <Stack direction="column" spacing={4}>
                 <Button variant="contained" style={{ height: '45px', width: '310px', top: 10, left: 45 }} startIcon={<DoneAllIcon />}  onClick={handleRouteComplete}>
                    Yes, add to my completed list
                 </Button>
                 <Button variant="contained" style={{ height: '45px', width: '310px', top: 10, left: 45 }} startIcon={<RemoveDoneIcon />} onClick={handleClose}>
                    No, leave as not complete
                 </Button>
             </Stack>
           </Typography>
         </Box>
       </Modal>
     </div>
    )
}
export function RemoveFromCompleteModal (items) { 
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleRouteTodo = () =>{ 
        setCompleteToFalse()
        history.push("/todos");
    }
    async function setCompleteToFalse(){
        const ids = items["selectedItems"]
        for(let i = 0; i < ids.length; i++) {
            const completed = {
                completed: false
            }
            try {
                const response = await axios.put('http://localhost:5000/todos/completed/' + ids[i], completed);
                if(response.status === 204){
                    console.log("completed was set to false")
                }
                else {
                    console.log("Error, event not deleted from database.")
                }
            }
            catch (error) {
                console.log(error);
                return false;
            }
        }
    }
    return (
        <div>
            <IconButton >
                <RemoveDoneIcon onClick={handleOpen}/>     
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    Add this task back to your todo list?
                    <Stack direction="column" spacing={4}>
                        <Button variant="contained" style={{ height: '45px', width: '310px', top: 10, left: 45 }} startIcon={<DoneAllIcon />}  onClick={handleRouteTodo}>
                            Yes, add to my todo list
                        </Button>
                        <Button variant="contained" style={{ height: '45px', width: '310px', top: 10, left: 45 }} startIcon={<RemoveDoneIcon />} onClick={handleClose}>
                            No, leave as complete
                        </Button>
                    </Stack>
                  </Typography>
                </Box>
              </Modal>
            </div>
    )
}