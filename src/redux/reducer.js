import { createIncrementArray } from '../services/utils';

import { CHANGE_SETTINGS, CHANGE_SAMPLE, PLAY, STOP } from './actions';

const defaultState = {
  isPlaying: false,
  settings: {
    beat: 8,
    bpm: 114,
    loop: false,
  },
  start: 0,
  tracks: [
    {
      data: null,
      id: 0,
      sample: '',
      startOffsets: createIncrementArray(8).map(i => i / 114 * 60)
    },
    {
      data: null,
      id: 1,
      sample: '',
      startOffsets: [0]
    }
  ]
};

export default function(state = defaultState, action) {
  switch(action.type) {
    case CHANGE_SETTINGS: {
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.name]: action.value
        }
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
            data: action.data,
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
