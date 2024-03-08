import TablePagination, {
  CustomRowProps,
} from '@/components/Table/TablePagination';
import { useDialog } from '@/hooks/useDialog';
import { Finance } from '@/services/coinSentry/finances';
import { IconsOptions, IconsType } from '@/types';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { isAxiosError } from 'axios';
import dynamic from 'next/dynamic';

import { useQueryPagination } from '@/components/Table/hooks/useQueryPaginantion';
import { useState } from 'react';
import { ACTIONS_TYPE } from '../../context/reducerFinances/actions';
import { useFinances } from '../../hooks/useFinances';
import { columnsPagination } from '../../utils';

const DialogFinances = dynamic(() => import('../../DialogFinances'));
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
}: Finance & CustomRowProps) => {
  return (
    <TableRow
      key={id}
      hover
      onClick={(event: React.MouseEvent<unknown, MouseEvent>) =>
        handleClick(event, id)
      }
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

const TableFinances = () => {
  const { setShowDialog } = useDialog();
  const { state, dispatch, fetchFinances, deleteFinances } = useFinances();
  const { page, pageSize } = useQueryPagination();

  const [dialog, setDialog] = useState(() => ({
    title: '',
    icon: IconsType.success as IconsOptions,
    message: '',
  }));

  const onClickEdit = (id: string | Object) => () => {
    dispatch({
      type: ACTIONS_TYPE.ADD_FINANCE_TO_UPDATE,
      payload: id,
    });
  };

  const onClickDelete = (idItems: (string | Object)[]) => async () => {
    await deleteFinances(idItems, setDialog);

    setShowDialog(true);
  };

  if (isAxiosError(state.data)) {
    return <Alert onClick={fetchFinances as unknown as () => void} />;
  }

  return (
    <>
      <DialogFinances {...dialog}>
        <p>{dialog.message}</p>
      </DialogFinances>

      <div
        style={{
          marginBottom: 'var(--spacing-24)',
        }}
      >
        <TablePagination
          page={page}
          pageSize={pageSize}
          rows={state.data}
          columns={columnsPagination}
          fetchNewPage={fetchFinances}
          count={state.dataLengthInDatabase}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
          customRow={CustomTableRow as React.ComponentType<CustomRowProps>}
        />
      </div>
    </>
  );
};

export default TableFinances;