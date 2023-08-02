import CardMUI from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import styled from "styled-components";
import media from "../../styledMedia";

const CardStyled = styled(CardMUI)`
  width: 300px;
  text-align: center;

  ${media.lessThan("tablet")`
    width: 100%
`}
`;

const Card = ({ type, value }) => {
  return (
    <CardStyled>
      <CardActionArea>
        <CardContent
          sx={{
            "&::first-letter": {
              textTransform: "uppercase",
            },
          }}
        >
          <h1>{type}</h1>
          <h2>{value}</h2>
        </CardContent>
      </CardActionArea>
    </CardStyled>
  );
};

export default Card;
