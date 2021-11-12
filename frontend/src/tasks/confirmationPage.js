import * as React from 'react';
import Button from '@mui/material/Button';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { useHistory } from "react-router-dom";

export default function IconLabelButtons() {
  const history = useHistory();

  const handleRoute = () =>{ 
    history.push("/finish");
  }
  
  const handleRouteT = () =>{ 
    history.push("/todos");
  }

  //const { width, height } = useWindowSize()
  return (
    <Typography variant="h5" mt = {20} ml = {45}>
    {"Are you sure you are done with this task?"}
    <Stack direction="column" spacing={4}>
      <Button variant="contained" style={{ height: '45px', width: '310px', top: 10, left: 65 }} startIcon={<DoneAllIcon />}  onClick={handleRoute}>
        Yes, add to my completed list
      </Button>
      <Button variant="contained" style={{ height: '45px', width: '310px', top: 10, left: 65 }} startIcon={<RemoveDoneIcon />}  onClick={handleRouteT}>
        No, leave as not complete
      </Button>
    </Stack>
    </Typography>
  );
}






