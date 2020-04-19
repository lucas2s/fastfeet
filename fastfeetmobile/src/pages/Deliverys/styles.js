import styled, { css } from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  width: 100%;
  flex: 1;
  padding: 0 25px;
  padding-top: 20px;
  background: #fff;
  padding-bottom: 50px;
`;

export const TopDelivery = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444444;
`;

export const Options = styled.View`
  flex-direction: row;
`;

export const ButtonOptions = styled(BorderlessButton)`
  margin-right: 10px;
`;

export const TextButton = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #999999;

  ${(props) =>
    props.active &&
    css`
      color: #7d40e7;
      text-decoration: underline;
    `}
`;

export const ContentList = styled.View``;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Loading = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Message = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #999999;
`;
