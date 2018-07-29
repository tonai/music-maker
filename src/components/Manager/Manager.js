import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import audioContext from '../../classes/AudioContext';
import { createIncrementArray } from '../../services/utils';
import { play, stop } from '../../redux/actions';

import ManagerHeader from '../ManagerHeader/ManagerHeader';
import { Progress } from '../Progress/Progress';
import Track from '../Track/Track';

import './Manager.css';

export class Manager extends PureComponent {

  sources = [];
  timeout = 0;

  componentDidUpdate(prevProps) {
    const { isPlaying, start } = this.props;

    if (prevProps.start !== start) {
      this.start();
    } else if (prevProps.isPlaying === true && isPlaying === false) {
      this.stop();
    }
  }

  getMaxDuration = () => 8 / this.props.bpm * 60;

  handleEnd = () =>
    this.props.loop && this.props.isPlaying
      ? this.props.play()
      : this.props.stop();

  render = () => {
    const { beat, isPlaying, start, tracks } = this.props;
    const maxDuration = this.getMaxDuration();
    return (
      <div className="Manager">
        <ManagerHeader/>
        <div className="Manager__tracks">
          <div className="Manager__bg">
            {createIncrementArray(beat).map(index => (
              <div className="Manager__beat" style={{ left: `${index  / beat * 100}%` }}/>
            ))}
          </div>
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
    const { start, tracks } = this.props;
    const maxDuration = this.getMaxDuration();

    this.sources = tracks
      .filter(track => track.buffer)
      .reduce((acc, track) =>
        acc.concat(track.startOffsets.map(offset => ({
          ...track,
          offset
        }))),
        []
      )
      .map(track => ({
        ...track,
        source: audioContext.getSource(track.title)
      }));

    this.sources.forEach(source => source.source.start(source.offset + start));
    this.timeout = setTimeout(this.handleEnd, maxDuration * 1000);
  };

  stop = () => {
    clearTimeout(this.timeout);
    this.sources.forEach(source => source.source.stop());
  };
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  play,
  stop
};


export default connect(mapStateToProps, mapDispatchToProps)(Manager);
