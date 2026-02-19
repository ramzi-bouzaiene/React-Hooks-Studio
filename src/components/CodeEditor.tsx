import Editor from '@monaco-editor/react';
import { useTheme } from '../context/ThemeContext';
import type { CodeEditorProps } from '../types';

/**
 * Monaco code editor component with TypeScript support
 */
export function CodeEditor({
  value,
  onChange,
  language = 'typescript',
  readOnly = false,
  height = '300px',
}: CodeEditorProps): JSX.Element {
  const { theme } = useTheme();

  const handleEditorChange = (newValue: string | undefined): void => {
    if (onChange && newValue !== undefined) {
      onChange(newValue);
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-dark-border shadow-inner">
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={handleEditorChange}
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
          lineNumbers: 'on',
          roundedSelection: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          padding: { top: 20, bottom: 20 },
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
        }}
      />
    </div>
  );
}
