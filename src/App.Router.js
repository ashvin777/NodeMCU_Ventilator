import React, {Component} from 'react';
import {Route} from 'react-router-native';
import {withRouter} from 'react-router-native';
import {View, BackHandler} from 'react-native';

import ListWifi from './components/ListWifi/ListWifi';
import Dashboard from './components/Dashboard/Dashboard';

class AppRouter extends Component {
  componentDidMount() {
    let {history} = this.props;
    BackHandler.addEventListener('hardwareBackPress', () => {
      history.goBack();

      if (history.length <= 1) {
        return false;
      }

      return true;
    });
  }

  render() {
    return (
      <View>
        <Route exact path="/" component={ListWifi} />
        <Route path="/dashboard" component={Dashboard} />
      </View>
    );
  }
}

export default withRouter(AppRouter);
