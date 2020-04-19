/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useCallback } from 'react';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';
import { useDispatch } from 'react-redux';

import Input from '~/components/SimpleInput';
import { signOut } from '~/store/modules/auth/actions';
import api from '~/services/api';
import history from '~/services/history';
import Pagination from '~/components/Pagination';
import InitialName from '~/components/InitialName';
import Actions from '~/components/MenuActions';

import {
  Container,
  Content,
  Options,
  ContentTable,
  Table,
  Mensagem,
  Header,
  DivID,
  DivName,
  DivAvatar,
  DivEmail,
  DivActions,
  TableRow,
  TextTable,
  AddButton,
} from './styles';

export default function ListDeliveryMan() {
  const [deliveryMans, setDeliveryMans] = useState([]);
  const [name = '', setName] = useState();
  const [page = 1, setPage] = useState();
  const [loading = 0, setLoading] = useState();

  const dispatch = useDispatch();

  const trataError = useCallback(
    error => {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            toast.warn(error.response.data.error);
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

  const loadDeliveryMans = useCallback(() => {
    async function load() {
      try {
        setLoading(1);
        const response = await api.get('deliveryman', {
          params: {
            name,
            page,
          },
        });

        setDeliveryMans(response.data.deliveryMans);
        setLoading(0);
      } catch (error) {
        setDeliveryMans([]);
        setLoading(0);
        trataError(error);
      }
    }
    load();
  }, [name, page, trataError]);

  useEffect(() => {
    loadDeliveryMans();
  }, [loadDeliveryMans]);

  function handleSearch({ nameSearch }) {
    setName(nameSearch);
  }

  async function handleDelete(deleteDeliveryman) {
    try {
      const response = await api.delete(`deliveryman/${deleteDeliveryman.id}`);
      if (response.status === 200) {
        toast.success('Entregador apagado com sucesso!');
        loadDeliveryMans();
      } else {
        toast.warn('Não foi possível apagar o entregador!');
      }
    } catch (error) {
      trataError(error);
    }
  }

  function confirmDelete(deleteDeliveryman) {
    confirmAlert({
      title: 'Exclusão',
      message: 'Deseja excluir o entregador?',
      buttons: [
        {
          label: 'Apagar',
          onClick: () => {
            handleDelete(deleteDeliveryman);
          },
        },
        {
          label: 'Cancelar',
          onClick: () => toast.warn('Exclusão Cancelada!'),
        },
      ],
    });
  }

  return (
    <Container>
      <Content>
        <h1>Gerenciando entregadores</h1>
        <Options>
          <Form onSubmit={handleSearch}>
            <span>
              <MdSearch size={22} color="#999999" />
            </span>
            <Input
              name="nameSearch"
              placeholder="Digite o entregador e tecle enter"
            />
          </Form>
          <AddButton
            title="CADASTRAR"
            loading={loading}
            IconButton={MdAdd}
            type="button"
            onClick={() => {
              history.push('/deliveryman/store');
            }}
          />
        </Options>
      </Content>
      <ContentTable>
        {loading ? (
          <Mensagem>
            <h1>Carregando Entregadores...</h1>
          </Mensagem>
        ) : deliveryMans.length <= 0 ? (
          <Mensagem>
            <h1>Não foi encontrado nenhum entregador</h1>
          </Mensagem>
        ) : (
          <Table>
            <Header>
              <DivID>
                <strong>ID</strong>
              </DivID>
              <DivAvatar>
                <strong>Foto</strong>
              </DivAvatar>
              <DivName>
                <strong>Nome</strong>
              </DivName>
              <DivEmail>
                <strong>Email</strong>
              </DivEmail>
              <DivActions>
                <strong>Ações</strong>
              </DivActions>
            </Header>
            {deliveryMans.map(item => (
              <TableRow key={item.id}>
                <DivID>
                  <TextTable>#{item.id}</TextTable>
                </DivID>
                <DivAvatar>
                  <div className="delivery_deliveryman">
                    {item.avatar ? (
                      <img src={item.avatar.url} alt={item.name} />
                    ) : (
                      <InitialName name={item.name} size={35} />
                    )}
                  </div>
                </DivAvatar>
                <DivName>
                  <TextTable>{item.name}</TextTable>
                </DivName>
                <DivEmail>
                  <TextTable>{item.email}</TextTable>
                </DivEmail>
                <DivActions>
                  <Actions
                    Edit={() => history.push(`/deliveryman/update/${item.id}`)}
                    Delete={() => confirmDelete(item)}
                  />
                </DivActions>
              </TableRow>
            ))}
          </Table>
        )}
      </ContentTable>
      <Pagination page={page} setPage={setPage} list={deliveryMans} />
    </Container>
  );
}
