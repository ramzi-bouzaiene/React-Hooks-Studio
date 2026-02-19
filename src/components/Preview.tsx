import type { PreviewProps } from '../types';

/**
 * Preview container for displaying interactive hook examples
 */
export function Preview({ children, title }: PreviewProps): JSX.Element {
  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-xs font-bold text-slate-400 dark:text-dark-muted uppercase tracking-widest">
          {title}
        </h3>
      )}
      <div className="bg-slate-50 dark:bg-dark-bg rounded-xl p-6 border border-slate-200 dark:border-dark-border">
        {children}
      </div>
    </div>
  );
}
