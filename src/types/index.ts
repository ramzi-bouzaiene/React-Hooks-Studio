/**
 * Hook information type for sidebar and navigation
 */
export interface HookInfo {
  id: string;
  name: string;
  description: string;
  category: HookCategory;
  path: string;
  icon: string;
}

/**
 * Categories for organizing hooks
 */
export type HookCategory = 'state' | 'effect' | 'ref' | 'memoization' | 'context';

/**
 * Theme type for the application
 */
export type Theme = 'light' | 'dark';

/**
 * Theme context value type
 */
export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

/**
 * Code example type for hook playgrounds
 */
export interface CodeExample {
  title: string;
  code: string;
  description: string;
}

/**
 * Dependency item for useEffect visualizer
 */
export interface DependencyItem {
  name: string;
  value: string;
  hasChanged: boolean;
}

/**
 * Reducer action for useReducer examples
 */
export interface CounterAction {
  type: 'INCREMENT' | 'DECREMENT' | 'RESET' | 'SET';
  payload?: number;
}

/**
 * Counter state for useReducer examples
 */
export interface CounterState {
  count: number;
  history: number[];
}

/**
 * Props for RenderCounter component
 */
export interface RenderCounterProps {
  label?: string;
  showTimestamp?: boolean;
}

/**
 * Props for CodeEditor component
 */
export interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: string;
  readOnly?: boolean;
  height?: string;
}

/**
 * Props for Preview component
 */
export interface PreviewProps {
  children: React.ReactNode;
  title?: string;
}

/**
 * Props for HookCard component
 */
export interface HookCardProps {
  title: string;
  description: string;
  whatItDoes: string;
  commonMistakes: string[];
  performanceConsiderations: string[];
  children: React.ReactNode;
  codeExample: string;
}

/**
 * Props for Layout component
 */
export interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Strict mode context value
 */
export interface StrictModeContextValue {
  isStrictMode: boolean;
  toggleStrictMode: () => void;
}
