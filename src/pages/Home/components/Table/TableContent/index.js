import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import Checkbox from '@mui/material/Checkbox';
import { Skeleton, styled } from '@mui/material';

const StyledTableCell = styled(TableCell)({
  padding: '0 16px',
});

function TableContent({
  visibleRows,
  emptyRows,
  isSelected,
  handleClick,
  loadingRow,
}) {
  return (
    <>
      {visibleRows.map((row, index) => {
        const isItemSelected = isSelected(row.id);
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
          <TableRow
            hover
            onClick={(event) => handleClick(event, row.id, index)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.id}
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
            <TableCell component="th" id={labelId} scope="row" padding="none">
              {row.title}
            </TableCell>
            <TableCell align="right">{row.operation}</TableCell>
            <TableCell align="right">{row.category}</TableCell>
            <TableCell align="right">R${row.value_item}</TableCell>
            <TableCell align="right">{row.date_input}</TableCell>
          </TableRow>
        );
      })}
      {loadingRow && (
        <TableRow
          style={{
            height: 33 * emptyRows,
          }}
        >
          <StyledTableCell colSpan={6}>
            <Skeleton height="52px" width="100%" />
          </StyledTableCell>
        </TableRow>
      )}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: 33 * emptyRows,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </>
  );
}

export default TableContent;
