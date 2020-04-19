import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { MdArrowBack, MdSave } from 'react-icons/md';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Input from '~/components/SimpleInput';
import { signOut } from '~/store/modules/auth/actions';
import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  HeaderPage,
  BackButton,
  SaveButton,
  ContentForm,
  DivContacts,
  DivProduct,
  Async,
} from './styles';

export default function StoreDelivery() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [titleForm, setTitle] = useState();
  const [recipient, setRecipient] = useState('');
  const [deliveryman, setDeliveryman] = useState('');
  const [delivery, setDelivery] = useState('');

  const formRef = useRef(null);

  const trataError = useCallback(
    error => {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            toast.error(error.response.data.error);
            break;
          case 401:
            toast.error(error.response.data.error);
            dispatch(signOut());
            break;
          default:
            toast.error('Erro inesperado do sistema');
        }
      } else {
        toast.error('Erro inesperado do sistema');
      }
    },
    [dispatch]
  );

  const loadRecipients = async (inputValue, callback) => {
    try {
      const response = await api.get('recipients', {
        params: {
          name: inputValue,
        },
      });

      if (response.status === 200) {
        callback(
          response.data.recipients.map(reicipientMap => ({
            id: reicipientMap.id,
            name: reicipientMap.name,
          }))
        );
      } else {
        callback();
      }
    } catch (error) {
      callback();
    }
  };

  function handleRecipient(selectedOption) {
    setRecipient(selectedOption);
  }

  const loadDeliveryMans = async (inputValue, callback) => {
    try {
      const response = await api.get('deliveryman', {
        params: {
          name: inputValue,
        },
      });

      if (response.status === 200) {
        callback(
          response.data.deliveryMans.map(deliveryMansMap => ({
            id: deliveryMansMap.id,
            name: deliveryMansMap.name,
          }))
        );
      } else {
        callback();
      }
    } catch (error) {
      callback();
    }
  };

  function handleDeliveryMan(selectedOption) {
    setDeliveryman(selectedOption);
  }

  useEffect(() => {
    async function loadDelivery() {
      try {
        if (id) {
          setTitle('Edição de encomendas');
          const response = await api.get(`deliveries/${id}`);

          setDelivery(response.data.delivery);

          setRecipient({
            id: response.data.delivery.recipient.id,
            name: response.data.delivery.recipient.name,
          });

          setDeliveryman({
            id: response.data.delivery.deliveryman.id,
            name: response.data.delivery.deliveryman.name,
          });
        } else {
          setTitle('Cadastro de encomendas');
        }
      } catch (error) {
        setTitle('Cadastro de encomendas');
        trataError(error);
      }
    }
    loadDelivery();
  }, [id, trataError]);

  async function handleSubmitAdd(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        product: Yup.string().required('O produto é obrigatório'),
        recipient: Yup.string()
          .required('O destinatário é obrigatório')
          .typeError('O destinatário está inválido'),
        deliveryman: Yup.string()
          .required('O entregador é obrigatório')
          .typeError('O entregador está inválido'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { product } = data;

      if (id) {
        const response = await api.put(`deliveries/${id}`, {
          product,
          deliveryman_id: deliveryman.id,
          recipient_id: recipient.id,
        });

        if (response.status === 200) {
          toast.success('Encomenda atualizada com sucesso!');
          history.push('/delivery/list');
        } else {
          toast.warn('Não foi possível atualizar a encomenda!');
        }
      } else {
        const response = await api.post('deliveries', {
          product,
          deliveryman_id: deliveryman.id,
          recipient_id: recipient.id,
        });

        if (response.status === 200) {
          toast.success('Encomenda cadastrada com sucesso!');
          history.push('/delivery/list');
        } else {
          toast.warn('Não foi possível cadastrar a encomenda!');
        }
      }
    } catch (errors) {
      const validationErrors = {};
      if (errors instanceof Yup.ValidationError) {
        errors.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      } else {
        trataError(errors);
      }
    }
  }

  return (
    <Container>
      <HeaderPage>
        <h1>{titleForm}</h1>
        <div>
          <BackButton
            title="VOLTAR"
            IconButton={MdArrowBack}
            type="button"
            onClick={() => {
              history.push('/delivery/list');
            }}
          />
          <SaveButton
            title="SALVAR"
            IconButton={MdSave}
            type="submit"
            form="delivery"
          />
        </div>
      </HeaderPage>
      <ContentForm>
        <Form
          initialData={delivery}
          ref={formRef}
          id="delivery"
          onSubmit={handleSubmitAdd}
        >
          <DivContacts>
            <div>
              <Async
                label="Destinatário"
                name="recipient"
                options={loadRecipients}
                onChange={handleRecipient}
                value={recipient}
                placeholder="Buscar Destinatário"
              />
            </div>
            <div>
              <Async
                label="Entregador"
                name="deliveryman"
                options={loadDeliveryMans}
                onChange={handleDeliveryMan}
                value={deliveryman || ''}
                placeholder="Buscar Entregador"
              />
            </div>
          </DivContacts>
          <DivProduct>
            <label htmlFor="product">Nome do Produto</label>
            <Input name="product" type="text" />
          </DivProduct>
        </Form>
      </ContentForm>
    </Container>
  );
}
