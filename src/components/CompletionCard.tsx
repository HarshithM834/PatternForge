import { Award } from 'lucide-react';
import styles from './CompletionCard.module.css';

interface CompletionCardProps {
  onReturnHome: () => void;
}

export function CompletionCard({ onReturnHome }: CompletionCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <Award size={64} className={styles.icon} />
      </div>
      <h1 className={styles.title}>Pattern Unlocked!</h1>
      <h2 className={styles.subtitle}>Hash Map Complement Lookup</h2>
      <p className={styles.description}>
        You've mastered identifying when to use a hash map to find pairs in O(n) time. 
        This is one of the most common patterns in DSA interviews.
      </p>
      <button className="primary-btn" onClick={onReturnHome}>
        Return to Dashboard
      </button>
    </div>
  );
}
