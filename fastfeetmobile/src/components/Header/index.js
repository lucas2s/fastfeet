import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { signOut } from '~/store/modules/auth/actions';
import InitialName from '~/components/InitialName';

import {
  ContainerHeader,
  HeaderDeliveryMan,
  HeaderName,
  Avatar,
  DivIName,
  TextInfo,
  TextData,
  ButtonLogout,
} from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const deliveryMan = useSelector((state) => state.auth.deliveryMan);

  async function handleLogout() {
    dispatch(signOut());
  }

  return (
    <ContainerHeader>
      <HeaderDeliveryMan>
        {deliveryMan.avatar ? (
          <Avatar source={{ uri: deliveryMan.avatar.url }} />
        ) : (
          <DivIName>
            <InitialName name={deliveryMan.name} size={70} />
          </DivIName>
        )}
        <HeaderName>
          <TextInfo>Bem vindo de volta,</TextInfo>
          <TextData>{deliveryMan.name}</TextData>
        </HeaderName>
      </HeaderDeliveryMan>
      <ButtonLogout onPress={handleLogout}>
        <Icon name="exit-to-app" color="#E74040" size={22} />
      </ButtonLogout>
    </ContainerHeader>
  );
}
