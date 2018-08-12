import audioContext from '../classes/AudioContext';
import {
  ADD_SAMPLES,
  ADD_TRACK,
  CHANGE_NODE_VALUE,
  CHANGE_SETTINGS,
  CHANGE_SAMPLE,
  PLAY,
  STOP,
  TRACK_TOGGLE_ADD
} from './actions';

const defaultState = {
  isPlaying: false,
  settings: {
    beat: 8,
    bpm: 114,
    loop: false,
  },
  start: 0,
  tracks: []
};

export default function(state = defaultState, action) {
  switch(action.type) {
    case ADD_SAMPLES: {
      return {
        ...state,
        tracks: state.tracks.map(track => {
          if (!track.addMode) {
            return track;
          }
          return {
            ...track,
            startOffsets: [
              ...track.startOffsets,
              action.offset
            ]
          };
        })
      };
    }

    case ADD_TRACK: {
      return {
        ...state,
        tracks: [
          ...state.tracks,
          {
            addMode: false,
            data: null,
            nodes: [ audioContext.context.createGain() ],
            sample: '',
            startOffsets: []
          }
        ]
      };
    }

    case CHANGE_NODE_VALUE: {
      return {
        ...state,
        tracks: state.tracks.map((track, index) => {
          if (index !== action.id) {
            return track;
          }
          return {
            ...track,
            nodes: track.nodes.map((node, index) => {
              if (index === action.node) {
                node.gain.value = action.value;
              }
              return node;
            })
          };
        })
      };
    }

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
      return {
        ...state,
        tracks: [
          ...state.tracks.slice(0, action.id),
          {
            ...state.tracks[action.id],
            data: action.data,
            title: action.title
          },
          ...state.tracks.slice(action.id + 1),
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

    case TRACK_TOGGLE_ADD: {
      return  {
        ...state,
        tracks: [
          ...state.tracks.slice(0, action.id),
          {
            ...state.tracks[action.id],
            addMode: !state.tracks[action.id].addMode
          },
          ...state.tracks.slice(action.id + 1),
        ]
      };
    }

    default:
      return state;
  }
}
