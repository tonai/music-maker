import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import audioContext from '../../classes/AudioContext';
import { createIncrementArray } from '../../services/utils';
import { addSamples, play, stop } from '../../redux/actions';

import ManagerHeader from '../ManagerHeader/ManagerHeader';
import { Progress } from '../Progress/Progress';
import Track from '../Track/Track';

import './Manager.css';

export class Manager extends PureComponent {

  ref;
  sources = [];
  state = {
    pageX: 0
  };
  timeout = 0;

  componentDidUpdate(prevProps) {
    const { isPlaying, start } = this.props;

    if (prevProps.start !== start) {
      this.start();
    } else if (prevProps.isPlaying === true && isPlaying === false) {
      this.stop();
    }
  }

  getMaxDuration = () => this.props.settings.beat / this.props.settings.bpm * 60;

  getOffset = () => {
    if (!this.ref) return null;
    const { left, width } = this.ref.getBoundingClientRect();
    const maxDuration = this.getMaxDuration();
    const { settings } = this.props;
    const { pageX } = this.state;
    const offset = (pageX - left) / width * maxDuration * settings.bpm / 60;
    return Math.round(offset);
  };

  handleClick = () => this.props.addSamples(this.getOffset());

  handleEnd = () =>
    this.props.settings.loop && this.props.isPlaying
      ? this.props.play()
      : this.props.stop();

  handleMouseMove = event => {
    this.setState({
      pageX: event.pageX
    });
  };

  initRef = ref => this.ref = ref;

  render = () => {
    const { isPlaying, settings, start, tracks } = this.props;
    const { pageX } = this.state;
    const maxDuration = this.getMaxDuration();
    const offset = this.getOffset();

    return (
      <div className="Manager">
        <ManagerHeader/>
        <div className="Manager__tracks">
          <div className="Manager__bg">
            {createIncrementArray(settings.beat).map(index => (
              <div className="Manager__beat" key={index} style={{ left: `${index  / settings.beat * 100}%` }}/>
            ))}
          </div>
          {tracks.map((track, index) => (
            <Track
              id={index}
              key={index}
              maxDuration={maxDuration}
              offset={offset}
              pageX={pageX}
              settings={settings}
              {...track}
            />
          ))}
          <div
            className="Manager__progress"
            onMouseMove={this.handleMouseMove}
            onClick={this.handleClick}
            ref={this.initRef}
          >
            <Progress isPlaying={isPlaying} maxDuration={maxDuration} start={start}/>
          </div>
        </div>
      </div>
    );
  };

  start = () => {
    const { settings, start, tracks } = this.props;
    const maxDuration = this.getMaxDuration();

    this.sources = tracks
      .filter(track => track.data)
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

    this.sources.forEach(source => source.source.start(source.offset / settings.bpm * 60 + start));
    this.timeout = setTimeout(this.handleEnd, maxDuration * 1000);
  };

  stop = () => {
    clearTimeout(this.timeout);
    this.sources.forEach(source => source.source.stop());
  };
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  addSamples,
  play,
  stop
};


export default connect(mapStateToProps, mapDispatchToProps)(Manager);
