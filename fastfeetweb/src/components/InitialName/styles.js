import styled from 'styled-components';

export const Container = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  border-width: 2px;
  background: ${props => props.background};
  border-color: ${props => props.color};
  border-style: ${props => (props.size > 100 ? 'dashed' : 'none')};
`;

export const Name = styled.p`
  font-weight: 400;
  font-size: ${props => props.size / 2}px;
  color: ${props => props.color};
`;

export const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  margin-right: 5px;
  border-width: 2px;
  background: #fff;
  border-color: #dddddd;
  border-style: ${props => (props.size > 100 ? 'dashed' : 'none')};
`;

export const SemImagem = styled.p`
  font-weight: bold;
  font-size: 16px;
  color: #dddddd;
`;
