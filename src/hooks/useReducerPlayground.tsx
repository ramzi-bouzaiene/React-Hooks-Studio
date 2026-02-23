import { useReducer, useState } from 'react';
import { HookCard } from '../components/HookCard';
import { RenderCounter } from '../components/RenderCounter';
import type { CounterState, CounterAction } from '../types';

const codeExample = `import { useReducer } from 'react';

// Define state type
interface State {
  count: number;
  history: number[];
}

// Define action types
type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET'; payload: number };

// Reducer function - pure function!
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
        history: [...state.history, state.count + 1],
      };
    case 'DECREMENT':
      return {
        count: state.count - 1,
        history: [...state.history, state.count - 1],
      };
    case 'RESET':
      return { count: 0, history: [] };
    case 'SET':
      return {
        count: action.payload,
        history: [...state.history, action.payload],
      };
    default:
      return state;
  }
}

// Initial state
const initialState: State = { count: 0, history: [] };

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}`;

const initialState: CounterState = {
  count: 0,
  history: [],
};

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
        history: [...state.history, state.count + 1],
      };
    case 'DECREMENT':
      return {
        count: state.count - 1,
        history: [...state.history, state.count - 1],
      };
    case 'RESET':
      return initialState;
    case 'SET':
      return {
        count: action.payload ?? 0,
        history: [...state.history, action.payload ?? 0],
      };
    default:
      return state;
  }
}

// Todo list reducer example
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  nextId: number;
}

type TodoAction =
  | { type: 'ADD'; payload: string }
  | { type: 'TOGGLE'; payload: number }
  | { type: 'DELETE'; payload: number }
  | { type: 'CLEAR_COMPLETED' };

const todoInitialState: TodoState = {
  todos: [],
  nextId: 1,
};

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD':
      return {
        todos: [
          ...state.todos,
          { id: state.nextId, text: action.payload, completed: false },
        ],
        nextId: state.nextId + 1,
      };
    case 'TOGGLE':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case 'DELETE':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };
    default:
      return state;
  }
}

/**
 * useReducer playground component
 */
export function UseReducerPlayground(): JSX.Element {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  const [todoState, todoDispatch] = useReducer(todoReducer, todoInitialState);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = (): void => {
    if (newTodo.trim()) {
      todoDispatch({ type: 'ADD', payload: newTodo.trim() });
      setNewTodo('');
    }
  };

  const completedCount = todoState.todos.filter((t) => t.completed).length;

  return (
    <HookCard
      title="useReducer"
      description="useReducer is an alternative to useState for managing complex state logic. It's inspired by Redux and follows the reducer pattern."
      whatItDoes="useReducer accepts a reducer function and initial state, returning the current state and a dispatch function. When you dispatch an action, the reducer determines how to update the state based on the action type."
      commonMistakes={[
        'Mutating state inside the reducer instead of returning a new object',
        'Not handling all action types (missing default case)',
        'Putting side effects inside the reducer (reducers must be pure)',
        'Overcomplicating simple state that could use useState',
        'Not typing actions properly in TypeScript',
      ]}
      performanceConsiderations={[
        'useReducer can be more efficient for complex state updates',
        'Dispatch is stable and doesn\'t change between renders',
        'Consider useReducer when state logic involves multiple sub-values',
        'Reducers are easy to test since they\'re pure functions',
        'Can be combined with useContext for state management',
      ]}
      codeExample={codeExample}
    >
      <div className="space-y-6">
        <RenderCounter label="Component renders" showTimestamp />

        {/* Counter with History */}
        <div className="p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-dark-text mb-3">
            🔢 Counter with History
          </h3>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl font-bold text-gray-900 dark:text-dark-text">
              {state.count}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => dispatch({ type: 'DECREMENT' })}
                className="px-4 py-2 bg-gray-200 dark:bg-dark-border text-gray-800 dark:text-dark-text rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => dispatch({ type: 'INCREMENT' })}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => dispatch({ type: 'SET', payload: 10 })}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Set to 10
              </button>
              <button
                type="button"
                onClick={() => dispatch({ type: 'RESET' })}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* History visualization */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-dark-muted mb-2">
              History ({state.history.length} changes):
            </p>
            <div className="flex flex-wrap gap-2">
              {state.history.length > 0 ? (
                state.history.slice(-10).map((value, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 dark:bg-dark-bg rounded text-sm font-mono text-gray-700 dark:text-dark-text"
                  >
                    {value}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500 dark:text-dark-muted">
                  No history yet
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Todo List Example */}
        <div className="p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-dark-text mb-3">
            ✅ Todo List with useReducer
          </h3>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
              placeholder="Add a new todo..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="button"
              onClick={handleAddTodo}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Add
            </button>
          </div>

          <ul className="space-y-2 mb-4">
            {todoState.todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 px-3 py-2 bg-gray-50 dark:bg-dark-bg rounded-lg"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => todoDispatch({ type: 'TOGGLE', payload: todo.id })}
                  className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                />
                <span
                  className={`flex-1 ${
                    todo.completed
                      ? 'line-through text-gray-400 dark:text-dark-muted'
                      : 'text-gray-800 dark:text-dark-text'
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  type="button"
                  onClick={() => todoDispatch({ type: 'DELETE', payload: todo.id })}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          {todoState.todos.length > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-dark-muted">
                {completedCount} of {todoState.todos.length} completed
              </span>
              {completedCount > 0 && (
                <button
                  type="button"
                  onClick={() => todoDispatch({ type: 'CLEAR_COMPLETED' })}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  Clear completed
                </button>
              )}
            </div>
          )}

          {todoState.todos.length === 0 && (
            <p className="text-center text-gray-500 dark:text-dark-muted py-4">
              No todos yet. Add one above!
            </p>
          )}
        </div>

        {/* Dispatch Actions */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
            💡 When to use useReducer
          </h3>
          <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
            <li>• Complex state logic with multiple sub-values</li>
            <li>• Next state depends on previous state</li>
            <li>• State updates need to be testable</li>
            <li>• You want to pass dispatch down to optimize with useCallback</li>
          </ul>
        </div>
      </div>
    </HookCard>
  );
}
