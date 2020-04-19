/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Deliverys from './Deliverys';
import SignIn from '~/pages/SignIn';
import Profile from '~/pages/Profile';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function Routes({ signedIn }) {
  return signedIn ? (
    <BottomTab.Navigator
      tabBarOptions={{
        activeTintColor: '#7D40E7',
        inactiveTintColor: '#999999',
        style: { height: 70, paddingBottom: 10, paddingTop: 10 },
        labelStyle: { fontSize: 16, textAlign: 'center' },
        labelPosition: 'below-icon',
      }}
    >
      <BottomTab.Screen
        name="Deliverys"
        component={Deliverys}
        options={{
          tabBarLabel: 'Entregas',
          tabBarIcon: ({ color }) => {
            return <Icon name="assignment" color={color} size={25} />;
          },
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Meu Perfil',
          tabBarIcon: ({ color }) => (
            <Icon name="account-circle" color={color} size={25} />
          ),
        }}
      />
    </BottomTab.Navigator>
  ) : (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}

Routes.propTypes = {
  signedIn: PropTypes.bool.isRequired,
};
