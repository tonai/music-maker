import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import audioContext from '../../classes/AudioContext';

import './Track.css';
import { changeNodeValue, changeSample, trackToggleAdd } from '../../redux/actions';
import { Sample } from '../Sample/Sample';

export class Track extends PureComponent {

  getTitle = () => this.props.start ? 'Stop' : 'Play';

  handleAdd = () => this.props.trackToggleAdd(this.props.id);

  handleChangeNode = node => event => this.props.changeNodeValue(this.props.id, node, 'gain', event.target.value);

  handleChangeSample = event => {
    const { id } = this.props;
    const { value } = event.target;
    if (value) {
      audioContext.load(value)
        .then(data => this.props.changeSample(id, value, data));
    } else {
      this.props.changeSample(id, value)
    }
  };

  render = () => {
    const { addMode, data, id, maxDuration, nodes, offset, settings, startOffsets, title } = this.props;
    return (
      <div className="Track">
        <div className="Track__row">
          <div className="Track__head">
            <label className="Track__label" htmlFor={`sample-${id}`}>Sample</label>
            <select
              className="Track__input"
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
        {nodes.map((node, index) => (
          <div className="Track__row" key={index}>
            <div className="Track__head Track__head--node">
              <label className="Track__label" htmlFor={`sample-${id}`}>Volume</label>
              <input
                className="Track__input"
                max={1}
                min={0}
                onChange={this.handleChangeNode(index)}
                step={0.01}
                type="range"
                value={node.gain.value}
              />
            </div>
            <div className="Track__body"/>
          </div>
        ))}
      </div>
    );
  }

}

const mapDispatchToProps = {
  changeNodeValue,
  changeSample,
  trackToggleAdd
};

export default connect(null, mapDispatchToProps)(Track);
