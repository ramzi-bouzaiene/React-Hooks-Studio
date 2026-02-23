import { useState, useRef, useEffect } from 'react';
import { HookCard } from '../components/HookCard';
import { RenderCounter } from '../components/RenderCounter';

const codeExample = `import { useRef, useEffect } from 'react';

function TextInputWithFocus() {
  // Create a ref to store DOM element
  const inputRef = useRef<HTMLInputElement>(null);

  // Create a ref to store mutable value (doesn't cause re-render)
  const renderCount = useRef(0);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Increment without re-render
  renderCount.current += 1;

  return (
    <div>
      <input ref={inputRef} type="text" />
      <p>Render count: {renderCount.current}</p>
    </div>
  );
}

// useRef for previous value
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}`;

/**
 * useRef playground component
 */
export function UseRefPlayground(): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [count, setCount] = useState(0);
  const [previousValue, setPreviousValue] = useState<number | undefined>(undefined);
  const [displayedRefValue, setDisplayedRefValue] = useState(0);

  // DOM reference
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  // Mutable value that persists across renders
  const clickCount = useRef(0);

  // Store previous value pattern
  useEffect(() => {
    setPreviousValue(count);
  }, [count]);

  const focusInput = (): void => {
    inputRef.current?.focus();
  };

  const selectText = (): void => {
    inputRef.current?.select();
  };

  const handleRefClick = (): void => {
    clickCount.current += 1;
    // Note: This won't cause a re-render!
  };

  const showRefValue = (): void => {
    // This will cause a re-render to show the current ref value
    setDisplayedRefValue(clickCount.current);
  };

  const scrollToDiv = (): void => {
    divRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const measureDiv = (): void => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    }
  };

  useEffect(() => {
    measureDiv();
  }, []);

  return (
    <HookCard
      title="useRef"
      description="useRef returns a mutable ref object that persists for the full lifetime of the component. It can hold DOM references or any mutable value."
      whatItDoes="useRef creates a container that holds a .current property. Unlike state, changing ref.current doesn't trigger a re-render. It's commonly used for accessing DOM elements, storing previous values, and keeping mutable values that don't affect rendering."
      commonMistakes={[
        'Expecting ref changes to trigger re-renders (they don\'t!)',
        'Using ref when state is needed (if UI should update, use state)',
        'Accessing ref.current during render (it might not be set yet)',
        'Forgetting that ref.current can be null for DOM refs',
        'Not cleaning up refs that hold subscriptions or timers',
      ]}
      performanceConsiderations={[
        'useRef is a way to opt-out of React\'s render cycle',
        'Use refs for values that don\'t affect visual output',
        'Perfect for storing instance variables like timers',
        'DOM refs are set after the render, available in useEffect',
        'Refs are synchronous unlike state updates',
      ]}
      codeExample={codeExample}
    >
      <div className="space-y-6">
        <RenderCounter label="Component renders" showTimestamp />

        {/* DOM Reference Example */}
        <div className="p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-dark-text mb-3">
            🎯 DOM Reference
          </h3>
          <div className="space-y-3">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Click buttons to interact with this input..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={focusInput}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Focus Input
              </button>
              <button
                type="button"
                onClick={selectText}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Select All Text
              </button>
            </div>
          </div>
        </div>

        {/* Mutable Value Example */}
        <div className="p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-dark-text mb-3">
            📦 Mutable Value (No Re-render)
          </h3>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-dark-muted">
              Click &quot;Increment Ref&quot; - the ref value changes but the component{' '}
              <strong>doesn&apos;t re-render</strong>! Click &quot;Show Value&quot; to see the actual ref value.
            </p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleRefClick}
                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
              >
                Increment Ref
              </button>
              <button
                type="button"
                onClick={showRefValue}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Show Value
              </button>
              <span className="text-gray-700 dark:text-dark-text">
                Displayed: <strong className="font-mono">{displayedRefValue}</strong>
              </span>
            </div>
            <p className="text-sm text-amber-600 dark:text-amber-400">
              💡 The displayed value only updates when you click &quot;Show Value&quot; which triggers a re-render!
            </p>
            <button
              type="button"
              onClick={() => setCount((c) => c + 1)}
              className="px-4 py-2 bg-gray-200 dark:bg-dark-border text-gray-800 dark:text-dark-text rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Force Re-render (Count: {count})
            </button>
          </div>
        </div>

        {/* Previous Value Example */}
        <div className="p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-dark-text mb-3">
            ⏮️ Previous Value Pattern
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setCount((c) => c + 1)}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Increment
              </button>
              <button
                type="button"
                onClick={() => setCount((c) => c - 1)}
                className="px-4 py-2 bg-gray-200 dark:bg-dark-border text-gray-800 dark:text-dark-text rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Decrement
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 dark:bg-dark-bg rounded-lg">
                <p className="text-xs text-gray-500 dark:text-dark-muted">Current</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-text">
                  {count}
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-dark-bg rounded-lg">
                <p className="text-xs text-gray-500 dark:text-dark-muted">Previous</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-text">
                  {previousValue ?? '-'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* DOM Measurement Example */}
        <div className="p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-dark-text mb-3">
            📏 DOM Measurement
          </h3>
          <div
            ref={divRef}
            className="p-6 bg-gradient-to-r from-primary-400 to-purple-500 rounded-lg text-white text-center mb-3"
          >
            <p className="font-medium">Measure this element!</p>
            <p className="text-sm opacity-80">Resize the window and re-measure</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={measureDiv}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Measure Element
            </button>
            <button
              type="button"
              onClick={scrollToDiv}
              className="px-4 py-2 bg-gray-200 dark:bg-dark-border text-gray-800 dark:text-dark-text rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Scroll to Element
            </button>
          </div>
          <p className="mt-3 text-sm text-gray-600 dark:text-dark-muted">
            Dimensions: <strong>{Math.round(dimensions.width)}px</strong> ×{' '}
            <strong>{Math.round(dimensions.height)}px</strong>
          </p>
        </div>
      </div>
    </HookCard>
  );
}
