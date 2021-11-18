import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import Filter from "./filter.js";
import { useHistory } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { AddToCompleteModal } from "./completeModals";
import axios from 'axios';
import { useState } from "react";
import moment from "moment";
//TO REDIRECT TO CONFIRMATION PAGE OR OTHER PAGES 
// it works sometimes... its a little odd 
 //  <Redirect to = "/confirmation"/>



function createData(task, duedate, importance, obId, category) {
  return {
    task,
    duedate,
    importance,
    obId,
    category
  };
}




function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        
      ) : null}
        <Button
          variant="outlined"
          style={{ width: "300px", left: 25, top: -15}}
          startIcon={<AddIcon />}
        >
          Apply 
        </Button>
      
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'task',
    numeric: false,
    disablePadding: true,
    label: 'Event',
  },
  {
    id: 'duedate',
    numeric: true,
    disablePadding: false,
    label: 'Due Date',
  },
  {
    id: 'importance',
    numeric: true,
    disablePadding: false,
    label: 'Importance',
  },
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
  },
  {
    id: 'category',
    numeric: true,
    disablePadding: false,
  },
];
const importanceSymbol = ["", "!", "", "!!", "", "!!!", "", "!!!!"]

function EnhancedTableHead(props) {
  const {order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };



  return (
    <TableHead>
    <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
            <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
            >
                <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                    ) : null}
                </TableSortLabel>
            </TableCell>
        ))}
    </TableRow>
</TableHead>
);
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const history = useHistory();


  const handleRouteCom = () =>{ 
    history.push("/completed");
  }


  const { numSelected } = props;
  const { selectedItems } = props;


  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected 
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          To Do List

        <Button variant="outlined" style={{ height: '45px', width: '100px', top: 10, left: 65 }}>
          <AddIcon/>
       Add
      </Button>

        <Button variant="outlined" style={{ height: '45px', width: '150px', top: 10, left: 70 }}>
       All Tasks
      </Button>

      <Button variant="outlined" style={{ height: '45px', width: '150px', top: 10, left:75 }}>
       Today
      </Button>

      <Button variant="outlined" style={{ height: '45px', width: '150px', top: 10, left: 80 }}>
       Week
      </Button>

      <Button variant="outlined" style={{ height: '45px', width: '150px', top: 10, left: 85 }} onClick = {handleRouteCom}>
       Completed 
      </Button>

      <Button variant="outlined" style={{ height: '45px', width: '150px', top: 10, left: 200}} onClick={handleClickOpen}>
        <FilterListIcon />
          Filter
        </Button>

        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Filter Events
            <Filter />
            
          </BootstrapDialogTitle>
        </BootstrapDialog>
        </Typography>
        
      )}

      {numSelected === 1 ? (
          <AddToCompleteModal selectedItems = {selectedItems} />
             
      ) : (
        <div>
          
      </div>
      )}

{numSelected >= 2 ? (
               < Typography
               sx={{ flex: '1 1 100%' }}
               align = "right"
               variant="h6"
               id="tableTitle"
               component="div"
             >
               Please select one event
              </Typography>
      ) : (
        <div>
      </div>
      )}


      

    </Toolbar>

    
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selectedItems: PropTypes.arrayOf(Object),
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('importance');
  //const [orderBy, setOrderBy] = React.useState('importance');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [events, setEvent] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = events.map((n) => n.onId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };


  const handleClick = (event, task) => {
    const selectedIndex = selected.indexOf(task);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, task);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (task) => selected.indexOf(task) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - events.length) : 0;
    const getEventData = async () => {
        try {
            const data = await axios.get("http://localhost:5000/todos");
            const rows = []
            for(let i = 0; i < data.data.length; i++) {
                let resp = data.data[i]
                const date = moment(resp.end).format('L, h:mm a')
                const importance = importanceSymbol[resp.importance]
                rows.push(createData(resp.title, date, importance, resp._id, resp.category))
            }
            setEvent(rows);
        }catch (e) {
            console.log(e);
        }
        };
        React.useEffect(() => {
            getEventData();
        }, []);
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} selectedItems={selected} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={events.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(events, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.obId);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.obId)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.obId}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.task}
                      </TableCell>
                      <TableCell align="right">{row.duedate}</TableCell>
                      <TableCell align="right">{row.importance}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={events.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        sx={{ mb: 1, ml: 2 }}
        label="Dense padding"
      />
    </Box>
  );
}



