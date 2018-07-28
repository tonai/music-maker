import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { changeFilter, changeFrequency, changeQuality, changeType, changeVolume } from '../../redux/actions';

import './Settings.css';

export class Settings extends PureComponent {

  handleFilter = event => {
    const { checked } = event.target;
    const { changeFilter } = this.props;
    changeFilter && changeFilter(checked);
  };

  handleFrequency = event => {
    const { value } = event.target;
    const { changeFrequency } = this.props;
    changeFrequency && changeFrequency(value);
  };

  handleVolume = event => {
    const { value } = event.target;
    const { changeVolume } = this.props;
    changeVolume && changeVolume(value);
  };

  handleType = event => {
    const { value } = event.target;
    const { changeType } = this.props;
    changeType && changeType(value);
  };

  handleQuality = event => {
    const { value } = event.target;
    const { changeQuality } = this.props;
    changeQuality && changeQuality(value);
  };

  render = () =>
    <div>
      <label className="Settings__row">
        <label htmlFor="Settings__volume">Volume</label>
        <input
          id="Settings__volume"
          min="0"
          max="1"
          onChange={this.handleVolume}
          step="0.01"
          type="range"
          value={this.props.volume}
        />
      </label>
      <label className="Settings__row">
        <label htmlFor="Settings__filter">Filter</label>
        <input
          id="Settings__filter"
          onChange={this.handleFilter}
          type="checkbox"
          value={this.props.filter}
        />
      </label>
      <label className="Settings__row">
        <label htmlFor="Settings__type">Type</label>
        <select
          id="Settings__type"
          onChange={this.handleType}
          value={this.props.type}
        >
          <option value="lowpass">Low pass</option>
          <option value="highpass">High pass</option>
          <option value="bandpass">Band pass</option>
        </select>
      </label>
      <label className="Settings__row">
        <label htmlFor="Settings__frequency">Frequency</label>
        <input
          id="Settings__frequency"
          min="0"
          max="1"
          onChange={this.handleFrequency}
          step="0.01"
          type="range"
          value={this.props.frequency}
        />
      </label>
      <label className="Settings__row">
        <label htmlFor="Settings__quality">Quality</label>
        <input
          id="Settings__quality"
          min="0"
          max="1"
          onChange={this.handleQuality}
          step="0.01"
          type="range"
          value={this.props.quality}
        />
      </label>
    </div>;

}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  changeFilter,
  changeFrequency,
  changeQuality,
  changeType,
  changeVolume
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
