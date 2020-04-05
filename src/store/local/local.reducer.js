import {INITIAL_STATE, ACTIONS} from './local.consts';
import {update} from './local.reducer.handler';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.SET_DEVICES_LIST:
      return update(state, {devicesList: action.devicesList});

    case ACTIONS.SET_SELECTED_DEVICE:
      return update(state, {selectedDevice: action.selectedDevice});

    default:
      return state;
  }
};
