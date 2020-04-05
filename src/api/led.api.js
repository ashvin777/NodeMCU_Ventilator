export function lefOnApi(ip) {
  return fetch('http://' + ip + '/LEDOn');
}

export function lefOffApi(ip) {
  return fetch('http://' + ip + '/LEDOff');
}
