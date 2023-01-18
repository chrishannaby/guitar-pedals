import { useEffect, useState, useRef } from "react";
import { Destination, Player } from "tone";
import Distortion from "./pedals/Distortion.client.jsx";
import PitchShift from "./pedals/PitchShift.client.jsx";
import { EffectsChainProvider } from "./EffectsChain.client.jsx";

const pedalOptions = [
  { name: "Pitch Shift", component: PitchShift },
  { name: "Distortion", component: Distortion },
];

export default function PedalChain() {
  const [isLoaded, setLoaded] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [activeEffects, setActiveEffects] = useState([]);
  const [pedals, setPedals] = useState([
    pedalOptions[1].component,
    pedalOptions[0].component,
    pedalOptions[1].component,
  ]);
  const player = useRef(null);

  useEffect(() => {
    player.current = new Player("/audio/guitars.mp3", {
      onload: () => setLoaded(true),
    });
    player.current.setLoopPoints(0, 3.8);
    player.current.loop = true;
    player.current.chain(Destination);
  }, []);

  function startPlayer() {
    player.current.start();
    setPlaying(true);
  }

  function stopPlayer() {
    player.current.stop();
    setPlaying(false);
  }

  function updateEffectsChain(newActiveEffects) {
    setActiveEffects(newActiveEffects);
    if (!player.current) return;
    player.current.disconnect();
    activeEffects.map((effect) => effect.disconnect());
    if (newActiveEffects && newActiveEffects.length > 0) {
      player.current.chain(...newActiveEffects, Destination);
    } else {
      player.current.chain(Destination);
    }
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-md justify-between rounded-2xl bg-white p-12">
        <button
          disabled={isLoaded}
          onClick={() => (isPlaying ? stopPlayer() : startPlayer())}
          className="bg flex items-center justify-center rounded-full bg-blue-500 py-1.5 px-3.5 font-medium tracking-tight text-white hover:bg-blue-600 active:bg-blue-700"
        >
          {isPlaying ? "Stop" : "Play"}
        </button>
      </div>
      <EffectsChainProvider updateEffectsChain={updateEffectsChain}>
        {pedals.map((component, i) => {
          const Pedal = component;
          return <Pedal key={i} index={i} />;
        })}
      </EffectsChainProvider>
    </>
  );
}
