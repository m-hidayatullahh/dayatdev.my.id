import React from 'react';
import { Download } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              About Me
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            I build exceptional and accessible digital experiences for the web. Passionate about creating solutions that are both beautiful and functional.
            </p>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              My goal is to create beautiful, functional, and user-friendly applications that solve real-world problems.
            </p>
            <a
             href="https://docs.google.com/document/d/1pL_IocL7LzVWW4cTwERJNAksNkO0SqbbdM5k-Ff8n5M/edit?usp=sharing"
             target='_blank'
             rel='noopener noreferrer'
              download
              className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </a>
          </div>
          <div className="mt-10 lg:mt-0">
            <img
              className="rounded-lg shadow-xl"
              src="https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=800&auto=format&fit=crop&q=60"
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </div>
  );
};