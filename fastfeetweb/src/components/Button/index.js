import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Button({ title, loading, IconButton, ...rest }) {
  return (
    <Container {...rest} loading={loading}>
      {loading ? (
        <FaSpinner color="#fff" size={20} />
      ) : (
        <>
          <IconButton color="#fff" size={20} />
          {title}
        </>
      )}
    </Container>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.number,
  IconButton: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

Button.defaultProps = {
  loading: 0,
  IconButton: null,
};
