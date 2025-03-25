import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Skills } from './pages/Skills';
import { Projects } from './pages/Projects';
import { Products } from './pages/Products';
import { Contact } from './pages/Contact';
import Assistant from './components/Assistant';
import { Bot, X, MessageCircle } from 'lucide-react';
import Docs from './pages/Docs';

function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isFloatingVisible, setIsFloatingVisible] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col">
        <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/docs" element={<Docs />} />
          </Routes>
        </div>
        <Footer />

        {/* Floating Button AI & Hide Button */}
        <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-2">
          {/* Tombol Show (💬) ketika Floating AI disembunyikan */}
          {!isFloatingVisible && (
            <button
              onClick={() => setIsFloatingVisible(true)}
              className="bg-gray-700 text-white p-3 rounded-md shadow-md hover:bg-gray-800 transition"
            >
              <MessageCircle className="h-6 w-6" />
            </button>
          )}

          {/* Floating AI Button + Hide Button */}
          {isFloatingVisible && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsFloatingVisible(false)}
                className="bg-red-600 text-white p-2 rounded-md shadow-md hover:bg-red-700 transition"
              >
                <X className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsAssistantOpen(true)}
                className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110 flex items-center space-x-2"
              >
                <Bot className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>

        {/* Assistant Modal */}
        {isAssistantOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-full p-6 relative animate-fadeIn">
              <button
                onClick={() => setIsAssistantOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              <Assistant />
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
