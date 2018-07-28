import { CHANGE_VOLUME } from './actions';

const defaultState = {
  volume: 1
};

export default function(state = defaultState, action) {
  switch(action.type) {
    case CHANGE_VOLUME: {
      const {volume} = action;
      return {
        ...state,
        volume
      };
    }

    default:
      return state;
  }
}
