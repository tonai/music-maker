import React, { PureComponent } from 'react';

import './Sample.css';

export class Sample extends PureComponent {

  lineWidth = 1;
  ref;

  componentDidMount = () => {
    this.draw();
  };

  componentDidUpdate = () => {
    this.draw();
  };

  draw = () => {
    if (!this.ref) return;

    const height = this.ref.offsetHeight;
    const width = this.ref.offsetWidth;
    this.ref.height = height;
    this.ref.width = width;

    const { buffer } = this.props;
    const x = this.x(buffer.length, width - this.lineWidth);
    const y = this.y(2, height - this.lineWidth);
    const channelData = buffer.getChannelData(0);

    const context = this.ref.getContext('2d');
    context.beginPath();
    channelData.forEach((yVal, xVal) => context.lineTo(x(xVal) + this.lineWidth / 2, y(yVal) + this.lineWidth / 2));
    context.closePath();
    context.lineWidth = this.lineWidth;
    context.stroke();
  };

  initRef = ref => {
    this.ref = ref;
  };

  render = () => {
    const { buffer, maxDuration, offset } = this.props;
    return (
      <canvas className="Sample" ref={this.initRef} style={{
        left: `${offset / maxDuration * 100}%`,
        width: `${buffer.duration / maxDuration * 100}%`
      }}/>
    );
  };

  x = (max, width) => x => x / max * width;

  y = (max, height) => y =>  ((y + max / 2) * height) / max;

}
