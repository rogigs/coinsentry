import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import FormControlLabelMUI from '@mui/material/FormControlLabel';
import media from '../../../../styledMedia';

export const WrapperForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--spacing-12);
  width: 100%;

  ${media.greaterThan('mobileMax')`
    width: 420px;
    height: 500px
  `};
`;

export const WrapperSectionForm = styled.section`
  display: flex;
  justify-content: space-between;

  .player {
    max-height: 500px;
    max-width: 500px;
  }

  ${media.lessThan('mobileMax')`
      .player {
      display: none;
      }
  `}
`;

export const FormControlRadio = styled(FormControl)`
  display: flex;
  flex-direction: row !important;
  align-items: center;
  gap: var(--spacing-12);
`;

export const FormControlLabel = styled(FormControlLabelMUI)`
  // TODO: change color
  color: rgba(0, 0, 0, 0.6);
`;
