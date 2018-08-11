import audioContext from '../classes/AudioContext';

export const CHANGE_LOOP = 'CHANGE_LOOP';
export function changeLoop(value) {
  return {
    type: CHANGE_LOOP,
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
