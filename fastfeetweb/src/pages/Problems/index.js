import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaTruck, FaSmog } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';

import { signOut } from '~/store/modules/auth/actions';
import api from '~/services/api';
import Pagination from '~/components/Pagination';
import Actions from '~/components/MenuActions';
import ModalDetailsProblem from './DetailsProblem';

import {
  Container,
  Content,
  ContentTable,
  Table,
  Mensagem,
  Header,
  DivDelivery,
  DivProblem,
  DivActions,
  TableRow,
  TextTable,
} from './styles';

export default function ListRecipient() {
  const [problems, setProblems] = useState([]);
  const [page = 1, setPage] = useState();
  const [loading = 0, setLoading] = useState();

  const [modal, setModal] = useState(false);
  const [problem, setProblem] = useState();

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

  const loadProblems = useCallback(() => {
    async function load() {
      try {
        setLoading(1);
        const response = await api.get('/problems/deliveries', {
          params: {
            page,
          },
        });

        let listProblems = [];
        response.data.deliverysProblems.forEach(delivery => {
          const list = delivery.DeliveryProblems.map(prob => {
            const strsize = prob.description.length;
            return {
              deliveryId: delivery.id,
              problemId: prob.id,
              descSmall: `${
                strsize > 110
                  ? `${prob.description.substring(0, 110)}...`
                  : prob.description
              }`,
              descFull: prob.description,
            };
          });
          listProblems = listProblems.concat(list);
        });

        setProblems(listProblems);

        setLoading(0);
      } catch (error) {
        setProblems([]);
        setLoading(0);
        trataError(error);
      }
    }
    load();
  }, [page, trataError]);

  useEffect(() => {
    loadProblems();
  }, [loadProblems]);

  function handleShow(item) {
    setProblem(item);
    setModal(true);
  }

  async function handleDelete(deliveryDelete) {
    try {
      const response = await api.delete(
        `deliveries/${deliveryDelete.deliveryId}`
      );
      if (response.status === 200) {
        toast.success('Encomenda cancelada com sucesso!');
        loadProblems();
      } else {
        toast.warn('Não foi possível apagar a encomenda!');
      }
    } catch (error) {
      trataError(error);
    }
  }

  function confirmCancel(deliveryDelete) {
    confirmAlert({
      title: 'Cancelamento',
      message: 'Deseja cancelar a encomenda?',
      buttons: [
        {
          label: 'Cancelar',
          onClick: () => {
            handleDelete(deliveryDelete);
          },
        },
        {
          label: 'Voltar',
          onClick: () => toast.warn('Cancelamento não processado!!'),
        },
      ],
    });
  }

  return (
    <Container>
      <Content>
        <h1>Problemas na entrega</h1>
      </Content>
      <ContentTable>
        {loading ? (
          <Mensagem>
            <h1>Carregando Problemas na entrega...</h1>
          </Mensagem>
        ) : problems.length <= 0 ? (
          <Mensagem>
            <div>
              <FaSmog
                size={80}
                color="#999999"
                style={{ paddingRight: '20px' }}
              />
              <FaTruck size={100} color="#7D40E7" />
            </div>
            <h1>Não foi encontrado nenhuma encomenda com problema</h1>
          </Mensagem>
        ) : (
          <Table>
            <Header>
              <DivDelivery>
                <strong>Encomenda</strong>
              </DivDelivery>
              <DivProblem>
                <strong>Nome</strong>
              </DivProblem>
              <DivActions>
                <strong>Ações</strong>
              </DivActions>
            </Header>
            {problems.map(item => (
              <TableRow key={item.problemId}>
                <DivDelivery>
                  <TextTable>#{item.deliveryId}</TextTable>
                </DivDelivery>
                <DivProblem>
                  <TextTable>{item.descSmall}</TextTable>
                </DivProblem>
                <DivActions>
                  <Actions
                    Show={() => handleShow(item)}
                    Cancel={() => confirmCancel(item)}
                  />
                </DivActions>
              </TableRow>
            ))}
          </Table>
        )}
      </ContentTable>
      <Pagination page={page} setPage={setPage} list={problems} />
      {modal && (
        <ModalDetailsProblem
          problem={problem.descFull}
          close={() => setModal(false)}
        />
      )}
    </Container>
  );
}
