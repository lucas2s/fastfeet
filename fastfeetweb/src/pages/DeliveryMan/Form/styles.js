import styled from 'styled-components';

import Button from '~/components/Button';

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

  input {
    margin-bottom: 18px;
  }

  div {
    display: flex;
    justify-content: center;
  }
`;
