import {ACTIONS} from './local.consts';

const action = (type, payload = {}) => ({
  type,
  ...payload,
});

export const setDevicesList = (devicesList) =>
  action(ACTIONS.SET_DEVICES_LIST, {devicesList});

export const setSelectedDevice = (selectedDevice) =>
  action(ACTIONS.SET_SELECTED_DEVICE, {
    selectedDevice,
  });
