import styled from 'styled-components/native';

import Button from '~/components/Button';
import Input from '~/components/Input';

export const Container = styled.SafeAreaView`
  width: 100%;
  flex: 1;
  background: #fff;
  padding-bottom: 50px;
`;

export const Background = styled.View`
  padding-top: 150px;
  background: #7d40e7;
`;

export const Form = styled.View`
  margin: 0px 20px;
  margin-top: -80px;
`;

export const TextQuestion = styled(Input)`
  align-items: flex-start;
  justify-content: flex-start;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 4px;
  height: 300px;
  font-size: 16px;
  line-height: 14px;
`;

export const ButtonSend = styled(Button)`
  margin-top: 15px;
`;
