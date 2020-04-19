import styled from 'styled-components';
import { lighten } from 'polished';

export const Wrapper = styled.div`
  height: auto !important;
  min-height: 100%;
  padding-bottom: 10px;
  background: ${lighten(0.38, '#7D40E7')};
`;
