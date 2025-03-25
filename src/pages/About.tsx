import React from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import { Download } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          {/* Animated Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              About Me
            </motion.h2>
            <motion.p
              className="mt-4 text-lg text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              I build exceptional and accessible digital experiences for the web. Passionate about creating solutions that are both beautiful and functional.
            </motion.p>
            <motion.p
              className="mt-4 text-lg text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              My goal is to create beautiful, functional, and user-friendly applications that solve real-world problems.
            </motion.p>
            <motion.a
              href="https://docs.google.com/document/d/1pL_IocL7LzVWW4cTwERJNAksNkO0SqbbdM5k-Ff8n5M/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Animated Image Section */}
          <motion.div
            className="mt-10 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              className="rounded-lg shadow-xl"
              src="https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=800&auto=format&fit=crop&q=60"
              alt="Profile"
              width={800}
              height={600}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};