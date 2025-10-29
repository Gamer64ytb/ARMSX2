import React from 'react';
import Router from './app_ui/Router.jsx';
import { MaterialYouService } from '@assembless/react-native-material-you';

export default function App() {
  return (
    <MaterialYouService>
      <Router />
    </MaterialYouService>
  );
}
