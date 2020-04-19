/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useCallback } from 'react';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch } from 'react-icons/md';
import { FaCircle } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import { useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';

import Input from '~/components/SimpleInput';
import { signOut } from '~/store/modules/auth/actions';
import api from '~/services/api';
import history from '~/services/history';
import Pagination from '~/components/Pagination';
import InitialName from '~/components/InitialName';
import Actions from '~/components/MenuActions';
import ModalDetailsDelivery from './DetailsDelivery';

import {
  Container,
  Content,
  Options,
  ContentTable,
  Table,
  Mensagem,
  Header,
  DivID,
  DivRecipient,
  DivDeliveryMan,
  DivCity,
  DivState,
  DivStatus,
  DivActions,
  TableRow,
  TextTable,
  AddButton,
} from './styles';

export default function ListDelivery() {
  const timeSP = 'America/Sao_Paulo';

  const [deliverys, setDeliverys] = useState([]);
  const [product = '', setProduct] = useState();
  const [page = 1, setPage] = useState();
  const [loading = 0, setLoading] = useState();

  const [modal, setModal] = useState(false);
  const [delivery, setDelivery] = useState();

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

  const loadDeliveries = useCallback(() => {
    async function load() {
      try {
        setLoading(1);
        const response = await api.get('deliveries', {
          params: {
            product,
            page,
          },
        });

        setDeliverys(
          response.data.deliverys.map(item => {
            let status = '';
            if (item.end_date !== null) {
              status = 'ENTREGUE';
            } else if (item.canceled_at !== null) {
              status = 'CANCELADA';
            } else if (item.start_date !== null) {
              status = 'RETIRADA';
            } else {
              status = 'PENDENTE';
            }
            item = {
              ...item,
              status,
              startDate: item.start_date
                ? format(
                    zonedTimeToUtc(parseISO(item.start_date), timeSP),
                    "dd'/'MM'/'yyyy 'às' HH':'mm':'ss",
                    {
                      locale: pt,
                    }
                  )
                : null,
              endDate: item.end_date
                ? format(
                    zonedTimeToUtc(parseISO(item.end_date), timeSP),
                    "dd'/'MM'/'yyyy 'às' HH':'mm':'ss",
                    {
                      locale: pt,
                    }
                  )
                : null,
            };

            return item;
          })
        );
        setLoading(0);
      } catch (error) {
        setDeliverys([]);
        setLoading(0);
        trataError(error);
      }
    }
    load();
  }, [page, product, trataError]);

  useEffect(() => {
    loadDeliveries();
  }, [loadDeliveries]);

  function handleSearch({ productSearch }) {
    setProduct(productSearch);
  }

  async function handleDelete(deliveryDelete) {
    try {
      const response = await api.delete(`deliveries/${deliveryDelete.id}`);
      if (response.status === 200) {
        toast.success('Encomenda apagada com sucesso!');
        loadDeliveries();
      } else {
        toast.warn('Não foi possível apagar a encomenda!');
      }
    } catch (error) {
      trataError(error);
    }
  }

  function confirmDelete(deliveryDelete) {
    confirmAlert({
      title: 'Exclusão',
      message: 'Deseja excluir a encomenda?',
      buttons: [
        {
          label: 'Apagar',
          onClick: () => {
            handleDelete(deliveryDelete);
          },
        },
        {
          label: 'Cancelar',
          onClick: () => toast.warn('Exclusão Cancelada!'),
        },
      ],
    });
  }

  function handleEdit(deliveryEdit) {
    const edit = () => history.push(`/delivery/update/${deliveryEdit.id}`);
    if (deliveryEdit.status === 'PENDENTE') {
      return edit;
    }
    return null;
  }

  function handleShow(item) {
    setDelivery(item);
    setModal(true);
  }

  return (
    <Container>
      <Content>
        <h1>Gerenciando encomendas</h1>
        <Options>
          <Form onSubmit={handleSearch}>
            <span>
              <MdSearch size={22} color="#999999" />
            </span>
            <Input
              name="productSearch"
              placeholder="Digite o produto e tecle enter"
            />
          </Form>
          <AddButton
            title="CADASTRAR"
            loading={loading}
            IconButton={MdAdd}
            type="button"
            onClick={() => {
              history.push('/delivery/store');
            }}
          />
        </Options>
      </Content>
      <ContentTable>
        {loading ? (
          <Mensagem>
            <h1>Carregando Encomendas...</h1>
          </Mensagem>
        ) : deliverys.length <= 0 ? (
          <Mensagem>
            <h1>Não foi encontrado nenhuma encomenda</h1>
          </Mensagem>
        ) : (
          <Table>
            <Header>
              <DivID>
                <strong>ID</strong>
              </DivID>
              <DivRecipient>
                <strong>Destinatário</strong>
              </DivRecipient>
              <DivDeliveryMan>
                <strong>Entregador</strong>
              </DivDeliveryMan>
              <DivCity>
                <strong>Cidade</strong>
              </DivCity>
              <DivState>
                <strong>Estado</strong>
              </DivState>
              <DivStatus>
                <strong>Status</strong>
              </DivStatus>
              <DivActions>
                <strong>Ações</strong>
              </DivActions>
            </Header>
            {deliverys.map(item => (
              <TableRow key={item.id}>
                <DivID>
                  <TextTable>#{item.id}</TextTable>
                </DivID>
                <DivRecipient>
                  <TextTable>{item.recipient.name}</TextTable>
                </DivRecipient>
                <DivDeliveryMan>
                  <div className="delivery_deliveryman">
                    {item.deliveryman.avatar ? (
                      <img
                        src={item.deliveryman.avatar.url}
                        alt={item.deliveryman.name}
                      />
                    ) : (
                      <InitialName name={item.deliveryman.name} size={35} />
                    )}
                    <TextTable>{item.deliveryman.name}</TextTable>
                  </div>
                </DivDeliveryMan>
                <DivCity>
                  <TextTable>{item.recipient.city}</TextTable>
                </DivCity>
                <DivState>
                  <TextTable>{item.recipient.state}</TextTable>
                </DivState>
                <DivStatus>
                  <div className={`delivery_status ${item.status}`}>
                    <TextTable>
                      <FaCircle size={12} />
                    </TextTable>
                    <TextTable>{item.status}</TextTable>
                  </div>
                </DivStatus>
                <DivActions>
                  <Actions
                    Show={() => handleShow(item)}
                    Edit={handleEdit(item)}
                    Delete={() => confirmDelete(item)}
                  />
                </DivActions>
              </TableRow>
            ))}
          </Table>
        )}
      </ContentTable>
      <Pagination page={page} setPage={setPage} list={deliverys} />
      {modal && (
        <ModalDetailsDelivery
          delivery={delivery}
          close={() => setModal(false)}
        />
      )}
    </Container>
  );
}
