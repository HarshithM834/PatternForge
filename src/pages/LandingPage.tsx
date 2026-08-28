import { useNavigate } from 'react-router-dom';
import { Code2, BookOpen, BrainCircuit, RefreshCw } from 'lucide-react';
import styles from './LandingPage.module.css';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Code2 size={28} className={styles.logoIcon} />
          <span>PatternForge</span>
        </div>
      </header>
      
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.headline}>Learn how to think through coding problems.</h1>
          <p className={styles.subheadline}>
            Build DSA intuition through guided lessons, interactive practice, and reusable algorithmic patterns.
          </p>
          <button className="primary-btn" onClick={() => navigate('/lesson')}>
            Start First Lesson
          </button>
        </div>

        <div className={styles.features}>
          <div className={styles.featureCard}>
            <BookOpen size={32} className={styles.featureIcon} />
            <h3>Learn</h3>
            <p>Understand the core concepts without overwhelming jargon.</p>
          </div>
          <div className={styles.featureCard}>
            <BrainCircuit size={32} className={styles.featureIcon} />
            <h3>Practice</h3>
            <p>Step-by-step interactive tracing and fill-in-the-blanks.</p>
          </div>
          <div className={styles.featureCard}>
            <Code2 size={32} className={styles.featureIcon} />
            <h3>Apply</h3>
            <p>Write real code to solve independent transfer problems.</p>
          </div>
          <div className={styles.featureCard}>
            <RefreshCw size={32} className={styles.featureIcon} />
            <h3>Retain</h3>
            <p>Solidify knowledge with reflective exercises and pattern recognition.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
