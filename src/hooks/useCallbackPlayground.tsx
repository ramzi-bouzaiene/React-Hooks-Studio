import { useState, useCallback, memo } from 'react';
import { HookCard } from '../components/HookCard';
import { RenderCounter, InlineRenderCounter } from '../components/RenderCounter';

const codeExample = `import { useCallback, useState, memo } from 'react';

// Memoized child component
const Button = memo(function Button({
  onClick,
  children
}: {
  onClick: () => void;
  children: string;
}) {
  console.log('Button rendered:', children);
  return <button onClick={onClick}>{children}</button>;
});

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Without useCallback - new function every render
  const handleClickBad = () => {
    setCount(c => c + 1);
  };

  // With useCallback - same function reference
  const handleClickGood = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Empty deps = never changes

  // useCallback with dependencies
  const handleGreet = useCallback(() => {
    alert(\`Hello, \${name}!\`);
  }, [name]); // Changes when name changes

  return (
    <div>
      <Button onClick={handleClickGood}>
        Increment ({count})
      </Button>
      <input value={name} onChange={e => setName(e.target.value)} />
      <Button onClick={handleGreet}>Greet</Button>
    </div>
  );
}`;

interface ButtonProps {
  onClick: () => void;
  children: string;
  variant?: 'primary' | 'secondary';
}

/**
 * Memoized button component that only re-renders when props change
 */
const MemoizedButton = memo(function MemoizedButton({
  onClick,
  children,
  variant = 'primary',
}: ButtonProps): JSX.Element {
  const baseClasses = 'px-4 py-2 rounded-lg transition-colors font-medium';
  const variantClasses =
    variant === 'primary'
      ? 'bg-primary-500 text-white hover:bg-primary-600'
      : 'bg-gray-200 dark:bg-dark-border text-gray-800 dark:text-dark-text hover:bg-gray-300 dark:hover:bg-gray-600';

  return (
    <button type="button" onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
      <span className="flex items-center gap-2">
        {children}
        <InlineRenderCounter />
      </span>
    </button>
  );
});

/**
 * List item component for demonstrating callback stability
 */
const ListItem = memo(function ListItem({
  id,
  text,
  onDelete,
}: {
  id: number;
  text: string;
  onDelete: (id: number) => void;
}): JSX.Element {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-bg rounded-lg">
      <span className="text-gray-800 dark:text-dark-text">{text}</span>
      <div className="flex items-center gap-2">
        <InlineRenderCounter />
        <button
          type="button"
          onClick={() => onDelete(id)}
          className="text-red-500 hover:text-red-700 transition-colors text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
});

/**
 * useCallback playground component
 */
