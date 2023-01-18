import { useState, useCallback } from "react";
import { PitchShift as TonePitchShift } from "tone";
import { usePedal } from "./usePedal.client.js";

const initialPitch = 0;
const initEffect = () => new TonePitchShift(initialPitch);

function PitchShift({ index }) {
  const [pitch, setPitch] = useState(initialPitch);
  const [isOn, setIsOn] = useState(false);

  const pitchShift = usePedal(index, initEffect, isOn);

  function changePitch(value) {
    setPitch(value);
    pitchShift.current.pitch = value;
  }

  return (
    <div className="mx-auto flex w-full max-w-md items-center justify-between rounded-2xl bg-white p-12">
      <div className="">Pitch Shift</div>
      <button
        className="bg flex items-center justify-center rounded-full bg-blue-500 py-1.5 px-3.5 font-medium tracking-tight text-white hover:bg-blue-600 active:bg-blue-700"
        onClick={() => setIsOn(!isOn)}
      >
        Turn {isOn ? "Off" : "On"}
      </button>
      <input
        type="range"
        id="pitch"
        name="pitch"
        value={pitch}
        onChange={(event) => changePitch(event.target.value)}
        min="-12"
        max="12"
        step="1"
      ></input>
    </div>
  );
}

export default PitchShift;
