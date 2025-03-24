import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import Framer Motion
import { Github, Linkedin, Mail, ExternalLink, MessageCircle, Download } from 'lucide-react';
import { projects, skills, digitalProducts } from '../data';

export const Home: React.FC = () => {
  const handleWhatsAppCheckout = (product: typeof digitalProducts[0]) => {
    const formatRupiah = (value: number) =>
      new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);

    const message = encodeURIComponent(
      `Hi Dayat, Saya Mau Membeli Produk Berikut ${product.name} Total Harga ${formatRupiah(product.price)}`
    );
    window.open(`https://wa.me/6287715882995?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center">
          <motion.h1
            className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="block">Hi, I'm M.Hidayatullah</span>
            <span className="block text-blue-600">Web Developer</span>
          </motion.h1>
          <motion.p
            className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Building beautiful and functional web applications with modern technologies.
          </motion.p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="flex justify-center space-x-6">
              <a href="https://github.com/m-hidayatullahh" target='_blank' className="text-gray-400 hover:text-gray-500">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/dayatdev" target='_blank' className="text-gray-400 hover:text-gray-500">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="mailto:dayattdev@gmail.com" className="text-gray-400 hover:text-gray-500">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <a
              href="https://docs.google.com/document/d/1pL_IocL7LzVWW4cTwERJNAksNkO0SqbbdM5k-Ff8n5M/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* About Section */}
      <motion.section
        className="bg-white dark:bg-gray-800 py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">About Me</h2>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                I build exceptional and accessible digital experiences for the web. Passionate about creating solutions that are both beautiful and functional.
              </p>
              <div className="mt-8 space-x-4">
                <Link
                  to="/about"
                  className="inline-flex items-center text-blue-600 hover:text-blue-500"
                >
                  Learn more about me
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
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
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">
            Featured Skills
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {skills.slice(5, 9).map((skill) => (
              <motion.div
                key={skill.name}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{skill.name}</h3>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500">
                  {skill.level >= 80 ? "Expert" : skill.level >= 60 ? "Intermediate" : "Beginner"}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/skills"
              className="inline-flex items-center text-blue-600 hover:text-blue-500"
            >
              View all skills
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        className="bg-white dark:bg-gray-800 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {projects.slice(0, 2).map((project) => (
              <motion.div
                key={project.id}
                className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <img
                  className="w-full h-48 object-cover"
                  src={project.image}
                  alt={project.title}
                />
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-sm font-medium text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/projects"
              className="inline-flex items-center text-blue-600 hover:text-blue-500"
            >
              View all projects
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Products Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Digital Products
          </motion.h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {digitalProducts.slice(0, 2).map((product) => (
              <motion.div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <motion.img
                  className="w-full h-48 object-cover"
                  src={product.image}
                  alt={product.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    {product.description.length > 50
                      ? `${product.description.slice(0, 50)}...`
                      : product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {`Rp.${new Intl.NumberFormat('id-ID', { style: 'decimal' }).format(product.price)}`}
                    </p>
                    <Link
                      to="/products"
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      View Details
                    </Link>
                  </div>
                  <button
                    onClick={() => handleWhatsAppCheckout(product)}
                    className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Buy
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/products"
              className="inline-flex items-center text-blue-600 hover:text-blue-500"
            >
              View all products
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <motion.section
        className="bg-white dark:bg-gray-800 py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
            Let's Work Together
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
            Have a project in mind? Let's discuss how we can help you achieve your goals.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Get in Touch
            <Mail className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </motion.section>
    </div>
  );
};