import { useEffect, useState } from 'react';

import { Pagination } from '@/types/index';
import { useRouter } from 'next/navigation';

import { Order } from '../helpers';

type UsePagination = {
  fetchNewPage: (
    pagination: Pagination,
  ) => (cleanCache?: true) => Promise<void>;
  page: number;
  pageSize: number;
};

const usePagination = ({ fetchNewPage, page, pageSize }: UsePagination) => {
  const router = useRouter();
  const [pageCache, setPageCache] = useState([0]);
  const [order, setOrder] = useState<Order>(() => 'asc');
  const [orderBy, setOrderBy] = useState(() => 'title');
  const [selected, setSelected] = useState<(string | Object)[]>([]);

  useEffect(() => {
    fetchNewPage({
      page: 0,
      pageSize,
    })();
  }, []);

  useEffect(() => {
    // TODO: stressful scenarios - changes to do
    // after stressful, that are the problems:
    //    - When update item not a reflect a table RESOLVED
    //    - When delete all items of list the page show white RESOLVED
    //    - Page initial doesn't is 0 broken the page
    //    - When change page should stay in the same x and y of client
    //    - When handle change page i have a problems of UX
    //        the Checkbox to select all checkbox remains clicked
    //        not allow that remains that items of others pages
    //        when delete remains selected
    // https://5c42b5ed18020b4b5ab98fd843614d7c@o4506606897528832.ingest.sentry.io/4506607056977920
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

  const handleChangePage = async (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
    fetchNewPage: (
      pagination: Pagination,
    ) => (cleanCache?: true) => Promise<void>,
  ) => {
    const pageAlreadySentRequest = pageCache.some((cache) => cache === newPage);
    if (!pageAlreadySentRequest) {
      await fetchNewPage({
        page: newPage,
        pageSize: pageSize ? +pageSize : 10,
      })();

      setPageCache((prev) => prev.concat(newPage));
    }

    const buttonPrevious = 'KeyboardArrowLeftIcon';
    const target: any = event?.target;

    router.push(
      `/finances?page=${
        target.dataset.testid === buttonPrevious ? page - 1 : page + 1
      }&pageSize=${pageSize}`,
    );
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id as never);
    let newSelected: (string | Object)[] = [];

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

  return {
    page,
    pageCache,
    pageSize,
    order,
    setOrder,
    orderBy,
    setOrderBy,
    selected,
    setSelected,
    handleChangePage,
    handleRequestSort,
    handleSelectAllClick,
    handleClick,
  };
};

export default usePagination;
