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


const filters = [
'School',
'Work', 
'Personal',
'!', 
'!!',
'!!!',

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

const handleClear = (event)=>{
  setFilter(
    []
  )
}
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilter(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

    console.log(filter);
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
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
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
        { <Button onClick = {handleClear}
          variant="outlined"
          style={{ width: "300px", top:5 }}
          startIcon={< ClearIcon/>}
        >
          Clear 
        </Button>
        /*
        <Button onClick={handleClose}
          variant="outlined"
          style={{ width: "300px", top: 10}}
          startIcon={<AddIcon />}
        >
          Apply 
        </Button> */}
        
      </FormControl>
     
    </div>

  );
}
