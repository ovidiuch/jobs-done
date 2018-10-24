import React from 'react';
import { Router, BackButton } from '../shared/universalRouter';
import { Routes } from './Routes';

export const App = () => (
  <Router>
    <Router>
      <BackButton>
        <Routes />
      </BackButton>
    </Router>
  </Router>
);
