import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Skills } from './pages/Skills';
import { Projects } from './pages/Projects';
import { Products } from './pages/Products';
import { Contact } from './pages/Contact';
import Docs from './pages/Docs';
import { NotFound } from './pages/NotFound';
import { NoInternet } from './pages/NoInternet'; // Import halaman NoInternet
import Assistant from './components/Assistant';
import { Bot } from 'lucide-react';
import { Blog } from './pages/Blog'; // Import halaman Blog
import { DetailBlog } from './pages/DetailBlog'; // Import halaman Blog

// Komponen Error Boundary
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1 className="text-center text-red-600">Terjadi kesalahan. Silakan muat ulang halaman.</h1>;
    }
    return this.props.children;
  }
}

function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      console.log("✅ Koneksi internet aktif");
      setIsOnline(true);
    };
    const handleOffline = () => {
      console.log("❌ Koneksi internet terputus");
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  console.log("Status isOnline:", isOnline); // Debugging

  return (
    <HelmetProvider>
      <Router>
        <ErrorBoundary>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col">
            <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

            {/* Jika offline, tampilkan halaman NoInternet */}
            {!isOnline ? (
              <NoInternet />
            ) : (
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<Navigate to="/m-hidayatullah" replace />} />
                  <Route path="/m-hidayatullah" element={<About />} />
                  <Route path="/skills" element={<Skills />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:slug" element={<Projects />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:slug" element={<Products />} />
                  <Route path="/blog/:slug" element={<DetailBlog />} />
                  <Route path="/blogs" element={<Blog />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/docs" element={<Docs />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            )}

            <Footer />

            {/* Floating Assistant Button */}
            <button
              onClick={() => setIsAssistantOpen(true)}
              className="fixed bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none flex items-center space-x-1 text-sm"
            >
              <Bot className="h-6 w-6" />
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
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
}

export default App;
