import styled from 'styled-components';
import { darken } from 'polished';
import { Form as Unform } from '@unform/web';

export const Container = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContainerSignIn = styled.div`
  height: max-content;
  width: 100%;
  max-width: 360px;
  display: flex;
  background: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  flex-direction: column;
  align-items: center;
  padding: 0px 30px;
`;

export const Form = styled(Unform)`
  margin-top: 30px;
  width: 300px;
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    padding-bottom: 8px;
  }

  input {
    height: 45px;
    background: #ffffff;
    border: 1px solid #dddddd;
    box-sizing: border-box;
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 2px;

    &::placeholder {
      color: #dddddd;
    }
  }

  button {
    height: 45px;
    background: #7d40e7;
    border-radius: 4px;
    font-size: 16px;
    color: #ffffff;
    border: 0px;
    transition: background 0.2s;
    margin-bottom: 50px;

    &:hover {
      background: ${darken(0.08, '#7D40E7')};
    }
  }
`;

export const Logo = styled.img`
  height: 44px;
  width: 259px;
  margin-top: 50px;
`;
