import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Github, Linkedin, Mail, ExternalLink, MessageCircle, Download, Code, Server, Palette, Database, Cloud, Smartphone } from 'lucide-react';
import { projects, skills, digitalProducts, blogPosts } from '../data';
import BlogPreview from '../components/BlogPreview';

const iconMap: { [key: string]: React.ReactNode } = {
  frontend: <Code className="h-6 w-6" />,
  backend: <Server className="h-6 w-6" />,
  design: <Palette className="h-6 w-6" />,
  database: <Database className="h-6 w-6" />,
  devops: <Cloud className="h-6 w-6" />,
  mobile: <Smartphone className="h-6 w-6" />
};

const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const siteUrl = import.meta.env.VITE_APP_SITE_URL || 'https://dayatdev.my.id/';

export const Home: React.FC = () => {
  const handleWhatsAppCheckout = (product: typeof digitalProducts[0]) => {
    const formatRupiah = (value: number) =>
      new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);

    const message = encodeURIComponent(
      `Hi Dayat, Saya Mau Membeli Produk Berikut ${product.name} Total Harga ${formatRupiah(product.price)}\n Link Produk Berikut: ${siteUrl}/products/${generateSlug(product.name)}`
    );
    window.open(`https://wa.me/6287715882995?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>M.Hidayatullah - Software Engineer</title>
        <meta 
          name="description" 
          content="Professional portfolio of M.Hidayatullah - Software Engineer specializing in React, TypeScript, and Node.js development. Showcasing web development projects and technical expertise." 
        />
        <meta property="og:title" content="M.Hidayatullah - Software Engineer" />
        <meta 
          property="og:description" 
          content="Experienced software engineer showcasing modern web development projects and technical skills." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

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
            <span className="block text-blue-600">Software Engineer</span>
          </motion.h1>
          <motion.p
            className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Building scalable and maintainable web applications with modern tech stack
          </motion.p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="flex justify-center space-x-6">
              <a href="https://github.com/m-hidayatullahh" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/dayatdev" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
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
              href="https://docs.google.com/document/d/14a_Ju-babKOoVg7wE4Bwdpt5m3Z1RbDn_FPHlHMZnh0/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
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
                Full-stack developer with focus on creating efficient and user-friendly web solutions. 
                Specialized in building performant applications with modern web technologies.
              </p>
              <div className="mt-8 space-x-4">
                <Link
                  to="/about"
                  className="inline-flex items-center text-blue-600 hover:text-blue-500 transition-colors"
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
                src="https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=800&auto=format" 
                alt="M.Hidayatullah Profile" 
                width="800" 
                height="533" 
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

     {/* Skills Section */}
<motion.section
  className="py-20 bg-gray-50 dark:bg-gray-900"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">
      Technical Expertise
    </h2>
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {skills.slice(0, 6).map((skill, index) => (
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
                {skill.category || "No category available"}
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
              {skill.technologies?.join(" • ") || "No related technologies"}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
    <div className="text-center mt-8">
      <Link
        to="/skills"
        className="inline-flex items-center text-blue-600 hover:text-blue-500 transition-colors"
      >
        View full technical stack
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
              <Link 
                to={`/projects/${generateSlug(project.title)}`}
                key={project.id}
              >
                <motion.div
                  className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
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
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/projects"
              className="inline-flex items-center text-blue-600 hover:text-blue-500 transition-colors"
            >
              Explore all projects
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Products Section */}
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
                className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
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
                    <div>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <del className="text-red-500 text-lg">
                          {`Rp${new Intl.NumberFormat('id-ID').format(product.originalPrice)}`}
                        </del>
                      )}
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {`Rp${new Intl.NumberFormat('id-ID').format(product.price)}`}
                      </p>
                    </div>
                    <Link
                      to={`/products/${generateSlug(product.name)}`}
                      className="text-blue-600 hover:underline transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                  <button
                    onClick={() => handleWhatsAppCheckout(product)}
                    className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Purchase via WhatsApp
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/products"
              className="inline-flex items-center text-blue-600 hover:text-blue-500 transition-colors"
            >
              Browse all products
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
<motion.section
  className="bg-white dark:bg-gray-800 py-20 pb-24 relative z-10"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
  transition={{ duration: 0.8 }}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <motion.h2
        className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Latest Articles
      </motion.h2>
      <motion.p
        className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Explore technical insights and best practices in modern web development
      </motion.p>
    </div>

    {/* Group articles by year */}
    <div className="space-y-12">
      {Object.keys(blogPosts.reduce((acc: Record<string, typeof blogPosts>, post) => {
        const year = new Date(post.date).getFullYear().toString();
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(post);
        return acc;
      }, {}))
        .sort((a, b) => parseInt(b) - parseInt(a)) // Sort years descending
        .slice(0, 1) // Only show the latest year
        .map((year) => (
          <div key={year}>
            {/* Header Tahun */}
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {year}
            </h3>

            {/* Daftar Artikel */}
            <div className="space-y-4">
              {blogPosts
                .filter((post) => new Date(post.date).getFullYear().toString() === year)
                .slice(0, 3) // Limit to 3 articles
                .map((post) => (
                  <div
                    key={post.id}
                    className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4"
                  >
                    {/* Judul Artikel */}
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-lg font-semibold text-gray-900 dark:text-white hover:underline"
                    >
                      {post.title}
                    </Link>

                    {/* Tanggal Artikel */}
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(post.date).toLocaleDateString('id-ID', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>

    <motion.div
      className="text-center mt-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      viewport={{ once: true }}
    >
      <Link
        to="/blogs"
        className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <span>Explore All Articles</span>
        <ExternalLink className="ml-3 h-5 w-5" />
      </Link>
    </motion.div>
  </div>
</motion.section>

     {/* Contact Section */}
<motion.section
  className="bg-gray-50 dark:bg-gray-900 py-20 pt-24 relative z-0 border-t border-gray-200 dark:border-gray-700"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <motion.div
      className="mb-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
        Let's <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Collaborate</span>
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Ready to bring your ideas to life? Let's create something extraordinary together
      </p>
    </motion.div>

    <motion.div
      initial={{ scale: 0.95 }}
      whileInView={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <Link
        to="/contact"
        className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-2xl text-white bg-green-600 hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl dark:shadow-gray-800/30"
      >
        <Mail className="mr-3 h-6 w-6" />
        Get in Touch
        <span className="ml-2 animate-pulse">👉</span>
      </Link>
    </motion.div>

    <motion.div
  className="mt-12 text-gray-600 dark:text-gray-300 text-sm"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ delay: 0.5 }}
>
  <div className="flex items-center justify-center space-x-2 mb-4">
    <span className="h-px w-8 bg-gray-400 dark:bg-gray-600"></span>
    <p className="font-medium text-gray-500 dark:text-gray-400 animate-pulse">
      Prefer direct contact?
    </p>
    <span className="h-px w-8 bg-gray-400 dark:bg-gray-600"></span>
  </div>

  <div className="flex justify-center space-x-6">
    <motion.a
      href="mailto:dayattdev@gmail.com"
      className="flex items-center space-x-2 p-3 rounded-full bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 group"
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative">
        <Mail className="h-6 w-6 text-blue-600 group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300 transition-colors" />
        <span className="absolute -right-1 -top-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
        </span>
      </div>
      <span className="text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        Email Me
      </span>
    </motion.a>

    <div className="border-l border-gray-300 dark:border-gray-600 h-8 my-auto"></div>

    <motion.a
      href="https://wa.me/6287715882995?text=Hi%20Dayat,%20I%20want%20to%20collaborate%20with%20you"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 p-3 rounded-full bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 group"
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative">
        <MessageCircle className="h-6 w-6 text-green-600 group-hover:text-green-700 dark:text-green-400 dark:group-hover:text-green-300 transition-colors" />
        <span className="absolute -right-1 -top-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
        </span>
      </div>
      <span className="text-gray-700 dark:text-gray-200 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
        WhatsApp
      </span>
    </motion.a>
  </div>
</motion.div>
  </div>
</motion.section>
    </div>
  );
};