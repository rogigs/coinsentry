import CardMUI from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import styled from "styled-components";
import media from "../../styledMedia";
import { TYPES } from "./utils";

const CardStyled = styled(CardMUI)`
  ${media.lessThan("desktop")`
    width: 100%
`}
  color: ${({ total }) => (total === 0 ? "inherit" : "white !important")};
  background-color: ${({ total }) =>
    total > 0 ? "green !important" : total < 0 ? "red !important" : "inherit"};

  width: 300px;
  text-align: center;
`;

const Card = ({ type, value = 0 }) => {
  return (
    <CardStyled total={type === TYPES.TOTAL ? Number(value) : 0}>
      <CardActionArea>
        <CardContent
          sx={{
            ".title": {
              marginBottom: "4px",
            },
            "&::first-letter": {
              textTransform: "uppercase",
            },
          }}
        >
          <h1 className="title">{type}</h1>
          <h2>R$ {value}</h2>
        </CardContent>
      </CardActionArea>
    </CardStyled>
  );
};

export { TYPES };

export default Card;
