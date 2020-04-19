import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';
import { MdImage } from 'react-icons/md';

import { Container, ContainerContent, SemImagem, Name } from './styles';

export default function InitialName({ name, size }) {
  const [color, setColor] = useState();
  const [background, setBackground] = useState();
  const [initilName, setInitialName] = useState();

  useEffect(() => {
    if (name !== '' && name !== undefined && name !== null) {
      const names = name.split(' ');

      if (names.length > 1) {
        setInitialName(
          names[0].substring(0, 1) + names[names.length - 1].substring(0, 1)
        );
      } else {
        setInitialName(names[0].substring(0, 2));
      }
    } else {
      setInitialName(null);
    }
  }, [name]);

  useEffect(() => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const colorStyle = `rgb(${red},${green},${blue})`;
    const backgorundStyle = transparentize(0.9, colorStyle);

    setColor(colorStyle);
    setBackground(backgorundStyle);
  }, []);

  return initilName ? (
    <Container size={size} background={background} color={color}>
      <Name size={size} color={color} className="initial">
        {initilName}
      </Name>
    </Container>
  ) : (
    <ContainerContent size={size}>
      <MdImage color="#DDDDDD" size={30} />
      <SemImagem>Adicionar foto</SemImagem>
    </ContainerContent>
  );
}

InitialName.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};
