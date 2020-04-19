import React, { useRef, useState, useEffect, useCallback } from 'react';
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
import AvatarInput from './AvatarInput';

import {
  Container,
  HeaderPage,
  BackButton,
  SaveButton,
  ContentForm,
} from './styles';

export default function StoreDeliveryMan() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [titleForm, setTitle] = useState();
  const [deliveryman, setDeliveryman] = useState();
  const [iname, setIName] = useState();
  const formRef = useRef(null);

  const trataError = useCallback(
    error => {
      if (error.response.status) {
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

  useEffect(() => {
    async function loadDeliveryMan() {
      try {
        if (id) {
          setTitle('Edição de entregadores');
          const response = await api.get(`deliveryman/${id}`);

          setDeliveryman(response.data.deliveryMan);
          setIName(response.data.deliveryMan.name);
        } else {
          setTitle('Cadastro de entregadores');
        }
      } catch (error) {
        setTitle('Cadastro de entregadores');
        trataError(error);
      }
    }
    loadDeliveryMan();
  }, [id, trataError]);

  async function handleSubmitAdd(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string().required('O email é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, email, avatar } = data;

      if (id) {
        const response = await api.put(`deliveryman/${id}`, {
          name,
          email,
          avatar_id: avatar,
        });

        if (response.status === 200) {
          toast.success('Entregador atualizado com sucesso!');
          history.push('/deliveryman/list');
        } else {
          toast.warn('Não foi possível atualizar o entregador!');
        }
      } else {
        const response = await api.post(`deliveryman`, {
          name,
          email,
          avatar_id: avatar,
        });

        if (response.status === 200) {
          toast.success('Entregador cadastrado com sucesso!');
          history.push('/deliveryman/list');
        } else {
          toast.warn('Não foi possível cadastrar o entregador!');
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
              history.push('/deliveryman/list');
            }}
          />
          <SaveButton
            title="SALVAR"
            IconButton={MdSave}
            type="submit"
            form="deliveryman"
          />
        </div>
      </HeaderPage>
      <ContentForm>
        <Form
          initialData={deliveryman}
          ref={formRef}
          id="deliveryman"
          onSubmit={handleSubmitAdd}
        >
          <div>
            <AvatarInput name="avatar" iname={iname} />
          </div>
          <Input
            label="Nome"
            name="name"
            placeholder="Digite o nome completo"
            onChange={e => setIName(e.target.value)}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Digite seu endereço de e-mail"
          />
        </Form>
      </ContentForm>
    </Container>
  );
}
