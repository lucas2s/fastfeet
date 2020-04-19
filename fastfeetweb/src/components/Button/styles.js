import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.button.attrs(props => ({
  disabled: props.loading,
}))`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #fff;

  background: #7d40e7;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  border: 0;

  &[disabled] {
    justify-content: center;
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;
