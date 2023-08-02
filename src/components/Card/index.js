import CardMUI from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";

const Card = ({ type, value }) => {
  return (
    <CardMUI sx={{ width: 300 }}>
      <CardActionArea>
        <CardContent>
          <h1>{type}</h1>
          <h2>{value}</h2>
        </CardContent>
      </CardActionArea>
    </CardMUI>
  );
};

export default Card;
