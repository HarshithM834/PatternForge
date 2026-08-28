import { useState } from 'react';
import styles from './CodeFillBlank.module.css';

interface CodeFillBlankProps {
  parts: { text?: string; blankId?: string }[];
  blanks: Record<string, string>; // blankId -> correctAnswer
  feedback?: { success?: string; error?: string };
  onComplete: () => void;
}

export function CodeFillBlank({ parts, blanks, feedback, onComplete }: CodeFillBlankProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
    setStatus('idle');
  };

  const checkAnswers = () => {
    let allCorrect = true;
    for (const [id, correct] of Object.entries(blanks)) {
      if (answers[id]?.trim() !== correct) {
        allCorrect = false;
        break;
      }
    }
    
    if (allCorrect) {
      setStatus('success');
      onComplete();
    } else {
      setStatus('error');
    }
  };

  return (
    <div className={styles.container}>
      <pre className={styles.codeBlock}>
        <code>
          {parts.map((part, index) => {
            if (part.blankId) {
              return (
                <input
                  key={index}
                  type="text"
                  className={`${styles.input} ${status === 'error' && answers[part.blankId]?.trim() !== blanks[part.blankId] ? styles.inputError : ''}`}
                  value={answers[part.blankId] || ''}
                  onChange={(e) => handleChange(part.blankId!, e.target.value)}
                  style={{ width: `${Math.max(blanks[part.blankId].length * 10, 40)}px` }}
                />
              );
            }
            return <span key={index}>{part.text}</span>;
          })}
        </code>
      </pre>
      <div className={styles.actions}>
        <button 
          className="primary-btn" 
          onClick={checkAnswers} 
          disabled={status === 'success'}
        >
          {status === 'success' ? 'Correct!' : 'Check Code'}
        </button>
      </div>
      
      {status === 'success' && feedback?.success && (
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: 'rgba(0, 230, 118, 0.1)', borderLeft: '3px solid var(--success-green)', color: '#1E293B', borderRadius: '4px', animation: 'fadeIn 0.3s ease' }}>
          {feedback.success}
        </div>
      )}
      
      {status === 'error' && feedback?.error && (
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: 'rgba(255, 59, 48, 0.1)', borderLeft: '3px solid var(--error-red)', color: '#1E293B', borderRadius: '4px', animation: 'fadeIn 0.3s ease' }}>
          {feedback.error}
        </div>
      )}
    </div>
  );
}
