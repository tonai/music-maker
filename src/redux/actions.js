import audioContext from '../classes/AudioContext';

export const CHANGE_SETTINGS = 'CHANGE_SETTINGS';
export function changeSettings(name, value) {
  return {
    name,
    type: CHANGE_SETTINGS,
    value
  };
}

export const CHANGE_SAMPLE = 'CHANGE_SAMPLE';
export function changeSample(id, title, data) {
  return {
    data,
    id,
    title,
    type: CHANGE_SAMPLE,
  };
}

export const PLAY = 'PLAY';
export function play() {
  return {
    start: audioContext.context.currentTime,
    type: PLAY
  };
}

export const STOP = 'STOP';
export function stop() {
  return {
    type: STOP
  };
}
