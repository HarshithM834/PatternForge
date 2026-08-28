import styles from './PatternMasteryCard.module.css';

export function PatternMasteryCard() {
  return (
    <div className={styles.card}>
      <div className={styles.title}>
        <span role="img" aria-label="unlock">🔓</span> 
        Pattern Unlocked: Hash Map Complement Lookup
      </div>
      <div className={styles.subtitle}>
        You now have a reliable tool for matching pairs efficiently.
      </div>

      <div className={styles.grid}>
        <div className={styles.section}>
          <div className={styles.label}>The Clue</div>
          <div className={styles.value}>"Find two items that sum to a target" or "Find a pair"</div>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>Mental Model</div>
          <div className={styles.value}>"What do I need right now, and have I seen it before?"</div>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>Data Structure</div>
          <div className={styles.value}>
            <span className={styles.badge}>Dictionary / Hash Map</span>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>What is stored?</div>
          <div className={styles.value}>Key = Item Value<br/>Value = Item Index</div>
        </div>

        <div className={styles.section} style={{ gridColumn: '1 / -1' }}>
          <div className={styles.label}>Efficiency (Why we do it)</div>
          <div className={styles.complexities}>
            <span className={styles.badge}>Time: O(n)</span>
            <span className={styles.badge}>Space: O(n)</span>
          </div>
          <div className={styles.value} style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            We trade a little extra memory to gain massive speed, avoiding nested loops.
          </div>
        </div>
      </div>
    </div>
  );
}
