import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import Input from '~/components/SimpleInput';
import { Container, ContainerSignIn, Logo, Form } from './styles';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '../../assets/images/fastfeet-logo.png';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Insira um e-mail válido')
          .required('O e-mail é obrigatório'),
        password: Yup.string()
          .min(6)
          .required('A senha é obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { email, password } = data;

      dispatch(signInRequest(email, password));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <Container>
      <ContainerSignIn>
        <Logo src={logo} alt="logo" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="email"
            type="email"
            label="SEU E-MAIL"
            placeholder="Seu e-mail"
          />
          <Input
            name="password"
            type="password"
            label="SUA SENHA"
            placeholder="Sua senha"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Carregando...' : 'Entrar no Sistema'}{' '}
          </button>
        </Form>
      </ContainerSignIn>
    </Container>
  );
}
