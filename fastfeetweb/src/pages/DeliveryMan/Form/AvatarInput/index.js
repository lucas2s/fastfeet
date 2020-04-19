import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import { toast } from 'react-toastify';

import api from '~/services/api';
import InitialName from '~/components/InitialName';

import { Container, LabelAvatar, ImgAvatar } from './styles';

export default function AvatarInput({ name, iname, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const [fileId, setFileId] = useState(defaultValue && defaultValue.id);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'dataset.fileid',
      clearValue() {
        inputRef.value = '';
        setPreview(null);
      },
      setValue(value) {
        setPreview(value);
      },
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    if (defaultValue) {
      setPreview(defaultValue.url);
      setFileId(defaultValue.id);
    }
  }, [defaultValue]);

  async function handleChange(e) {
    try {
      const data = new FormData();

      data.append('file', e.target.files[0]);

      const response = await api.post('files', data);

      const { id, url } = response.data;

      setPreview(url);
      setFileId(id);
    } catch (err) {
      toast.error(error.response.data.error);
    }
  }

  return (
    <Container>
      <LabelAvatar>
        {preview ? (
          <ImgAvatar src={preview} alt={iname} />
        ) : (
          <InitialName name={iname} size={150} />
        )}
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleChange}
          data-fileid={fileId}
          {...rest}
        />
        {error && <span>{error}</span>}
      </LabelAvatar>
    </Container>
  );
}

AvatarInput.propTypes = {
  iname: PropTypes.string,
  name: PropTypes.string.isRequired,
};

AvatarInput.defaultProps = {
  iname: null,
};
