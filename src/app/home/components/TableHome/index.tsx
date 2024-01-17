import React, { useEffect } from 'react';
import { useFinances } from '../../hooks/useFinances';
import { columnsPagination } from '../../utils';
import { Pagination } from '@/components/Table';

const TableHome = () => {
  const { state, fetchFinances } = useFinances();

  useEffect(() => {
    fetchFinances();
  }, []);

  return (
    <div
      style={{
        marginBottom: 'var(--spacing-24)',
      }}
    >
      <Pagination rows={state.data} columns={columnsPagination} />;
    </div>
  );
};

export default TableHome;
