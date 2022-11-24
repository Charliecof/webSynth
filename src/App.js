import "react-piano/dist/styles.css";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import note from "midi-note";
import useOscilator from "./useOscilator";
import Dial from "./Dial";
import "react-bootstrap";
import Oscilator from "./Oscilator";

function App() {
  const {
    onKeyDown,
    onKeyUp,
    handleWaveChange,
    setVolume,
    setPanner,
    setDetune,
    volume,
  } = useOscilator();
  const firstNote = MidiNumbers.fromNote("C3");
  const lastNote = MidiNumbers.fromNote("C5");
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  return (
    <div style={{ backgroundColor: "#1974E8", height: "100vh", width: "100%" }}>
      <div className="d-flex" style={{ padding: "50px" }}>
        <div className="d-flex">
          <div className="p-2">
            <p>MasterVolume</p>
            <Dial
              setDialValue={(value) => {
                setVolume(value / 128);
              }}
            />
          </div>
          <div className="p-2">
            <p>Detune</p>
            <Dial
              setDialValue={(value) => {
                setDetune(value / 128);
              }}
            />
          </div>
          <div className="p-2">
            <p>Panner</p>
            <Dial
              startCenter
              setDialValue={(value) => {
                if (value === 64) setPanner(0);
                else if (value > 64) setPanner(value - 64 / 64);
                else if (value < 64) setPanner(value - 64 / 64);
              }}
            />
          </div>
        </div>
        <div>
          <p>Wave Form</p>
          <select onChange={handleWaveChange} className="form-select">
            <option value="sine">Sine</option>
            <option value="sawtooth">Saw</option>
            <option value="square">Square</option>
            <option value="triangle">Triangle</option>
          </select>
        </div>
      </div>
      <div
        style={{ width: "100%" }}
        className="d-flex p-3 justify-content-center"
      >
        <div>
          <Piano
            noteRange={{ first: firstNote, last: lastNote }}
            playNote={(midiNumber) => {
              onKeyDown(note(midiNumber));
            }}
            stopNote={(midiNumber) => {
              onKeyUp(note(midiNumber));
            }}
            width={1000}
            keyboardShortcuts={keyboardShortcuts}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
