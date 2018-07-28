export const CHANGE_FILTER = 'CHANGE_FILTER';
export function changeFilter(value) {
  return {
    type: CHANGE_FILTER,
    value
  };
}

export const CHANGE_FREQUENCY = 'CHANGE_FREQUENCY';
export function changeFrequency(value) {
  return {
    type: CHANGE_FREQUENCY,
    value
  };
}

export const CHANGE_QUALITY = 'CHANGE_QUALITY';
export function changeQuality(value) {
  return {
    type: CHANGE_QUALITY,
    value
  };
}

export const CHANGE_TYPE = 'CHANGE_TYPE';
export function changeType(value) {
  return {
    type: CHANGE_TYPE,
    value
  };
}

export const CHANGE_VOLUME = 'CHANGE_VOLUME';
export function changeVolume(value) {
  return {
    type: CHANGE_VOLUME,
    value
  };
}
