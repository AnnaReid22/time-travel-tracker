import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const importanceSymbol = ["", "!", "", "!!", "", "!!!", "", "!!!!"]


const filters = [
  'School',
  'Work',
  'Other',
  '!',
  '!!',
  '!!!',
  '!!!!'

];


function getStyles(label, filter, theme) {
  return {
    fontWeight:
      filter.indexOf(label) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip() {
  const theme = useTheme();
  const [filter, setFilter] = React.useState([]);

  const handleClear = (event) => {
    setFilter(
      []
    )
  }

  async function fetchAll() {
    try {
      const response = await axios.get("http://localhost:5000/todos");
      // console.log(response.data);
      return response.data;
    }
    catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  };

  // //ACTUAL ALL BUTTON ACTION
  async function applyFilters() {
    const data = await fetchAll()
    console.log(filter);

    for (let i = 0; i < data.length; i++) {
      console.log("checking");
      const display = {
        display: true
      }
      const displayF = {
        display: false
      }

      try {
        const importance = importanceSymbol[data[i].importance]
        if (filter.includes(importance) || filter.includes(data[i].category)) {
          await axios.put('http://localhost:5000/todos/id/' + data[i]._id, display);
        }
        else {
          await axios.put('http://localhost:5000/todos/id/' + data[i]._id, displayF);
        }
      }
      catch (error) {
        console.log(error);
        return false;
      }
    }
    window.location.reload(false);
  }
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilter(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 3, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Filters</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={filter}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Filters" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {filters.map((label) => (
            <MenuItem
              key={label}
              value={label}
              style={getStyles(label, filter, theme)}
            //displays options 
            >
              {label}
            </MenuItem>
          ))}
        </Select>

        {
          <div class="btn-group">
            <Button onClick={handleClear}
              variant="outlined"
              style={{ width: "300px", top: 5 }}
              startIcon={< ClearIcon />}
            >
              Clear
            </Button>
            <Button onClick={applyFilters}
              variant="outlined"
              style={{ width: "300px", top: 10 }}
            >
              Apply
            </Button>
          </div>
        }

      </FormControl>

    </div>

  );
}
