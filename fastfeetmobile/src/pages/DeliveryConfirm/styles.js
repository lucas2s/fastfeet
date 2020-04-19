import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import { RectButton } from 'react-native-gesture-handler';
import Button from '~/components/Button';

export const Container = styled.View`
  width: 100%;
  flex: 1;
  background: #fff;
  padding-bottom: 50px;
`;

export const Background = styled.View`
  padding-top: 150px;
  background: #7d40e7;
`;

export const Content = styled.View`
  margin: 0px 20px;
  margin-top: -100px;
  justify-content: center;
  align-items: center;
`;

export const ContainerCamera = styled.View`
  padding-top: 20px;
  padding-bottom: 20px;
  height: 426px;
  width: 320px;
  border: 2px solid #dddddd;
  border-radius: 4px;
  background: #000;
`;

export const Camera = styled(RNCamera)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const ImageSignature = styled.Image`
  height: 100%;
  width: 100%;
`;

export const Pending = styled.View`
  background: lightgreen;
  justify-content: center;
  align-items: center;
`;

export const TextPending = styled.Text`
  font-size: 16px;
  color: #999999;
`;

export const ScreenCamera = styled.View`
  flex: 0;
  justify-content: center;
`;

export const TouchCamera = styled(RectButton)`
  margin-top: -50px;
  width: 62px;
  height: 62px;
  background-color: 'rgba(32, 32, 32, 0.3)';
  border-radius: 31px;
  align-items: center;
  justify-content: center;
`;

export const ConfirmButton = styled(Button)`
  margin-top: 15px;
  width: 320px;
`;
