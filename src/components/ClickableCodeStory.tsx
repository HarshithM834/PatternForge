import { useState } from 'react';
import styles from './ClickableCodeStory.module.css';

interface CodeLine {
  text: string;
  explanation?: string;
}

interface ClickableCodeStoryProps {
  lines: CodeLine[];
  onComplete?: () => void;
}

export function ClickableCodeStory({ lines, onComplete }: ClickableCodeStoryProps) {
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [viewedLines, setViewedLines] = useState<Set<number>>(new Set());

  const handleLineClick = (idx: number) => {
    if (!lines[idx].explanation) return;
    
    setActiveLine(idx);
    
    const newViewed = new Set(viewedLines);
    newViewed.add(idx);
    setViewedLines(newViewed);

    // If they've viewed all lines that have explanations
    const explainableCount = lines.filter(l => l.explanation).length;
    if (newViewed.size === explainableCount && onComplete) {
      onComplete();
    }
  };

  return (
    <div>
      <div className={styles.container}>
        {lines.map((line, idx) => (
          <div 
            key={idx}
            className={`${styles.codeLine} ${activeLine === idx ? styles.active : ''}`}
            onClick={() => handleLineClick(idx)}
            style={{ cursor: line.explanation ? 'pointer' : 'default' }}
          >
            <span className={styles.lineNumber}>{idx + 1}</span>
            <span className={styles.codeContent}>{line.text}</span>
          </div>
        ))}
      </div>

      {activeLine !== null && lines[activeLine].explanation ? (
        <div className={styles.explanationBox}>
          <strong>Line {activeLine + 1}:</strong> {lines[activeLine].explanation}
        </div>
      ) : (
        <div className={styles.prompt}>
          Click on the lines of code to understand how they work.
        </div>
      )}
    </div>
  );
}
