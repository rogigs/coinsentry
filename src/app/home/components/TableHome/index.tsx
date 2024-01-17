import React, { useEffect, useState } from 'react';
import { useFinances } from '../../hooks/useFinances';
import { columnsPagination } from '../../utils';
import TablePagination from '@/components/Table/TablePagination';

const TableHome = () => {
  const { state, fetchFinances } = useFinances();

  useEffect(() => {
    fetchFinances({ page: 0, pageSize: 10 })();
  }, []);

  return (
    <div
      style={{
        marginBottom: 'var(--spacing-24)',
      }}
    >
      <TablePagination
        rows={state.data}
        columns={columnsPagination}
        dense="medium"
        fetchNewPage={fetchFinances}
        count={state.dataLenghtInDatabase}
      />
    </div>
  );
};

export default TableHome;
