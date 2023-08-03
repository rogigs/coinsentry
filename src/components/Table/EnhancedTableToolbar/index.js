import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import FilterListIcon from "@mui/icons-material/FilterList";
import { deleteItem as deleteItemRoute } from "../../../api/routes/finances";
import { useItem } from "../../../context/useItem";

export function EnhancedTableToolbar(props) {
  const { selected, numSelected } = props;

  const { setItem } = useItem();

  const deleteItem = async () => {
    // TODO: Delete all per page
    // if (numSelected === totalPerPage) {
    //   return;
    // }
    await deleteItemRoute(selected);
  };

  const changeItem = () => {
    setItem(selected);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selecionados
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Histórico
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          {numSelected === 1 && (
            <Tooltip title="Editar">
              <IconButton>
                <EditIcon onClick={changeItem} />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Deletar">
            <IconButton onClick={deleteItem}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
