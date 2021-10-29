import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Button from "@mui/material/Button";

import DeleteIcon from "@mui/icons-material/Delete";
export default function InsetList() {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        top: 100,
        left: 450,
        bgcolor: "background.paper",
      }}
      aria-label="inGroup"
    >
      <label>Group Members</label>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <AdminPanelSettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Jen" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <PersonOutlineIcon />
          <ListItemText inset primary="Anna" />
        </ListItemButton>
      </ListItem>
      <Button
        variant="outlined"
        style={{ height: "30px", width: "300px" }}
        startIcon={<DeleteIcon />}
      >
        Delete Member
      </Button>
    </List>
  );
}
