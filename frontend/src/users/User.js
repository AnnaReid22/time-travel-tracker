import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";

export default function FormPropsTextFields() {
  return (
    <Stack direction="column" spacing={5}>
      <label
        style={{ height: "30px", width: "300px", top: 100, left: 450 }}
        Add
        Task
      />
      <TextField
        required
        id="outlined-required"
        label="Email"
        style={{ height: "30px", width: "300px", top: 100, left: 450 }}
      />
      <TextField
        required
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        style={{ height: "30px", width: "300px", top: 100, left: 450 }}
      />
      <Button
        variant="outlined"
        style={{ height: "30px", width: "300px", top: 100, left: 450 }}
        startIcon={<LoginIcon />}
      >
        Log In
      </Button>
    </Stack>
  );
}
