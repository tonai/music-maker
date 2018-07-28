import React, { PureComponent } from 'react';

import audioContext from './classes/AudioContext';
import store from './redux/store';

import PlayButton from './components/PlayButton/PlayButton';
import Settings from './components/Settings/Settings';

class App extends PureComponent {

  constructor(props) {
    super(props);
    store.subscribe(() => audioContext.update(store.getState()));
  }

  render = () =>
    <div>
      <PlayButton sample="techno.wav" title="Play" />
      <Settings/>
    </div>;

}

export default App;
