// import React from 'react';
import {Text} from 'react-native';
import Login from './src/screens/AuthScreens/Login';
import LandingScreen from './src/screens/AuthScreens/LandingScreen';
import ForgotPassword from './src/screens/AuthScreens/ForgotPassword';
import SignUp from './src/screens/AuthScreens/SignUp';
import ResetPassword from './src/screens/AuthScreens/ResetPassword';
import * as React from 'react';
import Setting from './src/screens/Setting';
import Navigation from './src/Navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store/store';
import {ToastProvider} from 'react-native-toast-notifications';
const App = () => {
  // return <Navigation />;
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastProvider>
          <Navigation />
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
