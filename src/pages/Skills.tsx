import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Palette, Database, Cloud, Smartphone, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { skills } from '../data';

const iconMap: { [key: string]: React.ReactNode } = {
  frontend: <Code className="h-6 w-6" />,
  backend: <Server className="h-6 w-6" />,
  design: <Palette className="h-6 w-6" />,
  database: <Database className="h-6 w-6" />,
  devops: <Cloud className="h-6 w-6" />,
  mobile: <Smartphone className="h-6 w-6" />
};

export const Skills: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>Skills - M.Hidayatullah | Software Engineer</title>
        <meta 
          name="description" 
          content="Technical skills and expertise of M.Hidayatullah - Full Stack Developer with proficiency in modern web technologies including React, Node.js, and cloud platforms" 
        />
        <meta property="og:title" content="Technical Skills - M.Hidayatullah" />
        <meta 
          property="og:description" 
          content="Detailed overview of technical skills and professional expertise in software development" 
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "M.Hidayatullah",
            "hasOccupation": {
              "@type": "Occupation",
              "name": "Software Engineer",
              "skills": skills.map(skill => skill.name)
            }
          })}
        </script>
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

        <motion.h2
          className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Keahlian Teknis
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="flex items-start mb-4">
                <motion.div
                  className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {iconMap[skill.icon] || <Code className="h-6 w-6" />}
                </motion.div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {skill.category || 'Kategori tidak tersedia'}
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tingkat Penguasaan
                  </span>
                  <span className="text-sm text-blue-600 dark:text-blue-400">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                    style={{ width: `${skill.level}%` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                  {skill.technologies?.join(' • ') || 'Teknologi terkait tidak tersedia'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};