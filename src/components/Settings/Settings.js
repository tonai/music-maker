import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { changeVolume } from '../../redux/actions';

export class Settings extends PureComponent {

  handleVolume = event => {
    const { value } = event.target;
    const { changeVolume } = this.props;
    changeVolume && changeVolume(value);
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
    </div>;

}

const mapStateToProps = state => ({
  volume: state.volume
});

const mapDispatchToProps = {
  changeVolume
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
