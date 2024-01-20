import TablePagination, {
  CustowRowProps,
} from '@/components/Table/TablePagination';
import { useDialog } from '@/hooks/useDialog';
import { Finance } from '@/services/coinSentry/finances';
import { IconsOptions, IconsType } from '@/types';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { isAxiosError } from 'axios';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { ACTIONS_TYPE } from '../../context/reducerFinances/actions';
import { useFinances } from '../../hooks/useFinances';
import { columnsPagination } from '../../utils';

const DialogHome = dynamic(() => import('../../DialogHome'));
const Alert = dynamic(() => import('../../../../components/Alert'));

const CustomTableRow = ({
  id,
  title,
  value_item,
  operation,
  date_input,
  category,
  handleClick,
  isItemSelected,
  labelId,
}: Finance & CustowRowProps) => {
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
      <TableCell align="center">R$ {value_item}</TableCell>
      <TableCell align="center">{date_input}</TableCell>
    </TableRow>
  );
};

const TableHome = () => {
  const { setShowDialog } = useDialog();
  const { state, dispatch, fetchFinances, deleteFinances } = useFinances();

  const [dialog, setDialog] = useState({
    title: '',
    icon: IconsType.success as IconsOptions,
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

  if (isAxiosError(state.data)) {
    return <Alert onClick={fetchFinances as unknown as () => void} />;
  }

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
          customRow={CustomTableRow as React.ComponentType<CustowRowProps>}
        />
      </div>
    </>
  );
};

export default TableHome;
