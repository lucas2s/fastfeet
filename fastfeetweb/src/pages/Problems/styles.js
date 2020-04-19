import styled from 'styled-components';
import { transparentize } from 'polished';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0px auto;
`;

export const Content = styled.div`
  max-width: 1200px;
  margin-top: 25px;
`;

export const ContentTable = styled.div`
  border-radius: 4px;
  width: auto;
  max-width: 1200px;
  margin-top: 25px;
`;

export const Table = styled.div`
  width: 100%;
  max-width: 1200px;

  strong {
    font-size: 16px;
    line-height: 19px;
    color: #444444;
  }
`;

export const TextTable = styled.p`
  font-size: 16px;
  line-height: 20px;
  color: #666666;
`;

export const Mensagem = styled.div`
  width: auto;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  border-radius: 5px;
  background: #fff;

  h1 {
    margin-top: 20px;
    font-size: 15px;
    color: ${transparentize(0.3, '#7D40E7')};
  }
`;

export const Header = styled.div`
  width: auto;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  padding: 0 25px;

  margin-bottom: 21px;
`;

export const TableRow = styled.div`
  width: auto;
  max-width: 1200px;

  display: flex;
  flex-direction: row;
  align-items: center;

  height: 57px;
  margin-bottom: 21px;
  padding: 0 25px;

  border-radius: 5px;
  background: #fff;
`;

export const DivDelivery = styled.div`
  width: auto;
  max-width: 220px;
  flex: 1;
`;

export const DivProblem = styled.div`
  width: auto;
  max-width: 900px;
  flex: 1;
`;

export const DivActions = styled.div`
  width: auto;
  max-width: 50px;
  flex: 1;
  display: flex;
  justify-content: center;
`;
