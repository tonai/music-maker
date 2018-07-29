import { createIncrementArray } from '../services/utils';

import { CHANGE_LOOP, CHANGE_SAMPLE, PLAY, STOP } from './actions';

const defaultState = {
  beat: 8,
  bpm: 114,
  isPlaying: false,
  loop: false,
  start: 0,
  tracks: [
    {
      buffer: null,
      id: 0,
      sample: '',
      startOffsets: createIncrementArray(8).map(i => i / 114 * 60)
    },
    {
      buffer: null,
      id: 1,
      sample: '',
      startOffsets: [0]
    }
  ]
};

export default function(state = defaultState, action) {
  switch(action.type) {
    case CHANGE_LOOP: {
      return {
        ...state,
        loop: action.value
      };
    }

    case CHANGE_SAMPLE: {
      const index = state.tracks.findIndex(track => track.id === action.id);
      if (index === -1) {
        return state;
      }
      return {
        ...state,
        tracks: [
          ...state.tracks.slice(0, index),
          {
            ...state.tracks[index],
            buffer: action.buffer,
            title: action.title
          },
          ...state.tracks.slice(index + 1),
        ]
      };
    }
    case PLAY: {
      return {
        ...state,
        isPlaying: true,
        start: action.start
      };
    }

    case STOP: {
      return {
        ...state,
        isPlaying: false
      };
    }


    default:
      return state;
  }
}
