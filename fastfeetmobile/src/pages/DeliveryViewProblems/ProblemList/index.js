import React from 'react';
import PropTypes from 'prop-types';

import { Container, TextInfo, TextDate } from './styles';

export default function ProblemList({ data }) {
  return (
    <Container>
      <TextInfo>{data.description}</TextInfo>
      <TextDate>{data.dateCreate}</TextDate>
    </Container>
  );
}

ProblemList.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string.isRequired,
    dateCreate: PropTypes.string.isRequired,
  }).isRequired,
};
