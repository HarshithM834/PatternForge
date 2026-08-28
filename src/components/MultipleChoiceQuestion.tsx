import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import styles from './MultipleChoiceQuestion.module.css';

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

interface MultipleChoiceQuestionProps {
  question: string;
  options: Option[];
  onCorrectAnswer: () => void;
}

export function MultipleChoiceQuestion({ question, options, onCorrectAnswer }: MultipleChoiceQuestionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSelect = (option: Option) => {
    setSelectedId(option.id);
    setIsCorrect(option.isCorrect);
    if (option.isCorrect) {
      onCorrectAnswer();
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.question}>{question}</h3>
      <div className={styles.options}>
        {options.map((option) => {
          const isSelected = selectedId === option.id;
          let optionClass = styles.option;
          
          if (isSelected) {
            optionClass += option.isCorrect ? ` ${styles.correct}` : ` ${styles.incorrect}`;
          }

          return (
            <button
              key={option.id}
              className={optionClass}
              onClick={() => handleSelect(option)}
              disabled={isCorrect === true}
            >
              <div className={styles.optionContent}>
                <span className={styles.optionText}>{option.text}</span>
                {isSelected && option.isCorrect && <CheckCircle size={18} className={styles.iconCorrect} />}
                {isSelected && !option.isCorrect && <XCircle size={18} className={styles.iconIncorrect} />}
              </div>
              {isSelected && option.explanation && (
                <div className={styles.explanation}>{option.explanation}</div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
