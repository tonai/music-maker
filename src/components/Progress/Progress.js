import React, { PureComponent } from 'react';

import { modulo } from '../../services/math';

import './Progress.css';

export class Progress extends PureComponent {

  state = {
    left: 0
  };

  componentDidUpdate(prevProps) {
    const { isPlaying } = this.props;
    if (prevProps.isPlaying === false && isPlaying === true) {
      this.updateLeft();
    }
  }

  render = () =>
    <div className="Progress" style={{ left: `${this.state.left}%` }}/>;

  updateLeft = () => {
    const { isPlaying, maxDuration, start } = this.props;
    const now = performance.now();
    this.setState({ left: modulo(now - start, maxDuration) / maxDuration * 100 });
    isPlaying
      ? requestAnimationFrame(this.updateLeft)
      : this.setState({ left: 0 });
  };

}
