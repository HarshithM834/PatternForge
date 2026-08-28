import { useNavigate } from 'react-router-dom';
import { CompletionCard } from '../components/CompletionCard';
import styles from './CompletionPage.module.css';

export function CompletionPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <CompletionCard onReturnHome={() => navigate('/')} />
    </div>
  );
}
