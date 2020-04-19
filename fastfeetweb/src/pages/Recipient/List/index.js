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
  DivAddress,
  DivActions,
  TableRow,
  TextTable,
  AddButton,
} from './styles';

export default function ListRecipient() {
  const [recipients, setRecipients] = useState([]);
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

  const loadRecipients = useCallback(() => {
    async function load() {
      try {
        setLoading(1);
        const response = await api.get('recipients', {
          params: {
            name,
            page,
          },
        });

        setRecipients(
          response.data.recipients.map(recipient => {
            const address = `${recipient.street}, ${recipient.number}${
              recipient.complement !== '' ? ` - ${recipient.complement}` : ''
            }, ${recipient.city}, ${recipient.state}`;
            recipient = {
              ...recipient,
              address,
            };
            return recipient;
          })
        );
        setLoading(0);
      } catch (error) {
        setRecipients([]);
        setLoading(0);
        trataError(error);
      }
    }
    load();
  }, [page, name, trataError]);

  useEffect(() => {
    loadRecipients();
  }, [loadRecipients]);

  function handleSearch({ nameSearch }) {
    setName(nameSearch);
  }

  async function handleDelete(recipientDelete) {
    try {
      const response = await api.delete(`recipients/${recipientDelete.id}`);
      if (response.status === 200) {
        toast.success('Destinatário apagada com sucesso!');
        loadRecipients();
      } else {
        toast.warn('Não foi possível apagar o destinatário!');
      }
    } catch (error) {
      trataError(error);
    }
  }

  function confirmDelete(recipientDelete) {
    confirmAlert({
      title: 'Exclusão',
      message: 'Deseja excluir o destinatário?',
      buttons: [
        {
          label: 'Apagar',
          onClick: () => {
            handleDelete(recipientDelete);
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
        <h1>Gerenciando destinatários</h1>
        <Options>
          <Form onSubmit={handleSearch}>
            <span>
              <MdSearch size={22} color="#999999" />
            </span>
            <Input
              name="nameSearch"
              placeholder="Digite o destinatário e tecle enter"
            />
          </Form>
          <AddButton
            title="CADASTRAR"
            loading={loading}
            IconButton={MdAdd}
            type="button"
            onClick={() => {
              history.push('/recipient/store');
            }}
          />
        </Options>
      </Content>
      <ContentTable>
        {loading ? (
          <Mensagem>
            <h1>Carregando destinatários...</h1>
          </Mensagem>
        ) : recipients.length <= 0 ? (
          <Mensagem>
            <h1>Não foi encontrado nenhum destinatário</h1>
          </Mensagem>
        ) : (
          <Table>
            <Header>
              <DivID>
                <strong>ID</strong>
              </DivID>
              <DivName>
                <strong>Nome</strong>
              </DivName>
              <DivAddress>
                <strong>Endereço</strong>
              </DivAddress>
              <DivActions>
                <strong>Ações</strong>
              </DivActions>
            </Header>
            {recipients.map(item => (
              <TableRow key={item.id}>
                <DivID>
                  <TextTable>#{item.id}</TextTable>
                </DivID>
                <DivName>
                  <TextTable>{item.name}</TextTable>
                </DivName>
                <DivAddress>
                  <TextTable>{item.address}</TextTable>
                </DivAddress>
                <DivActions>
                  <Actions
                    Edit={() => history.push(`/recipient/update/${item.id}`)}
                    Delete={() => confirmDelete(item)}
                  />
                </DivActions>
              </TableRow>
            ))}
          </Table>
        )}
      </ContentTable>
      <Pagination page={page} setPage={setPage} list={recipients} />
    </Container>
  );
}
