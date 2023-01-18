import { useState } from "react";
import { Distortion as ToneDistortion } from "tone";
import { usePedal } from "./usePedal.client.js";

const initialDistorionLevel = 0.5;
const initEffect = () => new ToneDistortion(initialDistorionLevel);

function Distortion({ index }) {
  const [distortionLevel, setDistortionLevel] = useState(initialDistorionLevel);
  const [isOn, setIsOn] = useState(false);

  const distortion = usePedal(index, initEffect, isOn);

  function changeLevel(value) {
    setDistortionLevel(value);
    distortion.current.distortion = value;
  }

  return (
    <div className="mx-auto flex w-full max-w-md items-center justify-between rounded-2xl bg-white p-12">
      <div className="">Distortion</div>
      <button
        className="bg flex items-center justify-center rounded-full bg-blue-500 py-1.5 px-3.5 font-medium tracking-tight text-white hover:bg-blue-600 active:bg-blue-700"
        onClick={() => setIsOn(!isOn)}
      >
        Turn {isOn ? "Off" : "On"}
      </button>
      <input
        type="range"
        id="distortion"
        name="distortion"
        value={distortionLevel}
        onChange={(event) => changeLevel(event.target.value)}
        min="0"
        max="1"
        step="0.01"
      ></input>
    </div>
  );
}

export default Distortion;
