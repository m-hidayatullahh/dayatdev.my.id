import React from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      {/* SEO Metadata */}
      <Helmet>
        <title>About - M.Hidayatullah | Software Engineer</title>
        <meta 
          name="description" 
          content="Professional background and skills of M.Hidayatullah - Experienced Software Engineer specializing in full stack web development" 
        />
        <meta property="og:title" content="About - M.Hidayatullah | Software Engineer" />
        <meta 
          property="og:description" 
          content="Learn more about M.Hidayatullah's technical expertise and professional journey in software development" 
        />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://dayatdev.my.id/about" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-500 dark:text-blue-400"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Kembali ke Beranda
          </Link>
        </div>
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
              Professional Journey
            </motion.h2>
            <motion.p
              className="mt-4 text-lg text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              With 3+ years of experience in software development, I specialize in creating robust web applications 
              using modern technologies like React, TypeScript, and Node.js. My focus is on building scalable 
              solutions that prioritize both performance and user experience.
            </motion.p>
            <motion.p
              className="mt-4 text-lg text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              I believe in continuous learning and actively contribute to open-source projects. My development 
              philosophy centers around clean architecture, test-driven development, and CI/CD best practices.
            </motion.p>
            <motion.a
              href="https://docs.google.com/document/d/1pL_IocL7LzVWW4cTwERJNAksNkO0SqbbdM5k-Ff8n5M/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Download className="mr-2 h-5 w-5" />
              Download Full CV
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
              alt="M.Hidayatullah Professional Profile"
              width={800}
              height={600}
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};