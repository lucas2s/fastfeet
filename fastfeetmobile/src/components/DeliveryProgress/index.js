import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';

import {
  Container,
  ContentDeliveryProgress,
  ContentProgressCollun,
  ContentInfoProgress,
  LineProgress,
  TextInfo,
  IconBall,
} from './styles';

export default function DeliveryProgress({ withdrawn, delivered }) {
  return (
    <Container>
      <ContentDeliveryProgress>
        <IconBall name="lens" size={10} color="#7d40e7" />
        <LineProgress />
        {withdrawn ? (
          <Icon name="lens" size={10} color="#7d40e7" />
        ) : (
          <IconEntypo name="circle" size={10} color="#7d40e7" />
        )}
        <LineProgress />
        {delivered ? (
          <Icon name="lens" size={10} color="#7d40e7" />
        ) : (
          <IconEntypo name="circle" size={10} color="#7d40e7" />
        )}
      </ContentDeliveryProgress>
      <ContentInfoProgress>
        <ContentProgressCollun>
          <TextInfo>Aguardando</TextInfo>
          <TextInfo>Retirada</TextInfo>
        </ContentProgressCollun>
        <ContentProgressCollun style={{ alignItems: 'center' }}>
          <TextInfo>Retirada</TextInfo>
        </ContentProgressCollun>
        <ContentProgressCollun style={{ alignItems: 'flex-end' }}>
          <TextInfo>Entregue</TextInfo>
        </ContentProgressCollun>
      </ContentInfoProgress>
    </Container>
  );
}

DeliveryProgress.propTypes = {
  withdrawn: PropTypes.bool.isRequired,
  delivered: PropTypes.bool.isRequired,
};
