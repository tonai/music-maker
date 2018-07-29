import { CHANGE_LOOP, CHANGE_SAMPLE, PLAY, STOP } from './actions';

const defaultState = {
  isPlaying: false,
  loop: false,
  start: 0,
  tracks: [
    {
      buffer: null,
      id: 0,
      sample: ''
    },
    {
      buffer: null,
      id: 1,
      sample: ''
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
        start: performance.now()
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
