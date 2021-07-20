import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import { Home } from '../Pages/Home'
import { SignUp } from '../Pages/SignUp'

import { SearchMarvel } from '../Pages/SearchMarvel';
import { MyAccount } from '../Pages/MyAccount';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/signup" exact component={SignUp} />

    <Route path="/search-marvel" exact component={SearchMarvel} isPrivate />
    <Route path="/my-account" exact component={MyAccount} isPrivate />
  </Switch>
);

export default Routes;