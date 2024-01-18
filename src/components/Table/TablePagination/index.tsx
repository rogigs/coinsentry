import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Table, { TableProps } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePaginationMUI from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useMemo } from 'react';

import { Pagination } from '@/types';

import TableFilter from '../TableFilter';
import { TableToolbar } from '../TableToolbar';
import { getComparator, stableSort } from '../helpers';
import usePagination from '../hooks/usePagination';

// TODO: Put in a page

export type ActionsTablePagination = {
  fetchNewPage: (pagination: Pagination) => () => Promise<void>;
  onClickEdit: (id: string) => () => void;
  onClickDelete: (idItems: string[]) => () => void;
};

type TablePagination = TableProps &
  ActionsTablePagination & {
    rows: any[];
    columns: any[];
    count: number;
    rowsPerPageOptions?: number[];
  };

const TablePagination = ({
  rows,
  columns,
  rowsPerPageOptions = [10],
  size = 'medium',
  fetchNewPage,
  count,
  onClickEdit,
  onClickDelete,
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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, rows],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar
          qntSelected={selected.length}
          selected={selected}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
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
              rowCount={visibleRows.length}
              headCells={columns}
              rows={visibleRows}
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
                  const isItemSelected = isSelected(id as string);
                  const labelId = `enhanced-table-checkbox-${id}`;

                  return (
                    <TableRow
                      key={id}
                      hover
                      onClick={(event) => handleClick(event, id as string)}
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
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(
              e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
              newPage,
            ) => handleChangePage(e, newPage, fetchNewPage)}
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
