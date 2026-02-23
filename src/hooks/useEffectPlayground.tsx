import { useState, useEffect } from 'react';
import { HookCard } from '../components/HookCard';
import { RenderCounter } from '../components/RenderCounter';
import type { DependencyItem } from '../types';

const codeExample = `import { useEffect, useState } from 'react';

function DataFetcher({ userId }: { userId: string }) {
  const [data, setData] = useState(null);

  // Effect with dependency array
  useEffect(() => {
    // Side effect: fetch data
    fetchUser(userId).then(setData);

    // Cleanup function (optional)
    return () => {
      // Cancel pending requests, unsubscribe, etc.
      cancelRequest();
    };
  }, [userId]); // Only re-run when userId changes

  // Effect that runs once on mount
  useEffect(() => {
    document.title = 'User Profile';

    return () => {
      document.title = 'App'; // Cleanup on unmount
    };
  }, []); // Empty array = run once

  // Effect that runs on every render (rarely needed)
  useEffect(() => {
    // Runs after every render
  }); // No dependency array

  return <div>{data ? data.name : 'Loading...'}</div>;
}`;

/**
 * useEffect playground component with dependency visualizer
 */
export function UseEffectPlayground(): JSX.Element {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('React');
  const [effectLog, setEffectLog] = useState<string[]>([]);
  const [dependencies, setDependencies] = useState<DependencyItem[]>([]);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Effect with count dependency
  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString();
    setEffectLog((prev) => [
      ...prev.slice(-4),
      `[${timestamp}] Effect ran! Count is now: ${count}`,
    ]);

    setDependencies([
      {
        name: 'count',
        value: String(count),
        hasChanged: true,
      },
    ]);

    // Cleanup
    return () => {
      setDependencies((prev) =>
        prev.map((d) => (d.name === 'count' ? { ...d, hasChanged: false } : d))
      );
    };
  }, [count]);

  // Effect with name dependency
  useEffect(() => {
    document.title = `React Hooks Studio - ${name}`;

    return () => {
      document.title = 'React Hooks Studio';
    };
  }, [name]);

  // Timer effect with cleanup
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    // Cleanup function
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const clearLog = (): void => {
    setEffectLog([]);
  };

  const resetTimer = (): void => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <HookCard
      title="useEffect"
      description="useEffect lets you synchronize a component with external systems and perform side effects after rendering."
      whatItDoes="useEffect runs after the component renders. It's used for data fetching, subscriptions, DOM manipulation, and other side effects. The cleanup function runs before the next effect and on unmount."
      commonMistakes={[
        'Missing dependencies in the dependency array (use ESLint plugin!)',
        'Infinite loops from setting state without proper dependencies',
        'Forgetting cleanup for subscriptions, timers, or event listeners',
        'Using async directly in useEffect (wrap in inner function instead)',
        'Fetching data without handling race conditions or component unmount',
      ]}
      performanceConsiderations={[
        'Keep dependency arrays minimal and accurate',
        'Split unrelated effects into multiple useEffect calls',
        'Use cleanup functions to prevent memory leaks',
        'Consider useLayoutEffect for DOM measurements before paint',
        'Debounce or throttle effects that run frequently',
      ]}
      codeExample={codeExample}
    >
      <div className="space-y-6">
        <RenderCounter label="Component renders" showTimestamp />

        {/* Dependency Visualizer */}
        <div className="p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-dark-text mb-3">
            📊 Dependency Array Visualizer
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {dependencies.length > 0 ? (
              dependencies.map((dep) => (
                <div
                  key={dep.name}
                  className={`
                    px-3 py-2 rounded-lg border-2 transition-all
                    ${
                      dep.hasChanged
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-bg'
                    }
                  `}
                >
                  <span className="text-xs text-gray-500 dark:text-dark-muted">
                    {dep.name}
                  </span>
                  <p className="font-mono text-sm text-gray-900 dark:text-dark-text">
                    {dep.value}
                  </p>
                  {dep.hasChanged && (
                    <span className="text-xs text-green-600 dark:text-green-400">
                      Changed!
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-dark-muted">
                Update count to see dependency changes
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setCount((prev) => prev + 1)}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Increment Count ({count})
            </button>
          </div>
        </div>

        {/* Effect Log */}
        <div className="p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-dark-text">
              📜 Effect Execution Log
            </h3>
            <button
              type="button"
              onClick={clearLog}
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-dark-muted dark:hover:text-dark-text"
            >
              Clear
            </button>
          </div>
          <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm h-32 overflow-y-auto">
            {effectLog.length > 0 ? (
              effectLog.map((log, index) => (
                <div key={index} className="text-green-400">
                  {log}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No effects logged yet...</p>
            )}
          </div>
        </div>

        {/* Document Title Example */}
        <div className="p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-dark-text mb-3">
            📄 Document Title Effect
          </h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Change page title..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <p className="mt-2 text-sm text-gray-600 dark:text-dark-muted">
            Check the browser tab title!
          </p>
        </div>

        {/* Timer with Cleanup */}
        <div className="p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-dark-text mb-3">
            ⏱️ Timer with Cleanup
          </h3>
          <div className="flex items-center gap-4">
            <span className="text-4xl font-mono font-bold text-gray-900 dark:text-dark-text">
              {String(Math.floor(seconds / 60)).padStart(2, '0')}:
              {String(seconds % 60).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsRunning((prev) => !prev)}
                className={`
                  px-4 py-2 rounded-lg transition-colors
                  ${
                    isRunning
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }
                `}
              >
                {isRunning ? 'Stop' : 'Start'}
              </button>
              <button
                type="button"
                onClick={resetTimer}
                className="px-4 py-2 bg-gray-200 dark:bg-dark-border text-gray-800 dark:text-dark-text rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-dark-muted">
            The cleanup function clears the interval when the component unmounts
            or when isRunning changes.
          </p>
        </div>
      </div>
    </HookCard>
  );
}
