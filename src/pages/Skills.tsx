import React from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import { skills } from '../data';
import { Code, Server, Palette } from 'lucide-react';

const iconMap: { [key: string]: React.ReactNode } = {
  react: <Code />,
  code: <Code />,
  server: <Server />,
  palette: <Palette />
};

export const Skills: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.h2
          className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Skills & Expertise
        </motion.h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <motion.div
                  className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-md bg-blue-500 text-white"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {iconMap[skill.icon]}
                </motion.div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{skill.name}</h3>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <motion.div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${skill.level}%` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                ></motion.div>
              </div>
              <motion.span
                className="text-sm text-gray-500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {skill.level >= 80 ? "Expert" : skill.level >= 60 ? "Intermediate" : "Beginner"}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};