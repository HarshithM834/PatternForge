import { useState, useEffect } from 'react';
import { BookOpen, X } from 'lucide-react';
import styles from './GlossaryTerm.module.css';

interface GlossaryTermProps {
  term: string;
  definition: string;
}

export function GlossaryTerm({ term, definition }: GlossaryTermProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleCloseOthers = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail.term !== term) {
        setIsOpen(false);
      }
    };
    window.addEventListener('glossary-open', handleCloseOthers);
    return () => window.removeEventListener('glossary-open', handleCloseOthers);
  }, [term]);

  const toggleOpen = () => {
    if (!isOpen) {
      window.dispatchEvent(new CustomEvent('glossary-open', { detail: { term } }));
    }
    setIsOpen(!isOpen);
  };

  return (
    <span className={styles.container}>
      <button 
        className={styles.termBtn}
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <BookOpen size={14} className={styles.icon} />
        {term}
      </button>

      {isOpen && (
        <span className={styles.popover}>
          <span className={styles.header}>
            <span className={styles.title}>{term}</span>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
              <X size={16} />
            </button>
          </span>
          <span className={styles.definition}>{definition}</span>
        </span>
      )}
    </span>
  );
}
