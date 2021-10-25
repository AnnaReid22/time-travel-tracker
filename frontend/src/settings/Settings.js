import * as React from 'react';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Stack from '@mui/material/Stack';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

export default function IconLabelButtons() {
  return (
    <Stack direction="column" spacing={4}>
      <Button variant="outlined" style={{height: '30px', width : '300px', top: 100, left: 450}} startIcon={<AccountCircleIcon />}>
        Profile
      </Button>
      <Button variant="outlined" style={{height: '30px', width : '300px', top: 100, left: 450}} startIcon={<SettingsIcon />}>
        Preferences 
      </Button> 
      <Button variant="outlined" style={{height: '30px', width : '300px', top: 100, left: 450}} startIcon={<LogoutIcon />}>
        LogOut 
      </Button> 
    </Stack>
  );
}
