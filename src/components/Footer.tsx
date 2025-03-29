import React from 'react';
import { Coffee, Github, Linkedin, Mail, Youtube, Circle } from 'lucide-react'; // Import icons
import { motion } from 'framer-motion'; // Import animation library

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
          <a
            href="https://github.com/m-hidayatullahh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center"
          >
            <Github className="mr-2 h-5 w-5" />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/m-hidayatullahh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center"
          >
            <Linkedin className="mr-2 h-5 w-5" />
            LinkedIn
          </a>
          <a
            href="mailto:dayattdev@gmail.com"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center"
          >
            <Mail className="mr-2 h-5 w-5" />
            Email
          </a>
          <a
            href="https://trakteer.id/m_hidayatullah2/tip"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center"
          >
            <Coffee className="mr-2 h-5 w-5" />
            Trakteer
          </a>
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

        {/* Status Link with Animation */}
        <a
          href="https://stats.uptimerobot.com/7OoOMAFOSx/798876891"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center mt-6 mx-auto w-fit px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="relative"
          >
            <Circle className="h-4 w-4 mr-2 text-green-500" fill="currentColor" />
          </motion.div>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">All Systems Operational</span>
        </a>
      </div>
    </footer>
  );
};