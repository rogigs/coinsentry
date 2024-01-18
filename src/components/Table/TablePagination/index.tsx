import { useMemo } from 'react';
import Table, { TableProps } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Checkbox from '@mui/material/Checkbox';

import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePaginationMUI, {
  TablePaginationProps,
} from '@mui/material/TablePagination';
import { getComparator, stableSort, Order } from '../helpers';
import TableFilter from '../TableFilter';
import Box from '@mui/material/Box';
import { TableToolbar } from '../TableToolbar';
import usePagination from '../hooks/usePagination';
import { Pagination } from '@/types';

// TODO: refactor this compontent
// TODO: clean states this component and of reducer

type TablePagination = TablePaginationProps &
  TableProps & {
    rows: any[];
    columns: any[];
    fetchNewPage: (pagination: Pagination) => Promise<void>;
    onClickEdit: (id: string) => void;
  };

const TablePagination = ({
  rows,
  columns,
  rowsPerPageOptions = [10],
  size = 'medium',
  fetchNewPage,
  count,
  onClickEdit,
}: TablePagination) => {
  const {
    page,
    rowsPerPage,
    order,
    orderBy,
    selected,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    handleSelectAllClick,
    handleClick,
  } = usePagination({
    rowsPerPageOptions,
  });

  //  DE     TABLE BODY
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * (rowsPerPage ? +rowsPerPage : 0) - rows.length)
      : 0;

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const visibleRows = useMemo(
    () =>
      rows.slice(
        // TODO: fix error to filter elements
        page * (rowsPerPage ? +rowsPerPage : 0),
        page * (rowsPerPage ? +rowsPerPage : 0) +
          (rowsPerPage ? +rowsPerPage : 0),
      ),
    [order, orderBy, page, rowsPerPage, rows],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar
          numSelected={selected.length}
          selected={selected}
          onClickEdit={onClickEdit}
        />
        <TableContainer component={Paper}>
          <Table
            aria-label="simple table"
            aria-labelledby="tableTitle"
            size={size}
            sx={{
              minWidth: '700px',
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
              rows={rows}
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
                    height: (size ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePaginationMUI
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={count}
            rowsPerPage={
              typeof rowsPerPage === 'object'
                ? +rowsPerPage.value
                : rowsPerPage
                ? +rowsPerPage
                : 0
            }
            page={page}
            onPageChange={(_, newPage) =>
              handleChangePage(_, newPage, fetchNewPage)
            }
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
};

export default TablePagination;
