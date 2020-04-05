import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {View} from 'react-native';
import {lefOnApi, lefOffApi} from '../../api/led.api';
import {setDataToMcu} from '../../api/mcu.api';
import {Appbar, TextInput, Button} from 'react-native-paper';
import {withRouter} from 'react-router-native';

import * as localActions from '../../store/local/local.actions';

import {
  calculateTTX,
  calculateDTX,
  calculatePulseCount,
  calculateOnOffTime,
} from './Dashboard.util';
import DashboardStyles from './Dashboard.styles';

class Dashboard extends Component {
  state = {
    stx: 0,
    iex: 0,
    strokeLength: 0,
    pulsePerMM: 0,
  };

  handleValueChange(field, value) {
    this.setState({[field]: value});
  }

  turnOnLed() {
    let {ip} = this.props.selectedDevice;
    lefOnApi(ip);
  }

  turnOffLed() {
    let {ip} = this.props.selectedDevice;
    lefOffApi(ip);
  }

  sendDataToMcu() {
    let {stx, iex, pulsePerMM, strokeLength} = this.state;
    let {ip} = this.props.selectedDevice;

    let ttx = calculateTTX(stx, iex);
    let dtx = calculateDTX(stx, ttx);
    let pulseCount = calculatePulseCount(strokeLength, pulsePerMM);
    let onOffTime = calculateOnOffTime(stx, pulseCount);

    setDataToMcu(ip, {
      stx,
      iex,
      strokeLength,
      pulsePerMM,
      ttx,
      dtx,
      pulseCount,
      onOffTime,
    });
  }

  render() {
    return (
      <View>
        {this.renderHeader()}
        {this.renderForm()}
        {this.renderButtons()}
      </View>
    );
  }

  renderHeader() {
    let {selectedDevice, history} = this.props;
    return (
      <Appbar>
        <Appbar.Action
          icon="keyboard-backspace"
          onPress={() => history.goBack()}
        />
        <Appbar.Content title={selectedDevice.SSID} />
      </Appbar>
    );
  }

  renderForm() {
    let {stx, iex, pulsePerMM, strokeLength} = this.state;

    return (
      <View style={DashboardStyles.container}>
        <TextInput
          style={DashboardStyles.textInput}
          label="STX"
          onChangeText={(text) => this.handleValueChange('stx', text)}
          value={stx}
          mode={'outlined'}
          keyboardType={'numeric'}
        />

        <TextInput
          style={DashboardStyles.textInput}
          label="IEX"
          onChangeText={(text) => this.handleValueChange('iex', text)}
          value={iex}
          mode={'outlined'}
          keyboardType={'numeric'}
        />

        <TextInput
          style={DashboardStyles.textInput}
          label="Pulse Per MM"
          onChangeText={(text) => this.handleValueChange('pulsePerMM', text)}
          value={pulsePerMM}
          mode={'outlined'}
          keyboardType={'numeric'}
        />

        <TextInput
          style={DashboardStyles.textInput}
          label="Stroke Length"
          onChangeText={(text) => this.handleValueChange('strokeLength', text)}
          value={strokeLength}
          mode={'outlined'}
          keyboardType={'numeric'}
        />
      </View>
    );
  }

  renderButtons() {
    return (
      <>
        <Button
          style={DashboardStyles.button}
          icon="check"
          mode="contained"
          onPress={() => this.sendDataToMcu()}>
          Update Settings
        </Button>
      </>
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
)(withRouter(Dashboard));
