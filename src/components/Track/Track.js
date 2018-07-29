import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import audioContext from '../../classes/AudioContext';

import './Track.css';
import { changeSample } from '../../redux/actions';

export class Track extends PureComponent {

  getTitle = () => this.props.start ? 'Stop' : 'Play';

  handleChangeSample = event => {
    const title = event.target.value;
    audioContext.load(title)
      .then(buffer => this.props.changeSample(this.props.id, title, buffer));
  };

  render = () => {
    const { buffer, id, maxDuration, title } = this.props;
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
        </div>
        <div className="Track__body">
          {buffer && (<div className="Track__sample" style={{ width: `${buffer.duration / maxDuration * 100000}%` }}/>)}
        </div>
      </div>
    );
  }

}

const mapDispatchToProps = {
  changeSample
};

export default connect(null, mapDispatchToProps)(Track);
