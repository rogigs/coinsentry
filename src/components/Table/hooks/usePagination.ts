import { useEffect, useState } from 'react';

import { Pagination } from '@/types/index';
import { Order } from '../helpers';

type UsePagination = {
  rowsPerPageOptions?: number[];
  fetchNewPage: (
    pagination: Pagination,
  ) => (cleanCache?: true) => Promise<void>;
};

const usePagination = ({ rowsPerPageOptions, fetchNewPage }: UsePagination) => {
  const [page, setPage] = useState(0);
  const [pageCache, setPageCache] = useState([0]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    rowsPerPageOptions?.[0] ?? 10,
  );
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState('title');
  const [selected, setSelected] = useState<readonly Object[]>([]);

  useEffect(() => {
    fetchNewPage({
      page: 0,
      pageSize: rowsPerPage,
    })();
  }, []);

  useEffect(() => {
    if (pageCache[0] === -1) {
      // TODO: stressfull necessaru
      fetchNewPage({
        page: page,
        pageSize: rowsPerPage,
      })(true);

      setPageCache([page]);
    }
  }, [pageCache]);
  // DE FILTER
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    rows: any[],
  ) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // DE PAGINATION
  const handleChangePage = async (
    event: React.MouseEvent<unknown> | null,
    newPage: number,
    fetchNewPage: (
      pagination: Pagination,
    ) => (cleanCache?: true) => Promise<void>,
  ) => {
    const pageAlreadySentRequest = pageCache.some((page) => page === newPage);

    if (!pageAlreadySentRequest) {
      await fetchNewPage({
        page: newPage,
        pageSize: rowsPerPage ? +rowsPerPage : 10,
      })();
    }

    setPageCache((prev) => prev.concat(newPage));
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, rowsPerPage));

    setPage(0);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly any[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const cleanPageCache = () => setPageCache([-1]);

  return {
    page,
    setPage,
    pageCache,
    rowsPerPage,
    setRowsPerPage,
    order,
    setOrder,
    orderBy,
    setOrderBy,
    selected,
    setSelected,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    handleSelectAllClick,
    handleClick,
    cleanPageCache,
  };
};

export default usePagination;
