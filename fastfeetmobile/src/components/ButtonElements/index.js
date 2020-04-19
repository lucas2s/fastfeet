import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

export default function ButtonElements({ title, icon, disabled, ...rest }) {
  return (
    <Button
      icon={icon}
      title={title}
      disabled={disabled}
      titleStyle={{
        fontSize: 12,
        color: '#999999',
      }}
      titleProps={{
        numberOfLines: 2,
      }}
      ellipsizeMode="tail"
      buttonStyle={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 103,
        borderRadius: 4,
        backgroundColor: '#f8f9fd',
        padding: 10,
      }}
      {...rest}
    />
  );
}

ButtonElements.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  disabled: PropTypes.bool.isRequired,
};
