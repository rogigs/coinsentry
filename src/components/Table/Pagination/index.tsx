import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

type Pagination = {
  rows: string[];
  columns: GridColDef[];
  pageSizeOptions?: number[];
};

const Pagination = ({
  rows = [],
  columns,
  pageSizeOptions = [10, 50],
}: Pagination) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: pageSizeOptions[0] },
        },
      }}
      pageSizeOptions={pageSizeOptions}
      checkboxSelection
    />
  );
};

export default Pagination;
