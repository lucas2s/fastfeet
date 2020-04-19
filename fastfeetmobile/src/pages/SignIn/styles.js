import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  background: #7d40e7;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;

export const LogoImg = styled.Image`
  width: 254px;
  height: 48px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 15px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
  shadow-color: #000;
  shadow-opacity: 0.5;
  shadow-offset: 1px 10px;
  elevation: 10;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  background: #82bf18;
`;
