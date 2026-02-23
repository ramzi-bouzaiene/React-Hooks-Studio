import { useState } from 'react';
import { HookCard } from '../components/HookCard';
import { RenderCounter } from '../components/RenderCounter';

const codeExample = `import { useState } from 'react';

function Counter() {
  // Declare a state variable called "count"
  const [count, setCount] = useState(0);

  // State with object
  const [user, setUser] = useState({
    name: 'John',
    age: 25
  });

  // State with function initializer (lazy initialization)
  const [expensiveValue] = useState(() => {
    // This only runs once on mount
    return computeExpensiveValue();
  });

  // Update state
  const increment = () => setCount(count + 1);

  // Update state using previous value
  const incrementSafe = () => setCount(prev => prev + 1);

  // Update object state (must spread to create new object)
  const updateName = (newName: string) => {
    setUser(prev => ({ ...prev, name: newName }));
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementSafe}>Increment</button>
    </div>
  );
}`;

/**
 * useState playground component
 */
export function UseStatePlayground(): JSX.Element {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [items, setItems] = useState<string[]>(['Apple', 'Banana']);
  const [newItem, setNewItem] = useState('');

  const handleAddItem = (): void => {
    if (newItem.trim()) {
      setItems((prev) => [...prev, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleRemoveItem = (index: number): void => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <HookCard
      title="useState"
      description="The useState hook lets you add state to functional components. It returns a stateful value and a function to update it."
      whatItDoes="useState declares a state variable that persists across re-renders. When you call the setter function, React re-renders the component with the new value. State updates are asynchronous and batched for performance."
      commonMistakes={[
        'Mutating state directly instead of using the setter function',
        'Forgetting that state updates are asynchronous',
        'Not using the functional update form when new state depends on previous state',
        'Creating new object/array references unnecessarily, causing extra renders',
        'Using useState for values that don\'t need to trigger re-renders (use useRef instead)',
      ]}
      performanceConsiderations={[
        'Use lazy initialization for expensive initial values: useState(() => computeExpensive())',
        'Batch multiple setState calls when possible',
        'Split state into multiple useState calls for independent values',
        'Consider useReducer for complex state logic',
        'Memoize objects/arrays passed as initial state to avoid recreating on each render',
      ]}
      codeExample={codeExample}
    >
      <div className="space-y-6">
        <RenderCounter label="Component renders" showTimestamp />

        {/* Counter Example */}
        <div className="p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-dark-text mb-3">
            Counter Example
          </h3>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-gray-900 dark:text-dark-text">
              {count}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCount((prev) => prev - 1)}
                className="px-4 py-2 bg-gray-200 dark:bg-dark-border text-gray-800 dark:text-dark-text rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => setCount((prev) => prev + 1)}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => setCount(0)}
                className="px-4 py-2 bg-gray-200 dark:bg-dark-border text-gray-800 dark:text-dark-text rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Text Input Example */}
        <div className="p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-dark-text mb-3">
            Text Input Example
          </h3>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type something..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <p className="mt-2 text-sm text-gray-600 dark:text-dark-muted">
            Character count: <strong>{text.length}</strong>
          </p>
        </div>

        {/* Array State Example */}
        <div className="p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-dark-text mb-3">
            Array State Example
          </h3>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
              placeholder="Add item..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="button"
              onClick={handleAddItem}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Add
            </button>
          </div>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-dark-bg rounded-lg"
              >
                <span className="text-gray-800 dark:text-dark-text">{item}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </HookCard>
  );
}
