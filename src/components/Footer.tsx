import React from 'react';
import { Coffee, Github, Linkedin, Mail, Youtube } from 'lucide-react'; // Import icons

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Footer Text */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} M. Hidayatullah. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {/* GitHub Link */}
          <a
            href="https://github.com/m-hidayatullahh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center"
          >
            <Github className="mr-2 h-5 w-5" />
            GitHub
          </a>
          {/* LinkedIn Link */}
          <a
            href="https://linkedin.com/in/m-hidayatullahh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center"
          >
            <Linkedin className="mr-2 h-5 w-5" />
            LinkedIn
          </a>
          {/* Email Link */}
          <a
            href="mailto:dayattdev@gmail.com"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center"
          >
            <Mail className="mr-2 h-5 w-5" />
            Email
          </a>
          {/* Trakteer Link */}
          <a
            href="https://trakteer.id/m_hidayatullah2/tip"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center"
          >
            <Coffee className="mr-2 h-5 w-5" />
            Trakteer
          </a>
          {/* YouTube Link */}
          <a
            href="https://www.youtube.com/@dayattttt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center"
          >
            <Youtube className="mr-2 h-5 w-5" />
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
};