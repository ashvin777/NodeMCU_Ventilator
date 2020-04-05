import React, {Component} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import AppRouter from './App.Router';
import store from './store/store';
import {NativeRouter} from 'react-router-native';

export default class App extends Component {
  render() {
    return (
      <StoreProvider store={store}>
        <PaperProvider>
          <NativeRouter>
            <AppRouter />
          </NativeRouter>
        </PaperProvider>
      </StoreProvider>
    );
  }
}
