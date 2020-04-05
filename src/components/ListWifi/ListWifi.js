import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import wifi from 'react-native-android-wifi';
import {Appbar, Button} from 'react-native-paper';
import {withRouter} from 'react-router-native';

import {ScrollView, View} from 'react-native';
import {List} from 'react-native-paper';

import * as localActions from '../../store/local/local.actions';
import wifiPermissions from '../../utils/wifi-permissions';
import ListWifiStyles from './ListWifi.styles';

class ListWifi extends Component {
  async componentDidMount() {
    await wifiPermissions();
    this.getDevicesList();
  }

  getDevicesList() {
    let {setDevicesList} = this.props;
    setDevicesList([]);

    wifi.reScanAndLoadWifiList(
      (wifiStringList) => {
        var wifiArray = JSON.parse(wifiStringList);
        setDevicesList(wifiArray);
      },
      (error) => {
        console.log(error);
        //TODO - Notify
      },
    );
  }

  connect(device) {
    let {setSelectedDevice, history} = this.props;

    wifi.findAndConnect(device.SSID, '', (found) => {
      //get the DHCP server IP
      if (found) {
        wifi.getDhcpServerAddress((ip) => {
          setSelectedDevice({
            ...device,
            ip,
          });
          history.push('/dashboard');
        });
      }
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderNavbar()}
        {this.renderButtons()}
        {this.renderList()}
      </ScrollView>
    );
  }

  renderNavbar() {
    return (
      <Appbar>
        <Appbar.Action icon="stethoscope" />
        <Appbar.Content title={'Select ventilator'} />
      </Appbar>
    );
  }

  renderList() {
    let {devicesList} = this.props;

    return (
      <View style={ListWifiStyles.container}>
        {devicesList.map(this.renderListItem.bind(this))}
      </View>
    );
  }

  renderListItem(device) {
    return (
      <List.Item
        onPress={() => this.connect(device)}
        title={device.SSID}
        description={device.BSSID}
        left={(props) => <List.Icon {...props} icon="bed-empty" />}
      />
    );
  }

  renderButtons() {
    return (
      <Button
        style={ListWifiStyles.button}
        icon="update"
        mode="contained"
        onPress={() => this.getDevicesList()}>
        Rescan
      </Button>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.local,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      ...localActions,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ListWifi));
