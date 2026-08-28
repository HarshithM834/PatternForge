import { useState } from 'react';
import styles from './PlanningPrompts.module.css';

interface PlanningPromptsProps {
  onComplete: () => void;
}

export function PlanningPrompts({ onComplete }: PlanningPromptsProps) {
  const [answers, setAnswers] = useState(['', '', '']);
  const [showExpected, setShowExpected] = useState(false);

  const prompts = [
    {
      question: "1. As you loop through the array, what does the 'current value' represent in the song duration problem?",
      expected: "It represents the duration of the song we are currently looking at in the list."
    },
    {
      question: "2. What value do you actually need to find to form a pair?",
      expected: "We need to find the complement (target duration - current song duration)."
    },
    {
      question: "3. What exactly does the dictionary store to make the lookup fast?",
      expected: "The dictionary stores the song durations we have ALREADY seen as keys, and their indices as values."
    }
  ];

  const handleReveal = () => {
    setShowExpected(true);
    onComplete();
  };

  const allFilled = answers.every(a => a.trim().length > 0);

  return (
    <div className={styles.container}>
      {prompts.map((prompt, index) => (
        <div key={index} className={styles.promptItem}>
          <div className={styles.question}>{prompt.question}</div>
          <textarea 
            className={styles.input}
            placeholder="Type your answer here..."
            value={answers[index]}
            onChange={(e) => {
              const newAnswers = [...answers];
              newAnswers[index] = e.target.value;
              setAnswers(newAnswers);
            }}
            disabled={showExpected}
          />
          {showExpected && (
            <div className={styles.expectedAnswer}>
              <strong>Expected thinking:</strong> {prompt.expected}
            </div>
          )}
        </div>
      ))}
      
      {!showExpected && (
        <div className={styles.actions}>
          <button 
            className="secondary-btn" 
            onClick={handleReveal}
          >
            I'm stuck, show me the expected thinking
          </button>
          <button 
            className="primary-btn" 
            onClick={handleReveal}
            disabled={!allFilled}
          >
            Check my plan
          </button>
        </div>
      )}
    </div>
  );
}
