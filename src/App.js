import React, { PureComponent } from 'react';

import PlayButton from './components/PlayButton/PlayButton';
import Settings from './components/Settings/Settings';

class App extends PureComponent {

  render = () =>
    <div>
      <PlayButton sample="techno.wav" title="Play" />
      <Settings/>
    </div>;

}

export default App;
