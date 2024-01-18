import * as React from 'react';
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
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import EditIcon from '@mui/icons-material/Edit';

export function TableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, onClickEdit, selected } = props;
  console.log('🚀 ~ TableToolbar ~ selected:', selected);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
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
          Suas finanças
        </Typography>
      )}
      {numSelected > 0 && (
        <>
          <Tooltip
            title="Edit"
            onClick={
              numSelected > 1
                ? () => alert('Colocar modal')
                : onClickEdit(selected[0])
            }
          >
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
}
