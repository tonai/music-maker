import audioContext from '../classes/AudioContext';

export const ADD_SAMPLES = 'ADD_SAMPLES';
export function addSamples(offset) {
  return {
    offset,
    type: ADD_SAMPLES
  };
}
export const ADD_TRACK = 'ADD_TRACK';
export function addTrack() {
  return {
    type: ADD_TRACK
  };
}

export const CHANGE_NODE_VALUE = 'CHANGE_NODE_VALUE';
export function changeNodeValue(id, node, name, value) {
  return {
    id,
    name,
    node,
    type: CHANGE_NODE_VALUE,
    value
  }
}

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

export const TRACK_TOGGLE_ADD = 'TRACK_TOGGLE_ADD';
export function trackToggleAdd(id) {
  return {
    id,
    type: TRACK_TOGGLE_ADD
  }
}
