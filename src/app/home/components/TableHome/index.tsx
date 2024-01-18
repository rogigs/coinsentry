import React, { useEffect, useState } from 'react';

import TablePagination from '@/components/Table/TablePagination';

import { ACTIONS_TYPE } from '../../context/reducerFinances/actions';
import { useFinances } from '../../hooks/useFinances';
import { columnsPagination } from '../../utils';

const TableHome = () => {
  const { state, dispatch, fetchFinances } = useFinances();

  useEffect(() => {
    fetchFinances({ page: 0, pageSize: 10 })();
  }, []);

  const onClickEdit = (id: string) => () => {
    dispatch({
      type: ACTIONS_TYPE.ADD_FINANCE_TO_UPDATE,
      payload: id,
    });
  };

  return (
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
      />
    </div>
  );
};

export default TableHome;
