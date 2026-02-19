import { useState } from 'react';
import { CodeEditor } from './CodeEditor';
import { Preview } from './Preview';
import type { HookCardProps } from '../types';

/**
 * Card component for displaying hook information and interactive examples
 */
export function HookCard({
  title,
  description,
  whatItDoes,
  commonMistakes,
  performanceConsiderations,
  children,
  codeExample,
}: HookCardProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [code, setCode] = useState(codeExample);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="card-hover p-8">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-dark-text mb-3">
              {title}
            </h1>
            <p className="text-lg text-slate-600 dark:text-dark-muted leading-relaxed">{description}</p>
          </div>
        </div>
      </div>

      {/* What it does */}
      <div className="card-hover p-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-dark-text mb-4 flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-xl">📖</span>
          What it does
        </h2>
        <p className="text-slate-600 dark:text-dark-muted leading-relaxed text-base">
          {whatItDoes}
        </p>
      </div>

      {/* Interactive Example */}
      <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-slate-200 dark:border-dark-border overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-bg/50">
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`
              px-8 py-4 text-sm font-semibold transition-all relative
              ${
                activeTab === 'preview'
                  ? 'text-violet-600 dark:text-violet-400'
                  : 'text-slate-500 dark:text-dark-muted hover:text-slate-900 dark:hover:text-dark-text'
              }
            `}
          >
            Preview
            {activeTab === 'preview' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`
              px-8 py-4 text-sm font-semibold transition-all relative
              ${
                activeTab === 'code'
                  ? 'text-violet-600 dark:text-violet-400'
                  : 'text-slate-500 dark:text-dark-muted hover:text-slate-900 dark:hover:text-dark-text'
              }
            `}
          >
            Code
            {activeTab === 'code' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {activeTab === 'preview' ? (
            <Preview title="Live Example">{children}</Preview>
          ) : (
            <CodeEditor
              value={code}
              onChange={setCode}
              language="typescript"
              height="400px"
            />
          )}
        </div>
      </div>

      {/* Common Mistakes */}
      <div className="card-hover p-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-dark-text mb-5 flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-xl">⚠️</span>
          Common Mistakes
        </h2>
        <ul className="space-y-3">
          {commonMistakes.map((mistake, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-slate-600 dark:text-dark-muted"
            >
              <span className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-500 text-xs font-bold flex-shrink-0 mt-0.5">{index + 1}</span>
              <span className="leading-relaxed">{mistake}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Performance Considerations */}
      <div className="card-hover p-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-dark-text mb-5 flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-xl">⚡</span>
          Performance Considerations
        </h2>
        <ul className="space-y-3">
          {performanceConsiderations.map((consideration, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-slate-600 dark:text-dark-muted"
            >
              <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-500 text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
              <span className="leading-relaxed">{consideration}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
