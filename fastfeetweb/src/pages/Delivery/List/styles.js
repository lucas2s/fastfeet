import styled from 'styled-components';

import Button from '~/components/Button';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0px auto;
`;

export const Content = styled.div`
  max-width: 1200px;
  margin-top: 25px;

  form {
    input {
      width: 300px;
      height: 36px;
      background: #ffffff;
      border: 1px solid #dddddd;
      box-sizing: border-box;
      border-radius: 4px;
      padding-left: 40px;
      ::placeholder {
        font-size: 14px;
        line-height: 16px;
        color: #999999;
      }
    }

    span {
      position: absolute;
      margin-left: 10px;
      margin-top: 8px;
    }
  }
`;

export const Options = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  align-items: center;
  padding: 25px;
  border-radius: 5px;
  background: #fff;

  h1 {
    font-size: 15px;
    color: #666666;
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

export const DivID = styled.div`
  width: auto;
  max-width: 92px;
  flex: 1;
`;

export const DivRecipient = styled.div`
  width: auto;
  max-width: 230px;
  flex: 1;
`;

export const DivDeliveryMan = styled.div`
  width: auto;
  max-width: 270px;
  flex: 1;

  .delivery_deliveryman {
    border-radius: 15px;
    padding: 4px 6px;
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.3);
      background: #eee;
      margin-right: 5px;
    }
  }
`;

export const DivCity = styled.div`
  width: auto;
  max-width: 200px;
  flex: 1;
`;

export const DivState = styled.div`
  width: auto;
  max-width: 150px;
  flex: 1;
`;

export const DivStatus = styled.div`
  width: auto;
  max-width: 170px;
  flex: 1;

  .delivery_status {
    border-radius: 15px;
    width: min-content;
    padding: 4px 6px 2px 6px;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    p:first-child {
      margin-right: 4px;
    }
  }

  .PENDENTE {
    background-color: #f0f0df;
    p {
      font-size: 14px;
      color: #c1bc35;
    }
  }

  .ENTREGUE {
    background-color: #dff0df;
    p {
      font-size: 14px;
      color: #2ca42b;
    }
  }

  .CANCELADA {
    background-color: #fab0b0;
    p {
      font-size: 14px;
      color: #de3b3b;
    }
  }

  .RETIRADA {
    background-color: #bad2ff;
    p {
      font-size: 14px;
      color: #4d85ee;
    }
  }
`;

export const DivActions = styled.div`
  width: auto;
  max-width: 50px;
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const AddButton = styled(Button)`
  width: 142px;
  height: 36px;
  padding: 0px 15px;
`;
