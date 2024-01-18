import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { ActionsTablePagination } from '../TablePagination';

type TableToolbar = Omit<ActionsTablePagination, 'fetchNewPage'> & {
  selected: any; // TODO: review this type
  qntSelected: number;
};

export const TableToolbar = ({
  selected,
  qntSelected,
  onClickEdit,
  onClickDelete,
}: TableToolbar) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(qntSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {qntSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {qntSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Suas finanças
        </Typography>
      )}

      {qntSelected > 0 && (
        <>
          <Tooltip
            title="Editar"
            onClick={
              qntSelected > 1
                ? () => alert('Colocar modal')
                : onClickEdit(selected[0])
            }
          >
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Deletar" onClick={onClickDelete(selected)}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
};
