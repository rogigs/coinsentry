import { useEffect, useState } from 'react';

import { Icons } from '@/components/Dialog';
import TablePagination from '@/components/Table/TablePagination';
import { useDialog } from '@/hooks/useDialog';
import dynamic from 'next/dynamic';
import { ACTIONS_TYPE } from '../../context/reducerFinances/actions';
import { useFinances } from '../../hooks/useFinances';
import { columnsPagination } from '../../utils';

const DialogHome = dynamic(() => import('../../DialogHome'));

const TableHome = () => {
  const { setShowDialog } = useDialog();
  const { state, dispatch, fetchFinances, deleteFinances } = useFinances();

  const [dialog, setDialog] = useState({
    title: '',
    icon: Icons.success,
    message: '',
  });

  useEffect(() => {
    fetchFinances({ page: 0, pageSize: 10 })();
  }, []);

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
        />
      </div>
    </>
  );
};

export default TableHome;
