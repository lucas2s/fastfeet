import styled from 'styled-components';

export const Container = styled.View`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-right: 5px;
  background-color: #f4effc;
`;

export const Name = styled.Text`
  font-weight: 400;
  font-size: ${(props) => props.size / 2}px;
  color: #a28fd0;
`;
