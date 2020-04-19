import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';

export const ContainerHeader = styled.View`
  width: 360px;
  padding: 0 25px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderDeliveryMan = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const HeaderName = styled.View`
  margin-left: 15px;
`;

export const ButtonLogout = styled(BorderlessButton)`
  margin-right: 10px;
`;

export const Avatar = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background: #eee;
  margin-bottom: 15px;
`;

export const DivIName = styled.View`
  margin-bottom: 15px;
`;

export const TextData = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #444444;
  margin-bottom: 15px;
`;

export const TextInfo = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #666666;
`;
