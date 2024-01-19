import { useState } from 'react';

import { Icons } from '@/components/Dialog';
import TablePagination, {
  CustowRowProps,
} from '@/components/Table/TablePagination';
import Checkbox from '@mui/material/Checkbox';

import { useDialog } from '@/hooks/useDialog';
import { Finance } from '@/services/coinSentry/finances';
import dynamic from 'next/dynamic';
import { ACTIONS_TYPE } from '../../context/reducerFinances/actions';
import { useFinances } from '../../hooks/useFinances';
import { columnsPagination } from '../../utils';
const DialogHome = dynamic(() => import('../../DialogHome'));

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

type CustomTableRow = Finance &
  CustowRowProps & {
    isSelected: (id: string) => boolean;
  };

const CustomTableRow = ({
  id,
  title,
  value_item,
  operation,
  date_input,
  category,
  isSelected,
  handleClick,
  isItemSelected,
  labelId,
}: CustomTableRow) => {
  return (
    <TableRow
      key={id}
      hover
      onClick={(event: React.MouseEvent<unknown, MouseEvent>) =>
        handleClick(event, id as string)
      }
      role="checkbox"
      aria-checked={!!isItemSelected}
      tabIndex={-1}
      selected={!!isItemSelected}
      sx={{ cursor: 'pointer' }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={!!isItemSelected}
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
};

const TableHome = () => {
  const { setShowDialog } = useDialog();
  const { state, dispatch, fetchFinances, deleteFinances } = useFinances();

  const [dialog, setDialog] = useState({
    title: '',
    icon: Icons.success,
    message: '',
  });

  const onClickEdit = (id: string) => () => {
    dispatch({
      type: ACTIONS_TYPE.ADD_FINANCE_TO_UPDATE,
      payload: id,
    });
  };

  const onClickDelete = (idItems: string[]) => async () => {
    await deleteFinances(idItems, setDialog);

    setShowDialog(true);
  };

  return (
    <>
      <DialogHome {...dialog}>
        <p>{dialog.message}</p>
      </DialogHome>

      <div
        style={{
          marginBottom: 'var(--spacing-24)',
        }}
      >
        <TablePagination
          rows={state.data}
          columns={columnsPagination}
          fetchNewPage={fetchFinances}
          count={state.dataLenghtInDatabase}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
          customRow={CustomTableRow}
        />
      </div>
    </>
  );
};

export default TableHome;
