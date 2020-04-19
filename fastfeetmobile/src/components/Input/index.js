import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, TInput } from './styles';

export default function Input({ style, icon, ...rest }) {
  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={29} color="#999" />}
      <TInput {...rest} />
    </Container>
  );
}

Input.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.string,
};

Input.defaultProps = {
  style: {},
  icon: null,
};
