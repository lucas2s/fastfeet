import styled from 'styled-components/native';

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

export const InfoTitle = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin: 0px 20px;
  padding: 10px;
  margin-top: -95px;
  margin-bottom: 5px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-left: 5px;
`;

export const ContentList = styled.View`
  padding: 0 25px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Loading = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ContentMessage = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #eeeeee;
  margin-bottom: 5px;
`;

export const Message = styled.Text`
  margin-left: 10px;
  font-size: 14px;
  color: #999999;
`;
