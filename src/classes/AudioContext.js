class AudioContext {

  context = null;
  bufferMap = new Map();
  sampleDir = 'samples/';

  constructor() {
    this.context = new window.AudioContext();
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

  play = title => {
    const buffer = this.bufferMap.get(title);
    const source = this.context.createBufferSource();
    source.buffer = buffer;
    source.connect(this.context.destination);
    source.start();
  }

}

export default new AudioContext();
