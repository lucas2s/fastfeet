import React from 'react';
import PropTypes from 'prop-types';

import {
  Modal,
  ModalContent,
  DivAdress,
  DivDates,
  DivSignature,
  HeaderDiv,
  TextModal,
  ImgSignature,
} from './styles';

export default function DetailsDelivery({ delivery, close }) {
  return (
    <Modal onClick={close}>
      <ModalContent>
        <DivAdress>
          <HeaderDiv>Informações da encomenda</HeaderDiv>
          <TextModal>
            {delivery.recipient.street}, {delivery.recipient.number}{' '}
            {delivery.recipient.complement !== ''
              ? ` - ${delivery.recipient.complement}`
              : ''}
          </TextModal>
          <TextModal>
            {delivery.recipient.city} - {delivery.recipient.state}
          </TextModal>
          <TextModal>{delivery.recipient.zipcode}</TextModal>
        </DivAdress>
        <DivDates>
          <HeaderDiv>Datas</HeaderDiv>
          <TextModal>
            <span>Retirada: </span>
            {delivery.startDate}
          </TextModal>
          <TextModal>
            <span>Entrega: </span>
            {delivery.endDate}
          </TextModal>
        </DivDates>
        <DivSignature>
          <HeaderDiv>Assinatura do destinatário</HeaderDiv>
          <div>
            {delivery.signature ? (
              <ImgSignature src={delivery.signature.url} alt="assinatura" />
            ) : (
              <div>
                <p className={delivery.status}>ENCOMENDA {delivery.status}</p>
              </div>
            )}
          </div>
        </DivSignature>
      </ModalContent>
    </Modal>
  );
}

DetailsDelivery.propTypes = {
  delivery: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
};
