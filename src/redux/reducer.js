import { CHANGE_FILTER, CHANGE_FREQUENCY, CHANGE_QUALITY, CHANGE_TYPE, CHANGE_VOLUME } from './actions';

const defaultState = {
  filter: false,
  frequency: 1,
  quality: 1,
  type: 'lowpass',
  volume: 1
};

export default function(state = defaultState, action) {
  switch(action.type) {
    case CHANGE_FILTER: {
      return {
        ...state,
        filter: action.value
      };
    }

    case CHANGE_FREQUENCY: {
      return {
        ...state,
        frequency: action.value
      };
    }

    case CHANGE_QUALITY: {
      return {
        ...state,
        quality: action.value
      };
    }

    case CHANGE_TYPE: {
      return {
        ...state,
        type: action.value
      };
    }

    case CHANGE_VOLUME: {
      return {
        ...state,
        volume: action.value
      };
    }

    default:
      return state;
  }
}
