import Dialog from '@/components/Dialog';
import { useDialog } from '@/hooks/useDialog';
import { IconsType, Pagination } from '@/types';

import { DeleteIcon, EditIcon } from '@/components/Icons';

import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { ActionsTablePagination } from '../TablePagination';

type TableToolbar = Omit<ActionsTablePagination, 'customRow'> & {
  selected: (string | Object)[];
  qntSelected: number;
  pagination: Pagination;
  cleanPageCache: () => void;
};

export const TableToolbar = ({
  selected,
  qntSelected,
  onClickEdit,
  onClickDelete,
  cleanPageCache,
}: TableToolbar) => {
  const { setShowDialog } = useDialog();

  return (
    <>
      <Dialog.Dialog>
        <Dialog.DialogTitle icon={IconsType.warning} title="Alerta" />
        <Dialog.DialogContent>
          <p>
            Não é possível editar múltiplos itens de sua finanças ao mesmo tempo
          </p>
        </Dialog.DialogContent>
        <Dialog.DialogActions
          primaryTxtButton="Fechar"
          primaryActionButton={() => setShowDialog(false)}
        />
      </Dialog.Dialog>
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
                  ? () => setShowDialog(true)
                  : onClickEdit(selected[0])
              }
            >
              <IconButton>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
              title="Deletar"
              onClick={async () => {
                await onClickDelete(selected)();
                await cleanPageCache();
              }}
            >
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Toolbar>
    </>
  );
};
