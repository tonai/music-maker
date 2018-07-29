export const CHANGE_LOOP = 'CHANGE_LOOP';
export function changeLoop(value) {
  return {
    type: CHANGE_LOOP,
    value
  };
}

export const CHANGE_SAMPLE = 'CHANGE_SAMPLE';
export function changeSample(id, title, buffer) {
  return {
    buffer,
    id,
    title,
    type: CHANGE_SAMPLE,
  };
}

export const PLAY = 'PLAY';
export function play() {
  return {
    type: PLAY
  };
}

export const STOP = 'STOP';
export function stop() {
  return {
    type: STOP
  };
}
