import React, { PureComponent } from 'react';
import audioContext from '../classes/AudioContext';

export default class PlayButton extends PureComponent {

  constructor(props) {
    super(props);
    audioContext.load([props.sample]);
  }

  handleClick = () => audioContext.play(this.props.sample);

  render = () =>
    <button className="button" onClick={this.handleClick}>
      <span>{this.props.title}</span>
    </button>;

}
