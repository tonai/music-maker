import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { changeLoop, play, stop } from '../../redux/actions';

import './ManagerHeader.css';

export class ManagerHeader extends PureComponent {
  
  getTitle = () => this.props.isPlaying ? 'Stop' : 'Play';

  handleChangeLoop = event => this.props.changeLoop(event.target.checked);

  handleChangePlayPause = () => this.props.isPlaying ? this.props.stop() : this.props.play();

  render = () =>
    <div className="ManagerHeader">
      <div>
        <input
          checked={this.props.isPlaying}
          id="play"
          onChange={this.handleChangePlayPause}
          type="checkbox"
        />
        <label htmlFor="play">{this.getTitle()}</label>
      </div>
      <div>
        <input
          checked={this.props.loop}
          id="loop"
          onChange={this.handleChangeLoop}
          type="checkbox"
        />
        <label htmlFor="loop">Loop</label>
      </div>
      <div>{this.props.bpm} bpm</div>
    </div>;

}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  changeLoop,
  play,
  stop
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerHeader);
