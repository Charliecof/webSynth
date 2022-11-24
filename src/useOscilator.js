import { useRef, useEffect, useState } from "react";
import FrequencyMap from "note-frequency-map";

export default function useOscilator() {
  const audioCtxContainer = useRef(null);
  const [wave, setWave] = useState("sine");

  const onKeyDown = (note) => {
    let osc1;
    let gainNode = new GainNode(audioCtxContainer.current);
    let pannerNode = new StereoPannerNode(audioCtxContainer.current, {
      pan: audioCtxContainer.current.panner,
    });

    gainNode.gain.value = audioCtxContainer.current.volume;
    osc1 = audioCtxContainer.current.createOscillator();
    osc1.type = wave;
    osc1.detune.value = 100 * audioCtxContainer.current.detune;
    osc1.frequency.value = FrequencyMap.noteFromName(note).frequency;
    osc1.start();
    osc1
      .connect(gainNode)
      .connect(pannerNode)
      .connect(audioCtxContainer.current.destination);
    audioCtxContainer.current.oscialdores[note] = osc1;
  };

  const onKeyUp = (note) => {
    audioCtxContainer.current.oscialdores[note].stop();
  };

  const handleWaveChange = (e) => {
    setWave(e.target.value);
  };

  const setVolume = (value) => {
    audioCtxContainer.current.volume = value;
  };

  const setPanner = (value) => {
    audioCtxContainer.current.panner = value;
  };

  const setDetune = (value) => {
    audioCtxContainer.current.detune = value;
  };

  useEffect(() => {
    audioCtxContainer.current = new AudioContext();
    audioCtxContainer.current.oscialdores = {};
    audioCtxContainer.current.volume = 1;
    audioCtxContainer.current.detune = 0.0;
    audioCtxContainer.current.panner = 0;
  }, []);

  return {
    onKeyDown: onKeyDown,
    onKeyUp: onKeyUp,
    handleWaveChange: handleWaveChange,
    setVolume: setVolume,
    setPanner: setPanner,
    setDetune: setDetune,
    volume: audioCtxContainer?.current?.volume ?? 0,
  };
}
