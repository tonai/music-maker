import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import audioContext from '../../classes/AudioContext';

import './PlayButton.css';

export class PlayButton extends PureComponent {

  source = null;
  state = {
    loop: false,
    start: false,
  };

  componentDidMount() {
    audioContext.load([this.props.sample]);
  }

  componentDidUpdate() {
    audioContext.update(this.source, this.props)
  }

  getTitle = () => this.state.start ? 'Stop' : 'Play';

  handleChangeLoop = (event) => {
    const { checked } = event.target;
    this.source && (this.source.loop = checked);
    this.setState({ loop: checked });
  };

  handleClickButton = () => {
    if (!this.state.start) {
      this.source = audioContext.getSource(this.props.sample, this.props);
      this.source.onended = this.handleEnd;
      this.source.loop = this.state.loop;
      this.source.start();
      this.setState({start: true});
    } else if (this.source) {
      this.source.stop();
    }
  };

  handleEnd = () => this.setState({start: false});

  render = () =>
    <div className="PlayButton">
      <button
        className={classnames('PlayButton__button', {active: this.state.start})}
        onClick={this.handleClickButton}
      >
        <span className="PlayButton__buttonLabel">{this.getTitle()}</span>
      </button>
      <label>
        Loop
        <input onChange={this.handleChangeLoop} type="checkbox" checked={this.state.loop}/>
      </label>
    </div>;

}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(PlayButton);
