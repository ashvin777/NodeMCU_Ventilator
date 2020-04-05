export function calculateTTX(stx, iex) {
  return (stx * 1) / (1 + iex);
}

export function calculateDTX(stx, ttx) {
  return stx - ttx * 2;
}

export function calculatePulseCount(strokeLength, pulsesFor1MM) {
  return strokeLength * pulsesFor1MM;
}

export function calculateOnOffTime(stx, pulseCount) {
  return stx / pulseCount;
}
