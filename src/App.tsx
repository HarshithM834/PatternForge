import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LessonPage } from './pages/LessonPage';
import { CompletionPage } from './pages/CompletionPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/lesson" element={<LessonPage />} />
      <Route path="/completion" element={<CompletionPage />} />
    </Routes>
  );
}

export default App;
