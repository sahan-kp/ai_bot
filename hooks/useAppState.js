import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

export function useAppState() {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextState => {
      console.log(`[NexaAI] AppState transition: ${appState} -> ${nextState}`);
      setAppState(nextState);
    });
    return () => subscription.remove();
  }, [appState]);

  return appState;
}
