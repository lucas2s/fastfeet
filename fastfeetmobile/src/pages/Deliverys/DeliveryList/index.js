import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DeliveryProgess from '~/components/DeliveryProgress';

import {
  Container,
  ContentProgress,
  ContentTitle,
  ContentInfoCollun,
  Title,
  ContentInfo,
  TextData,
  TextInfo,
  ButtonDetails,
  TextButton,
} from './styles';

export default function DeliveryList({ data, details }) {
  return (
    <Container>
      <ContentProgress>
        <ContentTitle>
          <Icon name="local-shipping" size={20} color="#7d40e7" />
          <Title>{`Enconmenda ID  ${data.id}`}</Title>
        </ContentTitle>
        <DeliveryProgess
          withdrawn={data.start_date !== null}
          delivered={data.end_date !== null}
        />
      </ContentProgress>
      <ContentInfo>
        <ContentInfoCollun>
          <TextInfo>Data</TextInfo>
          <TextData>{data.dateCreate}</TextData>
        </ContentInfoCollun>
        <ContentInfoCollun>
          <TextInfo>Cidade</TextInfo>
          <TextData>{data.recipient.city}</TextData>
        </ContentInfoCollun>
        <ContentInfoCollun>
          <ButtonDetails onPress={details}>
            <TextButton>Ver detalhes</TextButton>
          </ButtonDetails>
        </ContentInfoCollun>
      </ContentInfo>
    </Container>
  );
}

DeliveryList.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    dateCreate: PropTypes.string,
    recipient: PropTypes.shape({
      city: PropTypes.string.isRequired,
    }),
  }).isRequired,
  details: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
