import { useState, useMemo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Checkbox from '@mui/material/Checkbox';

import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { getComparator, stableSort, Order } from '../helpers';
import TableFilter from '../TableFilter';
import Box from '@mui/material/Box';

// TODO: refactor this compontent
// TODO: clean states this component and of reducer

export default function BasicTable({
  rows,
  columns,
  rowsPerPageOptions = [10],
  dense,
  fetchNewPage,
  count,
}) {
  const [page, setPage] = useState(0);
  const [pageCache, setPageCache] = useState([0]);

  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState('title');
  const [selected, setSelected] = useState<readonly number[]>([]);

  // DE FILTER
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // DE PAGINATION
  const handleChangePage = async (_, newPage: number) => {
    const pageAlreadySentRequest = pageCache.some((page) => page === newPage);

    if (!pageAlreadySentRequest) {
      await fetchNewPage({ page: newPage, pageSize: rowsPerPage })();
    }

    setPageCache((prev) => prev.concat(newPage));
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, rowsPerPage));

    setPage(0);
  };

  //  DE     TABLE BODY
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const visibleRows = useMemo(
    () =>
      rows.slice(
        //TODO: fix error to filter elements
        page * rowsPerPage, // 0 * 10 = 0 -> 10
        page * rowsPerPage + rowsPerPage, // 0 * 10 + 10 = 10 -> 10 + 10 = 20
      ),
    [order, orderBy, page, rowsPerPage, rows],
  );

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer component={Paper}>
          <Table
            aria-label="simple table"
            aria-labelledby="tableTitle"
            size={dense}
            sx={{
              minWidth: 650,
            }}
          >
            <TableFilter
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={columns}
            />
            <TableBody>
              {visibleRows.map(
                ({
                  id,
                  title,
                  value_item,
                  operation,
                  date_input,
                  category,
                }) => {
                  const isItemSelected = isSelected(id);
                  const labelId = `enhanced-table-checkbox-${id}`;

                  return (
                    <TableRow
                      key={id}
                      hover
                      onClick={(event) => handleClick(event, id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
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
                        align="center"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {title}
                      </TableCell>
                      <TableCell align="center">{operation}</TableCell>
                      <TableCell align="center">{category}</TableCell>
                      <TableCell align="center">{value_item}</TableCell>
                      <TableCell align="center">{date_input}</TableCell>
                    </TableRow>
                  );
                },
              )}
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
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Linhas por página"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} de ${count}`
            }
          />
        </TableContainer>
      </Paper>
    </Box>
  );
}
