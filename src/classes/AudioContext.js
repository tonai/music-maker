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

  getSource = title => {
    const buffer = this.bufferMap.get(title);
    const source = this.context.createBufferSource();
    source.buffer = buffer;
    source.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    return source;
  };

  setVolume = value => this.gainNode.gain.value = value;

  update = (state) => {
    this.setVolume(state.volume);
  }

}

export default new AudioContext();
