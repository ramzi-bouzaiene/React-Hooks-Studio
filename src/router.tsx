import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { UseStatePlayground } from './hooks/useStatePlayground';
import { UseEffectPlayground } from './hooks/useEffectPlayground';
import { UseReducerPlayground } from './hooks/useReducerPlayground';
import { UseRefPlayground } from './hooks/useRefPlayground';
import { UseMemoPlayground } from './hooks/useMemoPlayground';
import { UseCallbackPlayground } from './hooks/useCallbackPlayground';
import { UseContextPlayground } from './hooks/useContextPlayground';

/**
 * Home page component with welcome message
 */
function HomePage(): JSX.Element {
  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-16 pt-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          Interactive Learning Platform
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-dark-text mb-6 leading-tight">
          Master React Hooks with{' '}
          <span className="text-gradient">Hook Studio</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-dark-muted max-w-2xl mx-auto leading-relaxed">
          Your hands-on playground for understanding React's powerful hooks system.
          Learn, experiment, and debug with live examples.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <div className="group p-8 card-hover">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <span className="text-2xl">🎯</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-dark-text mb-3">
            Interactive Examples
          </h2>
          <p className="text-slate-600 dark:text-dark-muted leading-relaxed">
            Learn by doing with live, editable code examples that demonstrate
            each hook in action with real-time feedback.
          </p>
        </div>

        <div className="group p-8 card-hover">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <span className="text-2xl">📊</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-dark-text mb-3">
            Render Visualization
          </h2>
          <p className="text-slate-600 dark:text-dark-muted leading-relaxed">
            See exactly when and why components re-render with our built-in
            render counter and visual indicators.
          </p>
        </div>

        <div className="group p-8 card-hover">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <span className="text-2xl">💡</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-dark-text mb-3">
            Best Practices
          </h2>
          <p className="text-slate-600 dark:text-dark-muted leading-relaxed">
            Learn common mistakes to avoid and performance considerations for
            writing efficient React code.
          </p>
        </div>

        <div className="group p-8 card-hover">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <span className="text-2xl">⚡</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-dark-text mb-3">
            Monaco Editor
          </h2>
          <p className="text-slate-600 dark:text-dark-muted leading-relaxed">
            Edit code with full TypeScript support in a professional-grade
            editor with syntax highlighting.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden rounded-3xl p-10 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-500">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="relative text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to start learning?</h2>
          <p className="text-white/80 mb-8 text-lg">
            Select a hook from the sidebar to begin your journey
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['useState', 'useEffect', 'useReducer', 'useRef', 'useMemo', 'useCallback', 'useContext'].map((hook) => (
              <span
                key={hook}
                className="px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold text-white border border-white/20 hover:bg-white/30 transition-colors cursor-default"
              >
                {hook}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-center text-slate-500 dark:text-dark-muted text-sm mt-12">
        Built with React 18, TypeScript, and TailwindCSS
      </p>
    </div>
  );
}

/**
 * Application router configuration
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout>{null}</Layout>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'hooks/use-state',
        element: <UseStatePlayground />,
      },
      {
        path: 'hooks/use-effect',
        element: <UseEffectPlayground />,
      },
      {
        path: 'hooks/use-reducer',
        element: <UseReducerPlayground />,
      },
      {
        path: 'hooks/use-ref',
        element: <UseRefPlayground />,
      },
      {
        path: 'hooks/use-memo',
        element: <UseMemoPlayground />,
      },
      {
        path: 'hooks/use-callback',
        element: <UseCallbackPlayground />,
      },
      {
        path: 'hooks/use-context',
        element: <UseContextPlayground />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
