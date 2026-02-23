import { useState, useMemo } from 'react';
import { HookCard } from '../components/HookCard';
import { RenderCounter, InlineRenderCounter } from '../components/RenderCounter';

const codeExample = `import { useMemo, useState } from 'react';

function ExpensiveComponent({ items, filter }: Props) {
  // Memoize expensive computation
  const filteredItems = useMemo(() => {
    console.log('Computing filtered items...');
    return items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]); // Only recompute when items or filter changes

  // Memoize object to maintain referential equality
  const config = useMemo(() => ({
    theme: 'dark',
    language: 'en',
  }), []); // Never changes

  // Memoize derived values
  const statistics = useMemo(() => ({
    total: filteredItems.length,
    average: filteredItems.reduce((a, b) => a + b.value, 0) / filteredItems.length,
  }), [filteredItems]);

  return (
    <div>
      <p>Found {filteredItems.length} items</p>
      {filteredItems.map(item => <Item key={item.id} item={item} />)}
    </div>
  );
}`;

/**
 * Simulates an expensive computation
 */
function expensiveCalculation(num: number): number {
  let result = 0;
  for (let i = 0; i < num * 1000000; i++) {
    result += Math.sqrt(i);
  }
  return result;
}

/**
 * Simulates filtering a large list
 */
function filterItems(items: string[], filter: string): string[] {
  return items.filter((item) =>
    item.toLowerCase().includes(filter.toLowerCase())
  );
}

const sampleItems = [
  'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry',
  'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon',
  'Mango', 'Nectarine', 'Orange', 'Papaya', 'Quince',
  'Raspberry', 'Strawberry', 'Tangerine', 'Ugli fruit', 'Watermelon',
];

/**
 * Child component that receives memoized value
 */
function ChildWithMemo({ data }: { data: { value: number } }): JSX.Element {
  return (
    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
      <div className="flex items-center justify-between">
        <span className="text-green-800 dark:text-green-300">Child with memoized data</span>
        <InlineRenderCounter />
      </div>
      <p className="text-sm text-green-600 dark:text-green-400">
        Value: {data.value}
      </p>
    </div>
  );
}

/**
 * Child component that receives non-memoized value
 */
function ChildWithoutMemo({ data }: { data: { value: number } }): JSX.Element {
  return (
    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
      <div className="flex items-center justify-between">
        <span className="text-red-800 dark:text-red-300">Child with new object each render</span>
        <InlineRenderCounter />
      </div>
      <p className="text-sm text-red-600 dark:text-red-400">
        Value: {data.value}
      </p>
    </div>
  );
}

/**
 * useMemo playground component
 */
export function UseMemoPlayground(): JSX.Element {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [filter, setFilter] = useState('');
  const [showExpensive, setShowExpensive] = useState(false);

  // Memoized expensive calculation - only recalculates when multiplier changes
  const expensiveResult = useMemo(() => {
    if (!showExpensive) return 0;
    return expensiveCalculation(multiplier);
  }, [multiplier, showExpensive]);

  // Memoized filtered list - only refilters when items or filter changes
  const filteredItems = useMemo(() => {
    return filterItems(sampleItems, filter);
  }, [filter]);

  // Memoized object - maintains referential equality
  const memoizedData = useMemo(() => ({ value: count }), [count]);

  // Non-memoized object - new reference every render
  const nonMemoizedData = { value: count };

  return (
    <HookCard
      title="useMemo"
      description="useMemo memoizes expensive computations so they only recalculate when dependencies change, optimizing performance."
      whatItDoes="useMemo caches the result of a calculation between re-renders. It only recalculates when one of its dependencies changes. This is useful for expensive computations and maintaining referential equality for objects/arrays passed to child components."
      commonMistakes={[
        'Using useMemo for simple calculations (adds overhead)',
        'Forgetting dependencies in the dependency array',
        'Assuming useMemo prevents renders (it doesn\'t, use React.memo)',
        'Memoizing everything "just in case" (premature optimization)',
        'Not understanding that useMemo runs during render',
      ]}
      performanceConsiderations={[
        'Only use for truly expensive computations',
        'Useful for maintaining referential equality',
        'The memoization itself has a cost - benchmark first',
        'Dependencies should be primitives or stable references',
        'Consider if the computation is actually expensive',
      ]}
      codeExample={codeExample}
    >
      <div className="space-y-6">
        <RenderCounter label="Component renders" showTimestamp />

        {/* Filtered List Example */}
        <div className="p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-dark-text mb-3">
            🔍 Memoized Filtering
          </h3>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter fruits..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3"
          />
          <div className="flex flex-wrap gap-2">
            {filteredItems.map((item) => (
              <span
                key={item}
                className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full text-sm"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-gray-600 dark:text-dark-muted">
            Found <strong>{filteredItems.length}</strong> items. Filtering is memoized and only runs when the filter changes.
          </p>
          <button
            type="button"
            onClick={() => setCount((c) => c + 1)}
            className="mt-2 px-4 py-2 bg-gray-200 dark:bg-dark-border text-gray-800 dark:text-dark-text rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Unrelated state update (Count: {count})
          </button>
        </div>

        {/* Expensive Calculation Example */}
        <div className="p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-dark-text mb-3">
            🔢 Expensive Calculation
          </h3>
          <div className="flex items-center gap-4 mb-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showExpensive}
                onChange={(e) => setShowExpensive(e.target.checked)}
                className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-gray-700 dark:text-dark-text">
                Enable expensive calculation
              </span>
            </label>
          </div>

          {showExpensive && (
            <>
              <div className="flex items-center gap-4 mb-3">
                <label className="text-sm text-gray-600 dark:text-dark-muted">
                  Multiplier: {multiplier}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={multiplier}
                  onChange={(e) => setMultiplier(Number(e.target.value))}
                  className="flex-1"
                />
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  Result of expensive calculation: <strong>{expensiveResult.toFixed(2)}</strong>
                </p>
                <p className="text-xs text-purple-500 dark:text-purple-500 mt-1">
                  This only recalculates when multiplier changes!
                </p>
              </div>
            </>
          )}
        </div>

        {/* Referential Equality Example */}
        <div className="p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-dark-text mb-3">
            🔗 Referential Equality Comparison
          </h3>
          <p className="text-sm text-gray-600 dark:text-dark-muted mb-4">
            Watch how child render counts differ when using memoized vs non-memoized objects:
          </p>

          <div className="grid gap-3 mb-4">
            <ChildWithMemo data={memoizedData} />
            <ChildWithoutMemo data={nonMemoizedData} />
          </div>

          <button
            type="button"
            onClick={() => setCount((c) => c + 1)}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Update Count ({count})
          </button>

          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              💡 Both children receive the same value, but the non-memoized version gets a{' '}
              <strong>new object reference</strong> on every render. Combine useMemo with{' '}
              <code className="px-1 bg-blue-100 dark:bg-blue-800 rounded">React.memo()</code>{' '}
              for the child to see the benefit!
            </p>
          </div>
        </div>

        {/* When to Use */}
        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-2">
            ⚠️ When to use useMemo
          </h3>
          <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1">
            <li>✅ Expensive calculations that are slow to compute</li>
            <li>✅ Objects/arrays passed to memoized children</li>
            <li>✅ Values used as dependencies of other hooks</li>
            <li>❌ Simple calculations (more overhead than benefit)</li>
            <li>❌ Everything "just in case" (premature optimization)</li>
          </ul>
        </div>
      </div>
    </HookCard>
  );
}
