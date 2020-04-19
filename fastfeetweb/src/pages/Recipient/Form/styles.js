import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

import Button from '~/components/Button';
import Input from '~/components/SimpleInput';
import InputNumberFormat from '~/components/InputNumberFormat';

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

  input {
    border: 1px solid #dddddd;
    border-radius: 4px;
    width: 100%;
    height: 45px;
    margin-top: 9px;
    padding: 0 10px;
    margin-bottom: 18px;
  }
`;

export const Form = styled(Unform)`
  div {
    display: flex;
    flex: 1 0 auto;
    justify-content: flex-start;
    align-content: flex-start;
  }
`;

export const InputName = styled(Input)`
  width: 100%;
  max-width: 840px;
`;

export const InputStreet = styled(Input)`
  min-width: 510px;
  max-width: 510px;
  margin-right: 20px;
`;

export const InputNumber = styled(Input)`
  width: 100%;
  max-width: 150px;
  margin-right: 20px;
`;

export const InputComplement = styled(Input)`
  width: 100%;
  max-width: 140px;
`;

export const InputCity = styled(Input)`
  width: 100%;
  max-width: 269px;
  margin-right: 20px;
`;
export const InputState = styled(Input)`
  width: 100%;
  max-width: 269px;
  margin-right: 20px;
`;

export const InputZipcode = styled(InputNumberFormat)`
  width: 100%;
  max-width: 269px;
`;
