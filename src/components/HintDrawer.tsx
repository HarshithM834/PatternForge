import { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import styles from './HintDrawer.module.css';

interface HintDrawerProps {
  hints: string[];
}

export function HintDrawer({ hints }: HintDrawerProps) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const revealNextHint = () => {
    if (revealedCount < hints.length) {
      setRevealedCount(prev => prev + 1);
      setIsOpen(true);
    }
  };

  if (hints.length === 0) return null;

  return (
    <div className={styles.container}>
      <button 
        className={styles.toggleBtn} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.toggleContent}>
          <Lightbulb size={16} className={styles.icon} />
          {revealedCount > 0 ? `Hints (${revealedCount}/${hints.length})` : 'Need a hint?'}
        </span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div className={styles.drawer}>
          {hints.slice(0, revealedCount).map((hint, index) => (
            <div key={index} className={styles.hintItem}>
              <div className={styles.hintNumber}>Hint {index + 1}</div>
              <p className={styles.hintText}>{hint}</p>
            </div>
          ))}
          
          {revealedCount < hints.length && (
            <button className={styles.revealBtn} onClick={revealNextHint}>
              Reveal Hint {revealedCount + 1}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
