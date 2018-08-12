import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import audioContext from '../../classes/AudioContext';

import './Track.css';
import { changeSample, trackToggleAdd } from '../../redux/actions';
import { Sample } from '../Sample/Sample';

export class Track extends PureComponent {

  getTitle = () => this.props.start ? 'Stop' : 'Play';

  handleAdd = () => this.props.trackToggleAdd(this.props.id);

  handleChangeSample = event => {
    const title = event.target.value;
    if (title) {
      audioContext.load(title)
        .then(data => this.props.changeSample(this.props.id, title, data));
    } else {
      this.props.changeSample(this.props.id, title)
    }
  };

  render = () => {
    const { addMode, data, id, maxDuration, offset, settings, startOffsets, title } = this.props;
    return (
      <div className="Track">
        <div className="Track__head">
          <label htmlFor={`sample-${id}`}>Sample</label>
          <select
            id={`sample-${id}`}
            onChange={this.handleChangeSample}
            value={title}
          >
            <option value=""/>
            <option value="E808_CL-01.wav">E808_CL-01.wav</option>
            <option value="E808_RS-03.wav">E808_RS-03.wav</option>
            <option value="techno.wav">techno.wav</option>
          </select>
          {data && (
            <button className={classnames('Track__add', {active: addMode})} onClick={this.handleAdd}>+</button>
          )}
        </div>
        <div className="Track__body">
          {data && startOffsets.map(offset => (
            <Sample bpm={settings.bpm} key={offset} maxDuration={maxDuration} offset={offset} {...data}/>
          ))}
          {addMode && (
            <Sample active bpm={settings.bpm} maxDuration={maxDuration} offset={offset} {...data}/>
          )}
        </div>
      </div>
    );
  }

}

const mapDispatchToProps = {
  changeSample,
  trackToggleAdd
};

export default connect(null, mapDispatchToProps)(Track);
