import { useId } from 'react';
import type { RenderCounterProps } from '../types';

// Module-level storage for render counts (keyed by component instance ID)
const renderCounts = new Map<string, number>();

/**
 * Component that displays render count - useful for debugging and learning
 * Uses module-level storage to track render count safely
 */
export function RenderCounter({
  label = 'Render count',
  showTimestamp = false,
}: RenderCounterProps): JSX.Element {
  const id = useId();
  const currentCount = (renderCounts.get(id) ?? 0) + 1;
  renderCounts.set(id, currentCount);
  const timestamp = new Date().toLocaleTimeString();

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-800 dark:text-amber-300 rounded-xl text-sm font-medium shadow-sm">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
      </span>
      <span>
        {label}: <strong className="text-amber-900 dark:text-amber-200">{currentCount}</strong>
      </span>
      {showTimestamp && (
        <span className="text-amber-600 dark:text-amber-400 text-xs">
          @ {timestamp}
        </span>
      )}
    </div>
  );
}

/**
 * Minimal render counter for inline use
 */
export function InlineRenderCounter(): JSX.Element {
  const id = useId();
  const currentCount = (renderCounts.get(id) ?? 0) + 1;
  renderCounts.set(id, currentCount);

  return (
    <span className="inline-flex items-center justify-center min-w-[2rem] h-7 px-2.5 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-800 dark:text-amber-300 rounded-lg text-xs font-bold shadow-sm">
      {currentCount}
    </span>
  );
}
