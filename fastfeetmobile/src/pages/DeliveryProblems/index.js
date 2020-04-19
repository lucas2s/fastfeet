import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import api from '~/services/api';

import {
  Container,
  Background,
  Form,
  TextQuestion,
  ButtonSend,
} from './styles';

export default function DeliveryProblems({ navigation, route }) {
  const { deliveryId } = route.params;

  const deliveryMan = useSelector((state) => state.auth.deliveryMan);
  const { id } = deliveryMan;

  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAddProblem() {
    try {
      setLoading(true);
      const response = await api.post(
        `/deliveryman/${id}/delivery/${deliveryId}/problems`,
        {
          description,
        }
      );

      if (response.status !== 200) {
        Alert.alert('Erro', 'Não foi possível informar o problema');
      } else {
        Alert.alert('Sucesso', 'Problema informado com sucesso');
        setLoading(false);
        navigation.goBack();
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', error.response.data.error);
    }
  }

  return (
    <Container>
      <Background />
      <Form>
        <TextQuestion
          keyboardType="default"
          placeholder="Inclua aqui o problema que ocorreu na entrega"
          returnKeyType="send"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={15}
          textAlignVertical="top"
        />
        <ButtonSend loading={loading} onPress={handleAddProblem}>
          Enviar
        </ButtonSend>
      </Form>
    </Container>
  );
}

DeliveryProblems.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    .isRequired,
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
