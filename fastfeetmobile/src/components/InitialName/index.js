import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Container, Name } from './styles';

export default function InitialName({ name, size }) {
  const [initilName, setInitialName] = useState();

  useEffect(() => {
    if (name !== '') {
      const names = name.split(' ');

      if (names.length > 1) {
        setInitialName(names[0].substring(0, 1) + names[1].substring(0, 1));
      } else {
        setInitialName(names[0].substring(0, 2));
      }
    }
  }, [name]);

  return (
    <Container size={size}>
      <Name size={size}>{initilName}</Name>
    </Container>
  );
}

InitialName.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};
