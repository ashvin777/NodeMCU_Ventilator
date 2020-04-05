import {PermissionsAndroid} from 'react-native';

export default async function wifiPermissions() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Wifi networks',
        message: 'We need your permission in order to find wifi networks',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Thank you for your permission! :)');
    } else {
      console.log('You will not able to retrieve wifi available networks list');
    }
  } catch (err) {
    console.warn(err);
  }
}
