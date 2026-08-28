import { useState } from 'react';
import styles from './ReflectionForm.module.css';

interface ReflectionFormProps {
  onSubmit: (reflection: string) => void;
}

export function ReflectionForm({ onSubmit }: ReflectionFormProps) {
  const [text, setText] = useState('');

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Reflect on what you've learned</h3>
      <p className={styles.subtitle}>In your own words, explain how the Hash Map pattern helps solve the "Find the Pair" problem efficiently.</p>
      
      <textarea
        className={styles.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="When we use a hash map to..."
        rows={4}
      />
      
      <div className={styles.actions}>
        <button 
          className="primary-btn" 
          onClick={() => onSubmit(text)}
          disabled={text.trim().length < 10}
        >
          Complete Lesson
        </button>
      </div>
    </div>
  );
}
