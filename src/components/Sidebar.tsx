import { NavLink } from 'react-router-dom';
import { hooksList, categoryLabels } from '../data/hooksList';
import { useTheme } from '../context/ThemeContext';
import type { HookCategory } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Sidebar navigation component with hook list
 */
export function Sidebar({ isOpen, onClose }: SidebarProps): JSX.Element {
  const { theme, toggleTheme } = useTheme();

  // Group hooks by category
  const groupedHooks = hooksList.reduce(
    (acc, hook) => {
      if (!acc[hook.category]) {
        acc[hook.category] = [];
      }
      acc[hook.category].push(hook);
      return acc;
    },
    {} as Record<HookCategory, typeof hooksList>
  );

  const categories = Object.keys(groupedHooks) as HookCategory[];

  return (
    <aside
      className={`
        fixed top-0 left-0 z-50 h-full w-72
        bg-white/95 dark:bg-dark-card/95 backdrop-blur-xl
        border-r border-slate-200/80 dark:border-dark-border/80
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 shadow-xl lg:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-20 border-b border-slate-200 dark:border-dark-border">
          <NavLink to="/" className="flex items-center gap-3 group" onClick={onClose}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-shadow">
              <span className="text-white text-lg">⚛</span>
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                Hook Studio
              </h1>
              <p className="text-[10px] text-slate-400 dark:text-dark-muted font-medium tracking-wide">React Hooks Playground</p>
            </div>
          </NavLink>

          {/* Desktop theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="hidden lg:flex w-9 h-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-dark-border hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-all"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-dark-border transition-colors"
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5 text-slate-500 dark:text-dark-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3">
          {categories.map((category) => (
            <div key={category} className="mb-6">
              <h2 className="px-3 mb-3 text-[11px] font-bold text-slate-400 dark:text-dark-muted uppercase tracking-widest">
                {categoryLabels[category]}
              </h2>
              <ul className="space-y-1.5">
                {groupedHooks[category].map((hook) => (
                  <li key={hook.id}>
                    <NavLink
                      to={hook.path}
                      onClick={onClose}
                      className={({ isActive }) => `
                        flex items-center gap-3 px-3 py-2.5 rounded-xl
                        transition-all duration-200
                        ${
                          isActive
                            ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25'
                            : 'text-slate-600 dark:text-dark-text hover:bg-slate-100 dark:hover:bg-dark-border'
                        }
                      `}
                    >
                      <span className="text-lg w-8 h-8 flex items-center justify-center rounded-lg bg-white/20">{hook.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{hook.name}</p>
                        <p className="text-[11px] opacity-70 truncate">
                          {hook.description}
                        </p>
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-5 border-t border-slate-200 dark:border-dark-border">
          <a
            href="https://github.com/ramzi-bouzaiene/React-Hooks-Studio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-dark-border text-sm text-slate-600 dark:text-dark-muted hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-violet-900/20 dark:hover:text-violet-400 transition-all group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            <span className="font-medium">View on GitHub</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
