import { useMemo } from 'react';
import { manifest } from '../utils/canvas.manifest';

export function useScreenInit() {
  return useMemo(() => {
    if (typeof window === 'undefined') return {};
    const screenId = new URLSearchParams(window.location.search).get('mp_screen');
    if (!screenId) return {};
    const screen = manifest?.screens?.[screenId as keyof typeof manifest.screens];
    if (screen && 'state' in screen) {
      return screen.state;
    }
    return {};
  }, []);
}