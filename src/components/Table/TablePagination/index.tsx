import { Pagination } from '@/types';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table, { TableProps } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePaginationMUI from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Suspense, useMemo } from 'react';

import CircularProgress from '@/components/Progress';
import TableFilter from '../TableFilter';
import { TableToolbar } from '../TableToolbar';
import { getComparator, stableSort } from '../helpers';
import usePagination from '../hooks/usePagination';

export type CustowRowProps = {
  isItemSelected: Object;
  labelId: string;
  handleClick: (
    event: React.MouseEvent<unknown, MouseEvent>,
    id: string,
  ) => void;
};

export type ActionsTablePagination = {
  fetchNewPage: (
    pagination: Pagination,
  ) => (cleanCache?: true) => Promise<void>;
  onClickEdit: (id: string) => () => void;
  onClickDelete: (idItems: string[]) => () => void;
  customRow: ({
    isItemSelected,
    labelId,
    ...props
  }: CustowRowProps) => JSX.Element;
};

type TablePagination = TableProps &
  ActionsTablePagination & {
    rows: any[];
    columns: any[];
    count: number;
    rowsPerPageOptions?: number[];
  };

const TablePagination = ({
  rows = [],
  columns,
  rowsPerPageOptions = [10],
  size = 'medium',
  fetchNewPage,
  count,
  onClickEdit,
  onClickDelete,
  customRow,
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
    cleanPageCache,
  } = usePagination({
    rowsPerPageOptions,
    fetchNewPage,
  });

  const CustomRow = customRow;
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
          fetchNewPage={fetchNewPage}
          pagination={{
            page: page,
            pageSize: rowsPerPage,
          }}
          cleanPageCache={cleanPageCache}
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
              <Suspense
                fallback={
                  <TableCell colSpan={6}>
                    <CircularProgress />
                  </TableCell>
                }
              >
                {visibleRows.map((row) => {
                  const isItemSelected = isSelected(row.id as string);
                  const labelId = `enhanced-table-checkbox-${row.id}`;

                  return (
                    <CustomRow
                      key={row.id}
                      isItemSelected={isItemSelected}
                      labelId={labelId}
                      handleClick={handleClick}
                      {...row}
                    />
                  );
                })}

                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (size ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </Suspense>
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
