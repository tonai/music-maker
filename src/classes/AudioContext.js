import { createIncrementArray } from '../services/utils';

class AudioContext {

  analyser = null;
  biquadFilter = null;
  bufferDataMap = new Map();
  context = null;
  distortion = null;
  gainNode = null;
  sampleDir = 'samples/';

  constructor() {
    this.context = new window.AudioContext();
    this.analyser = this.context.createAnalyser();
    this.distortion = this.context.createWaveShaper();
    this.gainNode = this.context.createGain();
    this.biquadFilter = this.context.createBiquadFilter();
  }

  decodeAudioData = arrayBuffer =>
    new Promise((resolve, reject) =>
      this.context.decodeAudioData(arrayBuffer, buffer => resolve({ buffer }), reject)
    );

  fetch = title =>
    fetch(`${this.sampleDir}${title}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`)
        }
        return response.arrayBuffer();
      })
      .then(this.decodeAudioData)
      .then(data => {
        if (!data.buffer) {
          throw new Error(`Error decoding file data ${this.sampleDir}${title}`);
        }
        return data;
      });

  load = samples => {
    const titles = samples instanceof Array ? samples : [samples];
    return Promise.all(titles.map(this.getBufferData))
      .then(bufferDatas => {
        bufferDatas.reduce((map, buffer, index) => {
          map.set(titles[index], buffer);
          return map;
        }, this.bufferDataMap);
        return samples instanceof Array ? bufferDatas : bufferDatas[0];
      });
  };

  getBufferData = title => this.bufferDataMap.get(title) || this.fetch(title);

  getSource = (title) => {
    const data = this.bufferDataMap.get(title);
    const source = this.context.createBufferSource();

    source.buffer = data.buffer;
    source.connect(this.context.destination);

    return source;
  };

  setFilter = (source, value) => {
    if (!source) {
      return;
    }
    source.disconnect(0);
    this.biquadFilter.disconnect(0);
    if (value) {
      source.connect(this.biquadFilter);
      this.biquadFilter.connect(this.gainNode);
    } else {
      source.connect(this.gainNode);
    }
  };

  setFrequency = value => {
    const minValue = 40; // 40Hz
    const maxValue = this.context.sampleRate / 2;
    const numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
    const multiplier = Math.pow(2, numberOfOctaves * (value - 1));
    this.biquadFilter.frequency.value = maxValue * multiplier;
  };

  setQuality = value => this.biquadFilter.Q.value = value * 30;

  setType = value => this.biquadFilter.type = value;

  setVolume = value => this.gainNode.gain.value = value;

  update = (source, state) => {
    this.setFilter(source, state.filter);
    this.setFrequency(state.frequency);
    this.setQuality(state.quality);
    this.setType(state.type);
    this.setVolume(state.volume);
  }

}

export default new AudioContext();
