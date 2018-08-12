class AudioContext {

  bufferDataMap = new Map();
  context = null;
  sampleDir = 'samples/';

  constructor() {
    this.context = new window.AudioContext();
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

  getSource = (title, nodes) => {
    const data = this.bufferDataMap.get(title);
    const audioBufferSourceNode  = this.context.createBufferSource();
    audioBufferSourceNode.buffer = data.buffer;

    let source = audioBufferSourceNode;
    nodes.forEach(node => {
      source.connect(node);
      source = node;
    });
    source.connect(this.context.destination);

    return audioBufferSourceNode;
  };

  update = (source, state) => {
    this.setFilter(source, state.filter);
    this.setFrequency(state.frequency);
    this.setQuality(state.quality);
    this.setType(state.type);
    this.setVolume(state.volume);
  }

}

export default new AudioContext();
