import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import ListDelivery from '~/pages/Delivery/List';
import StoreDelivery from '~/pages/Delivery/Form';
import ListDeliveryMan from '~/pages/DeliveryMan/List';
import StoreDeliveryMan from '~/pages/DeliveryMan/Form';
import ListRecipient from '~/pages/Recipient/List';
import StoreRecipient from '~/pages/Recipient/Form';
import ListProblems from '~/pages/Problems';
import InvalidRoute from '~/pages/InvalidRoute';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/delivery/list" component={ListDelivery} isPrivate />
      <Route path="/delivery/store" component={StoreDelivery} isPrivate />
      <Route path="/delivery/update/:id" component={StoreDelivery} isPrivate />

      <Route path="/deliveryman/list" component={ListDeliveryMan} isPrivate />
      <Route path="/deliveryman/store" component={StoreDeliveryMan} isPrivate />
      <Route
        path="/deliveryman/update/:id"
        component={StoreDeliveryMan}
        isPrivate
      />

      <Route path="/recipient/list" component={ListRecipient} isPrivate />
      <Route path="/recipient/store" component={StoreRecipient} isPrivate />
      <Route
        path="/recipient/update/:id"
        component={StoreRecipient}
        isPrivate
      />
      <Route path="/problems/list" component={ListProblems} isPrivate />

      <Route path="/" component={InvalidRoute} />
    </Switch>
  );
}
