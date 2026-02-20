import type { HookInfo } from '../types';

/**
 * List of all available hooks in the playground
 */
export const hooksList: HookInfo[] = [
  {
    id: 'useState',
    name: 'useState',
    description: 'State management fundamentals for functional components',
    category: 'state',
    path: '/hooks/use-state',
    icon: '📦',
  },
  {
    id: 'useEffect',
    name: 'useEffect',
    description: 'Handle side effects and lifecycle events',
    category: 'effect',
    path: '/hooks/use-effect',
    icon: '⚡',
  },
  {
    id: 'useReducer',
    name: 'useReducer',
    description: 'Complex state logic with reducer pattern',
    category: 'state',
    path: '/hooks/use-reducer',
    icon: '🔄',
  },
  {
    id: 'useRef',
    name: 'useRef',
    description: 'Access DOM elements and persist mutable values',
    category: 'ref',
    path: '/hooks/use-ref',
    icon: '🎯',
  },
  {
    id: 'useMemo',
    name: 'useMemo',
    description: 'Memoize expensive computations',
    category: 'memoization',
    path: '/hooks/use-memo',
    icon: '🧠',
  },
  {
    id: 'useCallback',
    name: 'useCallback',
    description: 'Memoize callback functions',
    category: 'memoization',
    path: '/hooks/use-callback',
    icon: '🔗',
  },
  {
    id: 'useContext',
    name: 'useContext',
    description: 'Consume context without prop drilling',
    category: 'context',
    path: '/hooks/use-context',
    icon: '🌐',
  },
];

/**
 * Get hook info by ID
 */
export function getHookById(id: string): HookInfo | undefined {
  return hooksList.find((hook) => hook.id === id);
}

/**
 * Get hooks by category
 */
export function getHooksByCategory(category: HookInfo['category']): HookInfo[] {
  return hooksList.filter((hook) => hook.category === category);
}

/**
 * Category labels for display
 */
export const categoryLabels: Record<HookInfo['category'], string> = {
  state: 'State Management',
  effect: 'Side Effects',
  ref: 'References',
  memoization: 'Memoization',
  context: 'Context',
};
