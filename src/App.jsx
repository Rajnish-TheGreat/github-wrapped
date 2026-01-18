import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAllUserData } from './services/github';
import { processGitHubData } from './utils/dataProcessor';
import { SlideIntro, SlideStats, SlideLanguages, SlideActivity, SlidePersonality } from './components/Slides';
import html2canvas from 'html2canvas';

function App() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [wrappedData, setWrappedData] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await fetchAllUserData(username);
      const processed = processGitHubData(data);
      setWrappedData(processed);
      setCurrentSlide(0);
    } catch (err) {
      setError(err.message || 'Failed to fetch GitHub data. Please check the username and try again.');
    } finally {
      setLoading(false);
    }
  };

  const slides = wrappedData ? [
    <SlideIntro key="intro" user={wrappedData.user} />,
    <SlideStats key="stats" stats={wrappedData.stats} />,
    <SlideLanguages key="languages" languages={wrappedData.insights.topLanguages} />,
    <SlideActivity key="activity" insights={wrappedData.insights} />,
    <SlidePersonality key="personality" personality={wrappedData.personality} user={wrappedData.user} />,
  ] : [];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!wrappedData) return;

    const totalSlides = wrappedData ? 5 : 0;

    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') {
        setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [wrappedData]);

  const handleShare = async () => {
    const element = document.getElementById('wrapped-slide');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: null,
        scale: 2,
      });
      
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `github-wrapped-${username}-slide-${currentSlide + 1}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      });
    } catch (err) {
      console.error('Failed to capture screenshot:', err);
      alert('Failed to save image. Please try again.');
    }
  };

  const resetView = () => {
    setWrappedData(null);
    setUsername('');
    setCurrentSlide(0);
  };

  if (wrappedData) {
    return (
      <div className="relative w-full min-h-screen bg-gray-900">
        <div id="wrapped-slide" className="w-full min-h-screen">
          <AnimatePresence mode="wait">
            {slides[currentSlide]}
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex gap-4 items-center">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="px-6 py-3 bg-white/20 backdrop-blur-lg text-white rounded-full font-semibold disabled:opacity-30 hover:bg-white/30 transition-all"
          >
            ← Previous
          </button>
          
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white w-8' : 'bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="px-6 py-3 bg-white/20 backdrop-blur-lg text-white rounded-full font-semibold disabled:opacity-30 hover:bg-white/30 transition-all"
          >
            Next →
          </button>
        </div>

        {/* Action Buttons */}
        <div className="fixed top-8 right-8 z-50 flex gap-4">
          <button
            onClick={handleShare}
            className="px-6 py-3 bg-white/20 backdrop-blur-lg text-white rounded-full font-semibold hover:bg-white/30 transition-all flex items-center gap-2"
          >
            <span>📸</span> Save Image
          </button>
          <button
            onClick={resetView}
            className="px-6 py-3 bg-white/20 backdrop-blur-lg text-white rounded-full font-semibold hover:bg-white/30 transition-all"
          >
            ← Back
          </button>
        </div>

        {/* Keyboard navigation hint */}
        <div className="fixed bottom-8 right-8 text-white/60 text-sm">
          Use ← → arrow keys to navigate
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full"
      >
        <motion.h1
          className="text-5xl font-extrabold mb-4 text-center text-gradient"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          GitHub Wrapped
        </motion.h1>
        <motion.p
          className="text-gray-600 text-center mb-8 text-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Discover your coding journey
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
              GitHub Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="octocat"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors text-lg"
              required
              disabled={loading}
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Loading...
              </span>
            ) : (
              'Generate My Wrapped 🎉'
            )}
          </button>
        </form>

        <motion.div
          className="mt-8 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>Made with ❤️ for Hack Club</p>
          <p className="mt-1">Uses public GitHub data</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
