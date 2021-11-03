import * as React from 'react';
import Button from '@mui/material/Button';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import Confetti from 'react-confetti'



export default function IconLabelButtons() {
  //const { width, height } = useWindowSize()
  return (
    <Typography variant="h5" mt = {20} ml = {45}>
    {"Are you sure you are done with this task?"}
    <Stack direction="column" spacing={4}>
      <Button variant="contained" style={{ height: '45px', width: '310px', top: 10, left: 65 }} startIcon={<DoneAllIcon />}>
        Yes, add to my completed list
      </Button>
      <Button variant="contained" style={{ height: '45px', width: '310px', top: 10, left: 65 }} startIcon={<RemoveDoneIcon />}>
        No, leave as not complete
      </Button>
    </Stack>
    </Typography>
  );
}






