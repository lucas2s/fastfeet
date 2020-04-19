import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert } from 'react-native';
import api from '~/services/api';

import {
  Container,
  Background,
  Content,
  Camera,
  ContainerCamera,
  Pending,
  ScreenCamera,
  TextPending,
  TouchCamera,
  ConfirmButton,
  ImageSignature,
} from './styles';

export default function DeliveryConfirm({ navigation, route }) {
  const { deliveryId } = route.params;
  const deliveryMan = useSelector((state) => state.auth.deliveryMan);
  const { id } = deliveryMan;

  const [loading, setLoading] = useState(false);
  const [signature, setSignature] = useState(false);

  async function takePicture(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    setSignature(data);
  }

  async function handleCloseDelivery() {
    try {
      setLoading(true);
      const dataFile = new FormData();

      dataFile.append('file', {
        type: 'image/*',
        uri: signature.uri,
        name: 'signature.jpg',
      });

      console.tron.log(dataFile);

      const response = await api.post('files', dataFile);

      console.tron.log(response);

      await api.put(`deliveryman-end/${id}/delivery/${deliveryId}`, {
        signature_id: response.data.id,
      });

      Alert.alert('Sucesso', 'Encomenda encerrada com sucesso');
      setLoading(false);
      navigation.navigate('Deliverys');
    } catch (error) {
      Alert.alert('Erro', error.response.data.error);
      setLoading(false);
    }
  }

  const PendingView = () => (
    <Pending>
      <TextPending>Aguardar</TextPending>
    </Pending>
  );

  return (
    <Container>
      <Background />
      <Content>
        {signature ? (
          <ContainerCamera>
            <ImageSignature source={{ uri: signature.uri }} />
          </ContainerCamera>
        ) : (
          <ContainerCamera>
            <Camera
              type={Camera.Constants.Type.back}
              flashMode={Camera.Constants.FlashMode.off}
              ratio="4:3"
              androidCameraPermissionOptions={{
                title: 'Permissão para usar a câmera',
                message: 'Precisamos da sua permissão para usar sua câmera',
                buttonPositive: 'Sim',
                buttonNegative: 'Não',
              }}
            >
              {({ camera, status }) => {
                if (status !== 'READY') return <PendingView />;
                return (
                  <ScreenCamera>
                    <TouchCamera onPress={() => takePicture(camera)}>
                      <Icon name="camera-alt" size={30} color="#FFFFFF" />
                    </TouchCamera>
                  </ScreenCamera>
                );
              }}
            </Camera>
          </ContainerCamera>
        )}
        <ConfirmButton loading={loading} onPress={handleCloseDelivery}>
          Enviar
        </ConfirmButton>
      </Content>
    </Container>
  );
}

DeliveryConfirm.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    .isRequired,
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
