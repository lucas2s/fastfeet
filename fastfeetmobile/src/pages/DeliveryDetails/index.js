import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

import ButtonElements from '~/components/ButtonElements';
import api from '~/services/api';

import {
  Container,
  Background,
  InfoDelivery,
  InfoTitle,
  Title,
  TextInfo,
  TextData,
  StatusDelivery,
  StatusDeliveryDates,
  StatusDates,
  StatusDeliveryButtons,
  ContainerButtons,
} from './styles';

export default function DeliveryDetails({ navigation, route }) {
  const { delivery } = route.params;
  const deliveryId = delivery.id;
  const deliveryMan = useSelector((state) => state.auth.deliveryMan);
  const { id } = deliveryMan;

  async function handleConfirmWithdrawal() {
    try {
      const response = await api.put(
        `/deliveryman-start/${id}/delivery/${delivery.id}`
      );

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Encomenda Retirada');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro Delivery', error.response.data.error);
    }
  }

  return (
    <Container>
      <Background />
      <InfoDelivery>
        <InfoTitle>
          <Icon name="local-shipping" size={20} color="#7d40e7" />
          <Title>Informações da entrega</Title>
        </InfoTitle>
        <TextInfo>DESTINATÁRIO</TextInfo>
        <TextData>{delivery.recipient.name}</TextData>
        <TextInfo>ENDEREÇO DE ENTREGA</TextInfo>
        <TextData>{delivery.address}</TextData>
        <TextInfo>PRODUTO</TextInfo>
        <TextData>{delivery.product}</TextData>
      </InfoDelivery>
      <StatusDelivery>
        <InfoTitle>
          <Icon name="event" size={20} color="#7d40e7" />
          <Title>Informações da entrega</Title>
        </InfoTitle>
        <TextInfo>STATUS</TextInfo>
        <TextData>{delivery.status}</TextData>
        <StatusDeliveryDates>
          <StatusDates>
            <TextInfo>DATA DE RETIRADA</TextInfo>
            <TextData>{delivery.dateStart}</TextData>
          </StatusDates>
          <StatusDates>
            <TextInfo>DATA DE ENTREGA</TextInfo>
            <TextData>{delivery.dateEnd}</TextData>
          </StatusDates>
        </StatusDeliveryDates>
      </StatusDelivery>
      <StatusDeliveryButtons>
        <ContainerButtons>
          <ButtonElements
            icon={<Icon name="highlight-off" size={20} color="#E74040" />}
            title="Informar Problema"
            disabled={
              delivery.start_date === null || delivery.end_date !== null
            }
            onPress={() =>
              navigation.navigate('DeliveryProblems', { deliveryId })
            }
          />
        </ContainerButtons>
        <ContainerButtons>
          <ButtonElements
            icon={<Icon name="info-outline" size={20} color="#E7BA40" />}
            title="Vizualizar Problemas"
            disabled={delivery.start_date === null}
            onPress={() =>
              navigation.navigate('DeliveryViewProblems', { deliveryId })
            }
          />
        </ContainerButtons>
        <ContainerButtons>
          {delivery.start_date ? (
            <ButtonElements
              icon={
                <IconCommunity
                  name="truck-delivery"
                  size={20}
                  color="#7d40e7"
                />
              }
              title="Confirmar Entrega"
              disabled={delivery.end_date !== null}
              onPress={() =>
                navigation.navigate('DeliveryConfirm', { deliveryId })
              }
            />
          ) : (
            <ButtonElements
              icon={
                <IconCommunity
                  name="check-circle-outline"
                  size={20}
                  color="#2D7F19"
                />
              }
              disabled={false}
              title="Confirmar Retirada"
              onPress={handleConfirmWithdrawal}
            />
          )}
        </ContainerButtons>
      </StatusDeliveryButtons>
    </Container>
  );
}

DeliveryDetails.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    .isRequired,
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
