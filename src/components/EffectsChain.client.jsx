import { useContext, useEffect, createContext, useReducer } from "react";

const EffectsChainContext = createContext();

function effectsChainReducer(state, action) {
  switch (action.type) {
    case "INSERT_EFFECT": {
      const newState = [...state];
      newState[action.index] = {
        ref: action.ref,
        isOn: false,
      };
      return newState;
    }
    case "REMOVE_EFFECT": {
      return state.slice(action.index, 1);
    }
    case "TOGGLE_EFFECT": {
      const newState = [...state];
      newState[action.index] = {
        ...state[action.index],
        isOn: action.isOn,
      };
      return newState;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function EffectsChainProvider({ updateEffectsChain, children, ...otherProps }) {
  const [state, dispatch] = useReducer(effectsChainReducer, []);
  useEffect(() => {
    const activeChain = state
      .filter((effect) => effect.isOn)
      .map((effect) => effect.ref);
    updateEffectsChain(activeChain);
  }, [state]);

  return (
    <EffectsChainContext.Provider
      value={[state, dispatch]}
      children={children}
      {...otherProps}
    />
  );
}

function useEffectsChain() {
  const context = useContext(EffectsChainContext);
  if (!context) {
    throw new Error(
      "useEffectsChain must be used inside an EffectsChainProvider"
    );
  }
  const [state, dispatch] = context;

  function addToEffectsChain(index, ref) {
    dispatch({
      type: "INSERT_EFFECT",
      index,
      ref,
    });
  }

  function removeFromEffectsChain(index) {
    dispatch({
      type: "REMOVE_EFFECT",
      index,
    });
  }

  function toggleEffect(index, isOn) {
    dispatch({
      type: "TOGGLE_EFFECT",
      index,
      isOn,
    });
  }

  return {
    addToEffectsChain,
    removeFromEffectsChain,
    toggleEffect,
    effectsChain: state,
  };
}

export { EffectsChainProvider, useEffectsChain };
