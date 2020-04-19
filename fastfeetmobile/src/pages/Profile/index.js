import React, { useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { signOut } from '~/store/modules/auth/actions';
import InitialName from '~/components/InitialName';

import {
  Container,
  Avatar,
  DivIName,
  TextInfo,
  TextData,
  LogoutButton,
} from './styles';

export default function Profile() {
  const deliveryMan = useSelector((state) => state.auth.deliveryMan);
  const dispatch = useDispatch();

  const timeSP = 'America/Sao_Paulo';
  const dateCreate = useMemo(() => {
    return format(parseISO(deliveryMan.createdAt, timeSP), "dd'/'MM'/'yyyy", {
      locale: pt,
    });
  }, [deliveryMan]);

  async function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      {deliveryMan.avatar ? (
        <Avatar source={{ uri: deliveryMan.avatar.url }} />
      ) : (
        <DivIName>
          <InitialName name={deliveryMan.name} size={140} />
        </DivIName>
      )}

      <TextInfo>Nome Completo</TextInfo>
      <TextData>{deliveryMan.name}</TextData>
      <TextInfo>Email</TextInfo>
      <TextData>{deliveryMan.email}</TextData>
      <TextInfo>Data de Cadastro</TextInfo>
      <TextData>{dateCreate}</TextData>
      <LogoutButton onPress={handleLogout}>Logout</LogoutButton>
    </Container>
  );
}
