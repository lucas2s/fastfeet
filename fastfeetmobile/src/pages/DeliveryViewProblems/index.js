import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import ProblemList from './ProblemList';
import api from '~/services/api';

import {
  Container,
  Background,
  InfoTitle,
  Title,
  ContentList,
  List,
  Loading,
  ContentMessage,
  Message,
} from './styles';

export default function DeliveryViewProblems({ route }) {
  const timeSP = 'America/Sao_Paulo';

  const { deliveryId } = route.params;

  const [problems, setProblems] = useState([]);
  const [loading = false, setLoading] = useState();
  const [page] = useState(1);

  const loadProblems = useCallback(() => {
    async function load() {
      try {
        setLoading(true);

        const response = await api.get(`/deliveryproblems/${deliveryId}`, {
          params: {
            page,
          },
        });

        setProblems(
          response.data.problems.map((problem) => {
            const dateCreate = format(
              parseISO(problem.createdAt, timeSP),
              "dd'/'MM'/'yyyy",
              {
                locale: pt,
              }
            );

            problem = {
              ...problem,
              dateCreate,
            };
            return problem;
          })
        );

        setLoading(false);
      } catch (error) {
        setProblems([]);
        setLoading(false);
        Alert.alert('Erro', 'Falha para consultar os problemas');
      }
    }
    load();
  }, [page, deliveryId]);

  useEffect(() => {
    loadProblems();
  }, [loadProblems]);

  return (
    <Container>
      <Background />
      <InfoTitle>
        <Icon name="local-shipping" size={20} color="#fff" />
        <Title>Encomenda ID {deliveryId}</Title>
      </InfoTitle>
      <ContentList>
        {loading ? (
          <Loading>
            <ActivityIndicator color="#7D40E7" size="large" />
          </Loading>
        ) : problems.length > 0 ? (
          <List
            data={problems}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item: problem }) => <ProblemList data={problem} />}
          />
        ) : (
          <ContentMessage>
            <IconEntypo name="emoji-happy" size={20} color="#2D7F19" />
            <Message>Encomenda sem problemas</Message>
          </ContentMessage>
        )}
      </ContentList>
    </Container>
  );
}

DeliveryViewProblems.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
