import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { addTrack, changeSettings, play, stop } from '../../redux/actions';

import './ManagerHeader.css';

export class ManagerHeader extends PureComponent {
  
  getTitle = () => this.props.isPlaying ? 'Stop' : 'Play';

  handleAddTrack = () => this.props.addTrack();

  handleChangeSettings = (name, value) => this.props.changeSettings(name, value);

  handleChangePlayPause = () => this.props.isPlaying ? this.props.stop() : this.props.play();

  render = () =>
    <div className="ManagerHeader">
      <div className="ManagerHeader__settings">
        <button onClick={this.handleAddTrack}>Add track</button>
      </div>
      <div className="ManagerHeader__settings">
        <input
          checked={this.props.isPlaying}
          id="play"
          onChange={this.handleChangePlayPause}
          type="checkbox"
        />
        <label htmlFor="play">{this.getTitle()}</label>
      </div>
      <div className="ManagerHeader__settings">
        <input
          checked={this.props.settings.loop}
          id="loop"
          onChange={event => this.handleChangeSettings('loop', event.target.checked)}
          type="checkbox"
        />
        <label htmlFor="loop">Loop</label>
      </div>
      <div className="ManagerHeader__settings">
        <label htmlFor="bpm">bpm</label>
        <input
          id="bpm"
          onChange={event => this.handleChangeSettings('bpm', +event.target.value)}
          value={this.props.settings.bpm}
        />
      </div>
      <div className="ManagerHeader__settings">
        <label htmlFor="beat">beat</label>
        <input
          id="beat"
          onChange={event => this.handleChangeSettings('beat', +event.target.value)}
          value={this.props.settings.beat}
        />
      </div>
    </div>;

}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  addTrack,
  changeSettings,
  play,
  stop
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerHeader);
