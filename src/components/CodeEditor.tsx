import { useState, ChangeEvent } from 'react';
import styles from './CodeEditor.module.css';

interface CodeEditorProps {
  initialCode: string;
  expectedOutput?: string;
  onSuccess: () => void;
  deterministicCheck: (code: string) => boolean;
}

export function CodeEditor({ initialCode, deterministicCheck, onSuccess }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      // Wait for React to update the state, then set cursor
      setTimeout(() => {
        if (e.currentTarget) {
          e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  const runCode = () => {
    const isCorrect = deterministicCheck(code);
    if (isCorrect) {
      setStatus('success');
      setFeedback('Tests passed! Your solution is correct.');
      onSuccess();
    } else {
      setStatus('error');
      setFeedback('Tests failed. Keep trying!');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>main.py</span>
      </div>
      <textarea
        className={styles.editor}
        value={code}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
      />
      <div className={styles.footer}>
        <div className={styles.feedbackContainer}>
          {status === 'success' && <span className={styles.successText}>{feedback}</span>}
          {status === 'error' && <span className={styles.errorText}>{feedback}</span>}
        </div>
        <button className="primary-btn" onClick={runCode}>
          Run Code
        </button>
      </div>
    </div>
  );
}
