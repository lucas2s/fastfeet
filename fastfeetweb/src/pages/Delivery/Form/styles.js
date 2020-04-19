import styled from 'styled-components';

import Button from '~/components/Button';
import AsyncSelect from '~/components/AsyncSelect';

export const Container = styled.div`
  width: 900px;
  margin: 20px auto;
`;

export const HeaderPage = styled.div`
  width: 900px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  div {
    display: flex;
    justify-content: space-between;
  }
`;

export const BackButton = styled(Button)`
  width: 112px;
  padding: 0 15px;
  margin-right: 16px;
  background: #cccccc;
`;

export const SaveButton = styled(Button)`
  width: 112px;
  padding: 0 15px;
`;

export const ContentForm = styled.div`
  width: 900px;
  border-radius: 6px;
  background-color: #fff;
  padding: 26px 30px;
`;

export const DivContacts = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  > div {
    flex: 1;
    width: 100%;
    max-width: 405px;

    label {
      font-size: 14px;
      line-height: 19px;
      font-weight: bold;
    }

    span {
      color: #f64c75;
      align-self: flex-start;
      margin-top: 5px;
      margin-bottom: 20px;
      font-weight: bold;
    }
  }
`;

export const Async = styled(AsyncSelect)`
  width: 100%;
  height: 45px;
  border-radius: 4px;
  margin-top: 9px;
`;

export const DivProduct = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 14px;
    line-height: 19px;
    font-weight: bold;
  }

  input {
    border: 1px solid #dddddd;
    border-radius: 4px;
    width: 100%;
    height: 45px;
    margin-top: 9px;
    padding: 0 10px;
  }

  span {
    color: #f64c75;
    align-self: flex-start;
    margin-top: 5px;
    margin-bottom: 20px;
    font-weight: bold;
  }
`;
