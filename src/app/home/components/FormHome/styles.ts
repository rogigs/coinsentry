import FormControl from '@mui/material/FormControl';
import FormControlLabelMUI from '@mui/material/FormControlLabel';
import styled from 'styled-components';

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

export const WrapperLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .logo {
    width: 100%;
    height: 200px;
  }
`;

export const WrapperSectionForm = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  ${media.lessThan('mobileMax')`
    flex-direction: column-reverse;
    align-items: center;
    margin-bottom: var(--spacing-64);
  `};
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
