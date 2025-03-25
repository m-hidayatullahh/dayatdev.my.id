import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Skills } from './pages/Skills';
import { Projects } from './pages/Projects';
import { Products } from './pages/Products';
import { Contact } from './pages/Contact';
import Assistant from './components/Assistant'; // Import Assistant component
import { Bot } from 'lucide-react'; // Import AI Bot icon from lucide-react
import Docs  from './pages/Docs'; // Import Docs component

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  const [isAssistantOpen, setIsAssistantOpen] = useState(false); // State to toggle Assistant

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/docs" element={<Docs />} /> {/* Add Docs route */}
          </Routes>
        </div>
        <Footer />

        {/* Floating Assistant Button */}
        <button
          onClick={() => setIsAssistantOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none flex items-center space-x-2"
        >
          <Bot className="h-6 w-6" /> {/* AI Bot Icon */}
          <span className="font-small">Tanya AI Dayat</span>
        </button>

        {/* Assistant Modal */}
        {isAssistantOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-full p-6 relative">
              <button
                onClick={() => setIsAssistantOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
              >
                ✖
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