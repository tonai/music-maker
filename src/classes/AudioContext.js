class AudioContext {

  analyser = null;
  biquadFilter = null;
  bufferMap = new Map();
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

  decodeAudioData = buffer =>
    new Promise((resolve, reject) => {
      this.context.decodeAudioData(buffer, resolve, reject);
    });

  fetch = title =>
    fetch(`${this.sampleDir}${title}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`)
        }
        return response.arrayBuffer();
      })
      .then(this.decodeAudioData)
      .then(buffer => {
        if (!buffer) {
          throw new Error(`Error decoding file data ${this.sampleDir}${title}`);
        }
        return buffer;
      });

  load = titles =>
    Promise.all(titles.map(this.fetch))
      .then(buffers => buffers.reduce((map, buffer, index) => {
        map.set(titles[index], buffer);
        return map;
      }, this.bufferMap));

  getSource = (title, state) => {
    const buffer = this.bufferMap.get(title);
    const source = this.context.createBufferSource();
    source.buffer = buffer;
    source.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.update(source, state);
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
