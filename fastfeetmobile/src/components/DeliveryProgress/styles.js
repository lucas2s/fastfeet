import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  margin-top: 15px;
  height: 44px;
  width: 100%;
`;

export const ContentDeliveryProgress = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
`;

export const ContentInfoProgress = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ContentProgressCollun = styled.View`
  width: 33.33%;
`;

export const LineProgress = styled.View`
  flex: 1;
  height: 1px;
  background: #7d40e7;
  margin: 0;
`;

export const TextInfo = styled.Text`
  font-size: 8px;
  font-weight: bold;
  color: #999999;
`;

export const IconBall = styled(Icon)`
  margin: 0;
  padding: 0;
`;
