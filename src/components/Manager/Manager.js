import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import audioContext from '../../classes/AudioContext';

import { play, stop } from '../../redux/actions';

import ManagerHeader from '../ManagerHeader/ManagerHeader';
import { Progress } from '../Progress/Progress';
import Track from '../Track/Track';

import './Manager.css';

export class Manager extends PureComponent {

  sources = [];

  componentDidUpdate(prevProps) {
    const { isPlaying, start } = this.props;

    if (prevProps.start !== start) {
      this.start();
    } else if (prevProps.isPlaying === true && isPlaying === false) {
      this.stop();
    }
  }

  getMaxDuration = () => this.props.tracks
    .filter(track => track.buffer)
    .map(track => track.buffer.duration)
    .reduce((a, b) => Math.max(a, b), 0);

  handleEnd = () =>
    this.props.loop && this.props.isPlaying
      ? this.props.play()
      : this.props.stop();

  render = () => {
    const { isPlaying, start, tracks } = this.props;
    const maxDuration = this.getMaxDuration() * 1000;
    return (
      <div className="Manager">
        <ManagerHeader/>
        <div className="Manager__tracks">
          {tracks.map(track => (
            <Track key={track.id} maxDuration={maxDuration} {...track}/>
          ))}
          <div className="Manager__progress">
            <Progress isPlaying={isPlaying} maxDuration={maxDuration} start={start}/>
          </div>
        </div>
      </div>
    );
  };

  start = () => {
    const { tracks } = this.props;
    this.sources = tracks
      .filter(track => track.buffer)
      .map(track => audioContext.getSource(track.title));

    const promises = this.sources.map(source => new Promise(resolve => source.onended = resolve));
    Promise.all(promises).then(this.handleEnd);

    this.sources.forEach(source => source.start());
  };

  stop = () => this.sources.forEach(source => source.stop());
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  play,
  stop
};


export default connect(mapStateToProps, mapDispatchToProps)(Manager);
