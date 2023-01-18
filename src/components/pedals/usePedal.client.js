import { useEffectsChain } from "../EffectsChain.client";
import { useCallback, useEffect, useRef } from "react";

export function usePedal(index, initEffect, isOn) {
  const ref = useRef(null);
  const { addToEffectsChain, removeFromEffectsChain, toggleEffect } =
    useEffectsChain();

  useEffect(() => {
    ref.current = initEffect();
    addToEffectsChain(index, ref.current);
    return () => {
      removeFromEffectsChain(index);
      ref.current.dispose();
    };
  }, [index, initEffect]);

  useEffect(() => {
    toggleEffect(index, isOn);
  }, [isOn]);

  return ref;
}
