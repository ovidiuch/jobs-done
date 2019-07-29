import React from 'react';
import { Router, BackButton } from '../shared/universalRouter';
import { Routes } from './Routes';

export const App = () => (
  <Router>
    <BackButton>
      <Routes />
    </BackButton>
  </Router>
);
