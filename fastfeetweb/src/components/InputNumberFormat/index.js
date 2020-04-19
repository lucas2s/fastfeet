import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactNumberFormat from 'react-number-format';
import { useField } from '@unform/core';

import { Container } from './styles';

export default function InputNumberFormat({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [valued, setValued] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'props.value',
      setValue(ref, value) {
        ref.setValued(value);
      },
      clearValue(ref) {
        ref.setValued(null);
      },
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    setValued(defaultValue);
  }, [defaultValue]);

  return (
    <Container>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <ReactNumberFormat
        name={fieldName}
        ref={inputRef}
        value={valued}
        onValueChange={values => setValued(values.value)}
        {...rest}
      />
      {error && <span>{error}</span>}
    </Container>
  );
}

InputNumberFormat.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

InputNumberFormat.defaultProps = {
  label: null,
};
