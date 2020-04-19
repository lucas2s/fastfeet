import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  padding: 0 30px;
  width: 100%;
  background: #fff;
`;

export const Avatar = styled.Image`
  align-self: center;
  width: 140px;
  height: 140px;
  border-radius: 70px;
  background: #eee;
  margin-bottom: 15px;
`;

export const DivIName = styled.View`
  align-items: center;
  margin-bottom: 15px;
`;

export const TextData = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #444444;
  margin-bottom: 15px;
`;

export const TextInfo = styled.Text`
  font-size: 8px;
  font-weight: bold;
  color: #999999;
`;

export const LogoutButton = styled(Button)`
  margin-top: 5px;
  background: #e74040;
`;
