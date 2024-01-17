import React, { useEffect } from 'react';
import { useFinances } from '../../hooks/useFinances';
import { columnsPagination } from '../../utils';
import { Pagination } from '@/components/Table';

const TableHome = () => {
  const { state, fetchFinances } = useFinances();

  useEffect(() => {
    console.log('CALL');

    fetchFinances();
  }, []);

  return <Pagination rows={state.data} columns={columnsPagination} />;
};

export default TableHome;
