import { useState } from 'react';
import styles from './InteractiveTrace.module.css';

interface InteractiveTraceProps {
  onComplete: () => void;
}

export function InteractiveTrace({ onComplete }: InteractiveTraceProps) {
  const [step, setStep] = useState(0);

  const prices = [4, 11, 7, 2];
  const target = 9;

  const traceSteps = [
    {
      currentValue: '-',
      currentIndex: '-',
      complement: '-',
      seenMap: '{}',
      decision: 'Ready to start the loop.',
      status: 'pending'
    },
    {
      currentValue: '4',
      currentIndex: '0',
      complement: '9 - 4 = 5',
      seenMap: '{}',
      decision: 'Is 5 in the map? No. Add 4 to map.',
      status: 'pending'
    },
    {
      currentValue: '11',
      currentIndex: '1',
      complement: '9 - 11 = -2',
      seenMap: '{ 4: 0 }',
      decision: 'Is -2 in the map? No. Add 11 to map.',
      status: 'pending'
    },
    {
      currentValue: '7',
      currentIndex: '2',
      complement: '9 - 7 = 2',
      seenMap: '{ 4: 0, 11: 1 }',
      decision: 'Is 2 in the map? No. Add 7 to map.',
      status: 'pending'
    },
    {
      currentValue: '2',
      currentIndex: '3',
      complement: '9 - 2 = 7',
      seenMap: '{ 4: 0, 11: 1, 7: 2 }',
      decision: 'Is 7 in the map? YES! We found our pair.',
      status: 'found'
    },
    {
      currentValue: '2',
      currentIndex: '3',
      complement: '7',
      seenMap: '{ 4: 0, 11: 1, 7: 2 }',
      decision: 'Return [map[7], 3] -> [2, 3]',
      status: 'found'
    }
  ];

  const currentTrace = traceSteps[step];
  
  const handleNext = () => {
    if (step < traceSteps.length - 1) {
      setStep(s => s + 1);
      if (step + 1 === traceSteps.length - 1) {
        onComplete();
      }
    }
  };

  const getActiveIndex = () => {
    if (step === 0) return -1;
    if (step === 1) return 0;
    if (step === 2) return 1;
    if (step === 3) return 2;
    if (step >= 4) return 3;
    return -1;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Algorithm Trace</div>
        <div className={styles.inputs}>Target = {target}</div>
      </div>

      <div className={styles.arrayVisual}>
        {prices.map((p, i) => (
          <div key={i} className={`${styles.arrayItem} ${i === getActiveIndex() ? styles.active : ''}`}>
            {p}
            <div className={styles.indexLabel}>{i}</div>
          </div>
        ))}
      </div>

      <div className={styles.stateGrid}>
        <div className={styles.stateCard}>
          <div className={styles.cardLabel}>Current Item</div>
          <div className={styles.cardValue}>
            Value: {currentTrace.currentValue} <br/>
            Index: {currentTrace.currentIndex}
          </div>
        </div>
        
        <div className={styles.stateCard}>
          <div className={styles.cardLabel}>Complement Needed</div>
          <div className={styles.cardValue}>{currentTrace.complement}</div>
        </div>
      </div>

      <div className={styles.stateCard} style={{ marginBottom: '24px' }}>
        <div className={styles.cardLabel}>Seen Hash Map</div>
        <div className={styles.cardValue}>{currentTrace.seenMap}</div>
      </div>

      <div className={`${styles.decisionBox} ${styles[currentTrace.status]}`}>
        {currentTrace.decision}
      </div>

      <div className={styles.actions}>
        <button 
          className="primary-btn" 
          onClick={handleNext}
          disabled={step === traceSteps.length - 1}
        >
          {step === traceSteps.length - 1 ? 'Trace Complete' : 'Next Iteration'}
        </button>
      </div>
    </div>
  );
}