export function UseCallbackPlayground(): JSX.Element {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [items, setItems] = useState([
    { id: 1, text: 'Learn useCallback' },
    { id: 2, text: 'Understand memoization' },
    { id: 3, text: 'Build great apps' },
  ]);
  const [nextId, setNextId] = useState(4);

  // Non-memoized callback - creates new function every render
  const handleIncrementBad = (): void => {
    setCount((c) => c + 1);
  };

  // Memoized callback - same reference across renders
  const handleIncrementGood = useCallback((): void => {
    setCount((c) => c + 1);
  }, []);

  // Memoized callback with dependency
  const handleGreet = useCallback((): void => {
    if (name) {
      alert(`Hello, ${name}!`);
    } else {
      alert('Please enter a name first!');
    }
  }, [name]);

  // Memoized delete handler for list items
  const handleDelete = useCallback((id: number): void => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Memoized add handler
  const handleAdd = useCallback((): void => {
    setItems((prev) => [...prev, { id: nextId, text: `New item ${nextId}` }]);
    setNextId((n) => n + 1);
  }, [nextId]);

  return (
    <HookCard
      title="useCallback"
      description="useCallback memoizes callback functions so they maintain the same reference between renders, useful when passing callbacks to optimized child components."
      whatItDoes="useCallback returns a memoized version of the callback that only changes if one of the dependencies has changed. This is useful when passing callbacks to child components wrapped in React.memo or when a callback is used as a dependency in other hooks."
      commonMistakes={[
        'Using useCallback without React.memo on child components (no benefit)',
        'Adding too many dependencies that change frequently',
        'Wrapping every function in useCallback (adds overhead)',
        'Forgetting that inline functions in JSX are recreated each render',
        'Not understanding the difference between useCallback and useMemo',
      ]}
      performanceConsiderations={[
        'Only useful with memoized children (React.memo)',
        'The callback caching itself has overhead',
        'Consider if the child component is expensive to render',
        'Stable callbacks prevent unnecessary re-renders in optimized children',
        'useCallback(fn, deps) is equivalent to useMemo(() => fn, deps)',
      ]}
      codeExample={codeExample}
    >
      <div className="space-y-6">
        <RenderCounter label="Parent renders" showTimestamp />

        {/* Comparison Example */}
        <div className="p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-dark-text mb-3">
            🔄 Callback Comparison
          </h3>
          <p className="text-sm text-gray-600 dark:text-dark-muted mb-4">
            Both buttons increment the same count, but watch their render counts:
          </p>

          <div className="flex flex-wrap gap-3 mb-4">
            <div className="space-y-2">
              <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                ❌ Without useCallback:
              </p>
              <MemoizedButton onClick={handleIncrementBad} variant="secondary">
                Increment (Bad)
              </MemoizedButton>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                ✅ With useCallback:
              </p>
              <MemoizedButton onClick={handleIncrementGood}>
                Increment (Good)
              </MemoizedButton>
            </div>
          </div>

          <div className="p-3 bg-gray-100 dark:bg-dark-bg rounded-lg">
            <p className="text-2xl font-bold text-gray-900 dark:text-dark-text text-center">
              Count: {count}
            </p>
          </div>

          <p className="mt-3 text-sm text-blue-600 dark:text-blue-400">
            💡 The button with useCallback renders less because its onClick prop reference stays stable!
          </p>
        </div>

        {/* Callback with Dependencies */}
        <div className="p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-dark-text mb-3">
            📝 Callback with Dependencies
          </h3>
          <div className="space-y-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <MemoizedButton onClick={handleGreet}>
              Greet
            </MemoizedButton>
            <p className="text-sm text-gray-600 dark:text-dark-muted">
              The greet button&apos;s callback depends on <code className="px-1 bg-gray-100 dark:bg-dark-border rounded">name</code>.
              Watch how it re-renders when you type (dependency changed).
            </p>
          </div>
        </div>

        {/* List with Callbacks */}
        <div className="p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-dark-text mb-3">
            📋 List with Memoized Delete Callback
          </h3>
          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <ListItem
                key={item.id}
                id={item.id}
                text={item.text}
                onDelete={handleDelete}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Add Item
          </button>
          <p className="mt-3 text-sm text-gray-600 dark:text-dark-muted">
            Notice how existing items don&apos;t re-render when you add new ones.
            The delete callback reference is stable thanks to useCallback!
          </p>
        </div>

        {/* Explanation */}
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <h3 className="text-sm font-semibold text-purple-800 dark:text-purple-300 mb-2">
            🤔 useCallback vs useMemo
          </h3>
          <div className="text-sm text-purple-700 dark:text-purple-400 space-y-2">
            <p>
              <strong>useCallback(fn, deps)</strong> returns a memoized callback function
            </p>
            <p>
              <strong>useMemo(() =&gt; fn, deps)</strong> returns a memoized value (can be a function)
            </p>
            <p className="pt-2 border-t border-purple-200 dark:border-purple-700">
              They&apos;re equivalent: <code className="px-1 bg-purple-100 dark:bg-purple-800 rounded">useCallback(fn, deps)</code>{' '}
              is shorthand for <code className="px-1 bg-purple-100 dark:bg-purple-800 rounded">useMemo(() =&gt; fn, deps)</code>
            </p>
          </div>
        </div>
      </div>
    </HookCard>
  );
}
