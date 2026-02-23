import { createContext, useContext, useState, type ReactNode } from 'react';
import { HookCard } from '../components/HookCard';
import { RenderCounter, InlineRenderCounter } from '../components/RenderCounter';

const codeExample = `import { createContext, useContext, useState } from 'react';

// 1. Create context with default value
interface User {
  name: string;
  email: string;
}

const UserContext = createContext<User | null>(null);

// 2. Create provider component
function UserProvider({ children }: { children: ReactNode }) {
  const [user] = useState({ name: 'John', email: 'john@example.com' });

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Create custom hook for consuming context
function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

// 4. Use in components
function Profile() {
  const user = useUser();
  return <p>Hello, {user.name}!</p>;
}

// 5. Wrap app with provider
function App() {
  return (
    <UserProvider>
      <Profile />
    </UserProvider>
  );
}`;

// Example context types
interface UserContextValue {
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

interface SettingsContextValue {
  language: string;
  notifications: boolean;
  setLanguage: (lang: string) => void;
  toggleNotifications: () => void;
}

// Create contexts
const ExampleUserContext = createContext<UserContextValue | null>(null);
const SettingsContext = createContext<SettingsContextValue | null>(null);

// Custom hooks for consuming contexts
function useExampleUser(): UserContextValue {
  const context = useContext(ExampleUserContext);
  if (!context) {
    throw new Error('useExampleUser must be used within ExampleUserProvider');
  }
  return context;
}

function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}

// Provider components
function ExampleUserProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user] = useState<UserContextValue>({
    name: 'Jane Doe',
    email: 'jane@reacthooksstudio.dev',
    role: 'admin',
  });

  return (
    <ExampleUserContext.Provider value={user}>
      {children}
    </ExampleUserContext.Provider>
  );
}

function SettingsProvider({ children }: { children: ReactNode }): JSX.Element {
  const [language, setLanguage] = useState('English');
  const [notifications, setNotifications] = useState(true);

  const toggleNotifications = (): void => {
    setNotifications((prev) => !prev);
  };

  const value: SettingsContextValue = {
    language,
    notifications,
    setLanguage,
    toggleNotifications,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

// Consumer components that demonstrate useContext
function UserCard(): JSX.Element {
  const user = useExampleUser();

  return (
    <div className="p-4 bg-gradient-to-r from-primary-500 to-purple-500 rounded-lg text-white">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold">User Profile</h4>
        <InlineRenderCounter />
      </div>
      <p className="text-lg font-medium">{user.name}</p>
      <p className="text-sm opacity-90">{user.email}</p>
      <span className="inline-block mt-2 px-2 py-1 bg-white/20 rounded text-xs uppercase">
        {user.role}
      </span>
    </div>
  );
}

function SettingsPanel(): JSX.Element {
  const { language, notifications, setLanguage, toggleNotifications } = useSettings();
  const languages = ['English', 'Spanish', 'French', 'German', 'Japanese'];

  return (
    <div className="p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-gray-900 dark:text-dark-text">Settings</h4>
        <InlineRenderCounter />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 dark:text-dark-muted mb-1">
            Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-dark-muted">
            Notifications
          </span>
          <button
            type="button"
            onClick={toggleNotifications}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors
              ${notifications ? 'bg-primary-500' : 'bg-gray-300 dark:bg-dark-border'}
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                ${notifications ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

function DisplaySettings(): JSX.Element {
  const { language, notifications } = useSettings();

  return (
    <div className="p-4 bg-gray-50 dark:bg-dark-bg rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-700 dark:text-dark-text">
          Current Settings (Consumer)
        </h4>
        <InlineRenderCounter />
      </div>
      <p className="text-sm text-gray-600 dark:text-dark-muted">
        Language: <strong>{language}</strong>
      </p>
      <p className="text-sm text-gray-600 dark:text-dark-muted">
        Notifications: <strong>{notifications ? 'On' : 'Off'}</strong>
      </p>
    </div>
  );
}

function DeepNestedComponent(): JSX.Element {
  const user = useExampleUser();
  const settings = useSettings();

  return (
    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-amber-800 dark:text-amber-300">
          Deep Nested Component
        </h4>
        <InlineRenderCounter />
      </div>
      <p className="text-sm text-amber-700 dark:text-amber-400">
        This component is deeply nested but can access context directly without prop drilling!
      </p>
      <div className="mt-2 text-xs text-amber-600 dark:text-amber-500 font-mono">
        User: {user.name} | Lang: {settings.language}
      </div>
    </div>
  );
}

/**
 * useContext playground component
 */
export function UseContextPlayground(): JSX.Element {
  return (
    <HookCard
      title="useContext"
      description="useContext lets you subscribe to React context and access shared data without prop drilling."
      whatItDoes="useContext accepts a context object created by React.createContext and returns the current context value. The value is determined by the nearest Provider above in the tree. When the Provider's value changes, useContext triggers a re-render."
      commonMistakes={[
        'Forgetting to wrap the tree with the Provider component',
        'Using context for state that changes frequently (causes many re-renders)',
        'Not creating type-safe custom hooks for consuming context',
        'Putting too much unrelated state in a single context',
        'Forgetting that all consumers re-render when context value changes',
      ]}
      performanceConsiderations={[
        'Split contexts by update frequency to reduce re-renders',
        'Use memo or useMemo to stabilize context value objects',
        'Consider using multiple smaller contexts instead of one large one',
        'Context is best for infrequently updated global state',
        'For frequent updates, consider other state management solutions',
      ]}
      codeExample={codeExample}
    >
      <div className="space-y-6">
        <RenderCounter label="Playground renders" showTimestamp />

        {/* Interactive Context Example */}
        <ExampleUserProvider>
          <SettingsProvider>
            <div className="p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-dark-text mb-4">
                🌐 Live Context Example
              </h3>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <UserCard />
                <SettingsPanel />
              </div>

              <DisplaySettings />

              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-dark-muted mb-2">
                  Simulated component hierarchy:
                </p>
                <div className="p-3 bg-gray-100 dark:bg-dark-bg rounded-lg text-sm font-mono text-gray-600 dark:text-dark-muted">
                  <div>App</div>
                  <div className="ml-4">└─ UserProvider</div>
                  <div className="ml-8">└─ SettingsProvider</div>
                  <div className="ml-12">└─ Page</div>
                  <div className="ml-16">└─ Section</div>
                  <div className="ml-20">└─ DeepNestedComponent 👇</div>
                </div>
              </div>

              <div className="mt-4">
                <DeepNestedComponent />
              </div>
            </div>
          </SettingsProvider>
        </ExampleUserProvider>

        {/* Context Pattern */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
            📐 Recommended Context Pattern
          </h3>
          <ol className="text-sm text-blue-700 dark:text-blue-400 space-y-1 list-decimal list-inside">
            <li>Create context with a typed default value</li>
            <li>Create a Provider component that manages state</li>
            <li>Create a custom hook (useXxx) that throws if used outside Provider</li>
            <li>Export only the Provider and custom hook</li>
            <li>Wrap your app tree with the Provider</li>
          </ol>
        </div>

        {/* When to Use */}
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <h3 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">
            ✅ Good use cases for Context
          </h3>
          <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
            <li>• Theme data (dark/light mode)</li>
            <li>• User authentication state</li>
            <li>• Locale/language preferences</li>
            <li>• App-wide configuration</li>
            <li>• Feature flags</li>
          </ul>
        </div>
      </div>
    </HookCard>
  );
}
