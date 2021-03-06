import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export default function SelectAutoWidth() {
  const [Category, setCategory] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <Stack direction="column" spacing={5}>
        <TextField
          required
          id="outlined"
          label="Task"
          style={{ height: "30px", width: "300px", top: 100, left: 450 }}
        />
        <TextField
          required
          id="outlined"
          label="Due Date"
          style={{ height: "30px", width: "300px", top: 100, left: 450 }}
        />
        <Button
          variant="outlined"
          style={{ height: "30px", width: "300px", top: 200, left: 450 }}
          startIcon={<AddIcon />}
        >
          Add Task
        </Button>
        <FormControl sx={{ top: 30, left: 450, maxWidth: 300 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={Category}
            onChange={handleChange}
            autoWidth
            label="Category"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"School"}>School</MenuItem>
            <MenuItem value={"Work"}>Work</MenuItem>
            <MenuItem value={"Soccer"}>Soccer</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </div>
  );
}
