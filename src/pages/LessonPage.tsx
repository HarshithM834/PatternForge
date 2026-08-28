import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from '../components/ProgressBar';
import { GlossaryTerm } from '../components/GlossaryTerm';
import { HintDrawer } from '../components/HintDrawer';
import { MultipleChoiceQuestion } from '../components/MultipleChoiceQuestion';
import { CodeFillBlank } from '../components/CodeFillBlank';
import { CodeEditor } from '../components/CodeEditor';
import { ReflectionForm } from '../components/ReflectionForm';
import { InteractiveTrace } from '../components/InteractiveTrace';
import { ClickableCodeStory } from '../components/ClickableCodeStory';
import { PlanningPrompts } from '../components/PlanningPrompts';
import { PatternMasteryCard } from '../components/PatternMasteryCard';
import styles from './LessonPage.module.css';

const TOTAL_STEPS = 14;

export function LessonPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem('patternforge_currentStep');
    return saved ? parseInt(saved, 10) : 1;
  });
  
  const [canAdvance, setCanAdvance] = useState(false);

  useEffect(() => {
    localStorage.setItem('patternforge_currentStep', currentStep.toString());
  }, [currentStep]);

  useEffect(() => {
    // Determine which steps are "read-only" and can be advanced immediately
    const readOnlySteps = [1, 3, 4, 5, 6, 7, 9];
    if (readOnlySteps.includes(currentStep)) {
      setCanAdvance(true);
    } else {
      setCanAdvance(false);
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(curr => curr + 1);
    } else {
      navigate('/completion');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(curr => curr - 1);
    }
  };

  const glossary = [
    { term: "index", def: "The position of an item in a sequence, usually starting at 0." },
    { term: "brute force", def: "A straightforward, naive approach that checks all possible solutions, usually slow." },
    { term: "hash map", def: "A data structure that stores key-value pairs for extremely fast O(1) lookups. In Python, this is a dictionary." },
    { term: "key-value pair", def: "Two linked data items. You use the key to quickly find the value." },
    { term: "complement", def: "The missing value needed to reach the target. (target - current_value = complement)" },
    { term: "lookup", def: "The operation of finding a value in a data structure." },
    { term: "O(n²)", def: "Time complexity where the work grows quadratically as the input grows (e.g. nested loops)." },
    { term: "O(n)", def: "Time complexity where the work grows linearly, directly proportional to the input size." }
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.stepContent}>
            <h2>Welcome to PatternForge</h2>
            <p>Today we're learning the <strong>Hash Map Complement Lookup</strong> pattern.</p>
            <p><strong>Outcomes:</strong> You will start with a problem, write a brute force solution, understand why it's slow, learn how a dictionary/hash map fixes it, and finally solve a completely new transfer problem entirely on your own.</p>
            <p><em>Prerequisites:</em> Basic Python lists, loops, functions, and if statements.</p>
          </div>
        );
      case 2:
        return (
          <div className={styles.stepContent}>
            <h2>Read the Problem</h2>
            <p>You are building a shopping app. A user has a list of item prices and a spending target. Return the <strong>indices</strong> of two different items whose prices add up exactly to the target.</p>
            <pre><code>prices = [4, 11, 7, 2]
target = 9</code></pre>
            <p>Expected result: <code>[2, 3]</code> because prices[2] is 7, prices[3] is 2, and 7 + 2 = 9.</p>
            <p>Notice the difference between the <em>value</em> (7) and the <em>index</em> (2).</p>
            
            <MultipleChoiceQuestion 
              question="What must our function return?"
              options={[
                { id: 'a', text: 'The prices of the two items (e.g., [7, 2])', isCorrect: false },
                { id: 'b', text: 'The indices (positions) of the two items (e.g., [2, 3])', isCorrect: true, explanation: 'Correct! The problem explicitly asks for the indices, not the actual values.' },
                { id: 'c', text: 'True or False', isCorrect: false }
              ]}
              onCorrectAnswer={() => setCanAdvance(true)}
            />
          </div>
        );
      case 3:
        return (
          <div className={styles.stepContent}>
            <h2>The Brute Force Idea</h2>
            <p>A perfectly valid first idea is to check every possible pair using two nested loops.</p>
            <pre><code>For each item i in prices:
  For each item j in prices after i:
    if prices[i] + prices[j] == target:
      return [i, j]</code></pre>
            <p>Tracing <code>[4, 11, 7, 2]</code> for target <code>9</code>:</p>
            <table className={styles.traceTable}>
              <thead>
                <tr><th>i</th><th>j</th><th>Sum</th><th>Result</th></tr>
              </thead>
              <tbody>
                <tr><td>4</td><td>11</td><td>15</td><td>No</td></tr>
                <tr><td>4</td><td>7</td><td>11</td><td>No</td></tr>
                <tr><td>4</td><td>2</td><td>6</td><td>No</td></tr>
                <tr><td>11</td><td>7</td><td>18</td><td>No</td></tr>
                <tr><td>11</td><td>2</td><td>13</td><td>No</td></tr>
                <tr><td>7</td><td>2</td><td>9</td><td><strong>Yes!</strong></td></tr>
              </tbody>
            </table>
          </div>
        );
      case 4:
        return (
          <div className={styles.stepContent}>
            <h2>Why Brute Force Gets Slow</h2>
            <p>Our brute force works, but how many checks does it do?</p>
            <ul>
              <li>For 10 items: ~45 checks</li>
              <li>For 100 items: ~4,950 checks</li>
              <li>For 1,000 items: ~499,500 checks</li>
              <li>For 100,000 items: ~4.9 <em>billion</em> checks!</li>
            </ul>
            <p>This is called <strong><GlossaryTerm term="O(n²)" definition={glossary[6].def} /></strong>. The amount of work grows very quickly because many pairs are compared over and over.</p>
          </div>
        );
      case 5:
        return (
          <div className={styles.stepContent}>
            <h2>The Complement Concept</h2>
            <p>Instead of looking forward at all other numbers with a second loop, what if we just ask: <em>"What specific number do I need right now?"</em></p>
            <p>This needed number is called the <strong><GlossaryTerm term="complement" definition={glossary[4].def} /></strong>.</p>
            <div style={{ padding: '16px', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderLeft: '3px solid var(--accent-cyan)', margin: '16px 0' }}>
              <strong>Mini-question:</strong> If our target is <code>15</code>, and the current item is <code>6</code>, what is the complement?<br/><br/>
              <em>Answer:</em> <code>9</code>. (Because 15 - 6 = 9).
            </div>
            <p>By knowing exactly what we are looking for, we don't need a second loop—if we have a fast way to check if we've seen it!</p>
          </div>
        );
      case 6:
        return (
          <div className={styles.stepContent}>
            <h2>The Hash Map / Dictionary</h2>
            <p>We need a fast way to check if our complement was seen in the past. In Python, this is a <strong>dictionary</strong>.</p>
            <p>In technical interviews, this is referred to as a <strong><GlossaryTerm term="hash map" definition={glossary[2].def} /></strong>.</p>
            <p>We will store the <strong>value we saw as the key</strong> and its <strong>index as the value</strong>.</p>
            <pre><code>{`seen = { 4: 0, 11: 1 }`}</code></pre>
            <p>If our complement is 4, we can instantly look it up in <code>seen</code> to get its index, 0.</p>
          </div>
        );
      case 7:
        return (
          <div className={styles.stepContent}>
            <h2>The Four-Action Pattern</h2>
            <p>For every item in the array, we will always do these four steps:</p>
            <div style={{ backgroundColor: '#F8FAFC', padding: '24px', border: '1px solid var(--border-subtle)', borderRadius: '8px' }}>
              <ol style={{ marginLeft: '24px', color: '#000', fontWeight: '500' }}>
                <li style={{ marginBottom: '12px' }}>Look at the <strong>current value</strong>.</li>
                <li style={{ marginBottom: '12px' }}>Calculate the <strong>complement</strong>.</li>
                <li style={{ marginBottom: '12px' }}><strong>Check</strong> if the complement is in our dictionary.</li>
                <li style={{ marginBottom: '12px' }}>If yes, return the indices! If no, <strong>store</strong> the current value and index in the dictionary.</li>
              </ol>
            </div>
          </div>
        );
      case 8:
        return (
          <div className={styles.stepContent}>
            <h2>Tracing the Pattern</h2>
            <p>Let's step through the array using our four-action pattern.</p>
            <InteractiveTrace onComplete={() => setCanAdvance(true)} />
          </div>
        );
      case 9:
        return (
          <div className={styles.stepContent}>
            <h2>Why check BEFORE storing?</h2>
            <p>You might wonder why we check the dictionary <em>before</em> we add the current item to it.</p>
            <p>Imagine <code>prices = [3, 3]</code> and <code>target = 6</code>.</p>
            <p>If we added the first <code>3</code> to the dictionary before checking, its complement (which is also 3) would instantly be found! We would match the item with <em>itself</em>.</p>
            <p>By checking first, we guarantee we are matching with a <strong>different</strong> item that came earlier in the array.</p>
          </div>
        );
      case 10:
        return (
          <div className={styles.stepContent}>
            <h2>Read the Code like a Story</h2>
            <ClickableCodeStory 
              lines={[
                { text: "def find_pair(prices, target):" },
                { text: "    seen = {}", explanation: "Create an empty dictionary to store prices we have already seen." },
                { text: "    for i, price in enumerate(prices):", explanation: "Loop through the list, grabbing both the index (i) and the value (price)." },
                { text: "        complement = target - price", explanation: "Calculate the exact number we need to hit the target." },
                { text: "        if complement in seen:", explanation: "Check if we have already seen this needed number in the past." },
                { text: "            return [seen[complement], i]", explanation: "If we did, we are done! Return the index of the complement from the dictionary, and our current index." },
                { text: "        seen[price] = i", explanation: "If we didn't find it, add the current price and its index to the dictionary so future numbers can check for it." },
                { text: "    return []", explanation: "If we finish the loop and find nothing, return an empty list." }
              ]}
              onComplete={() => setCanAdvance(true)}
            />
          </div>
        );
      case 11:
        return (
          <div className={styles.stepContent}>
            <h2>Check your understanding</h2>
            <p>Fill in the blanks to complete the pattern.</p>
            <CodeFillBlank 
              parts={[
                { text: 'def find_pair(prices, target):\n    seen = {}\n    for i, price in enumerate(prices):\n        complement = ' },
                { blankId: 'comp' },
                { text: ' - price\n        if ' },
                { blankId: 'cond' },
                { text: ' in seen:\n            return [seen[complement], i]\n        ' },
                { blankId: 'store' },
                { text: ' = i\n    return []' }
              ]}
              blanks={{
                comp: 'target',
                cond: 'complement',
                store: 'seen[price]'
              }}
              feedback={{
                success: "Perfect! You calculate the target, check for the complement, and store the price mapping to the index.",
                error: "Not quite. Remember: calculate target - price, check for complement, and store seen[price] = i."
              }}
              onComplete={() => setCanAdvance(true)}
            />
          </div>
        );
      case 12:
        return (
          <div className={styles.stepContent}>
            <h2>Plan Before Coding</h2>
            <p>You are about to solve an independent transfer problem. Before you touch the code editor, answer these three questions to clarify your thinking.</p>
            <PlanningPrompts onComplete={() => setCanAdvance(true)} />
          </div>
        );
      case 13:
        return (
          <div className={styles.stepContent}>
            <h2>Independent Practice</h2>
            <p>A music app stores song lengths in minutes. A listener wants two songs whose combined duration exactly matches a playlist target. Return the indices of two different songs whose durations add up to the target.</p>
            <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '4px', border: '1px solid var(--border-subtle)', color: '#000', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
              Test Case 1: durations=[2, 7, 11, 15], target=9 -&gt; [0, 1]<br/>
              Test Case 2: durations=[3, 2, 4], target=6 -&gt; [1, 2]<br/>
              Test Case 3: durations=[3, 3], target=6 -&gt; [0, 1]
            </div>
            <CodeEditor 
              initialCode={`def find_songs(durations, target):\n    # 1. Initialize dictionary\n    \n    # 2. Loop through durations\n    \n        # 3. Calculate complement\n        \n        # 4. Check if complement in dict, return indices\n        \n        # 5. Store current duration and index\n        \n    return []`}
              deterministicCheck={(code) => {
                const hasDict = code.includes('{}') || code.includes('dict(');
                const hasLoop = code.includes('for');
                const hasReturn = code.includes('return');
                const hasTargetMinus = code.includes('target -');
                return hasDict && hasLoop && hasReturn && hasTargetMinus;
              }}
              onSuccess={() => setCanAdvance(true)}
            />
          </div>
        );
      case 14:
        return (
          <div className={styles.stepContent}>
            <PatternMasteryCard />
            <h3 style={{marginTop: '32px', marginBottom: '16px', color: 'var(--text-off-white)'}}>Final Reflection</h3>
            <ReflectionForm 
              onSubmit={(text) => {
                localStorage.setItem('patternforge_reflection', text);
                setCanAdvance(true);
                navigate('/completion');
              }} 
            />
          </div>
        );
      default:
        return null;
    }
  };

  const getHintsForStep = () => {
    switch (currentStep) {
      case 13:
        return [
          "Use a dictionary `seen = {}` to store the song durations you've seen so far.",
          "As you iterate through the list using `for i, duration in enumerate(durations):`, calculate the complement: `target - duration`.",
          "If the complement is in your dictionary, return `[seen[complement], i]`."
        ];
      case 11:
        return [
          "The complement is calculated using the `target`.",
          "We check if the `complement` is in our dictionary (seen).",
          "We store the current price in the dictionary: `seen[price] = i`."
        ];
      default:
        return [];
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainPanel}>
        <div className={styles.contentWrapper}>
          <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          {renderStep()}
          
          <div className={styles.navigation}>
            <button 
              className="secondary-btn" 
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </button>
            {currentStep < 14 && (
              <button 
                className="primary-btn" 
                onClick={handleNext}
                disabled={!canAdvance}
              >
                Next Step
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className={styles.sidePanel}>
        <div className={styles.sidePanelContent}>
          <h3 className={styles.sidePanelTitle}>Glossary</h3>
          <div className={styles.glossaryList}>
            {glossary.map((g, i) => (
              <div key={i} className={styles.glossaryItem}>
                <GlossaryTerm term={g.term} definition={g.def} />
              </div>
            ))}
          </div>

          <div className={styles.hintSection}>
            <HintDrawer hints={getHintsForStep()} />
          </div>
        </div>
      </div>
    </div>
  );
}
