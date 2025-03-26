import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { projects } from '../data';
import { SearchBar } from '../components/SearchBar';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export const Projects: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    if (slug) {
      const project = projects.find(p => generateSlug(p.title) === slug);
      setSelectedProject(project || null);
    } else {
      setSelectedProject(null);
    }
  }, [slug]);

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>{selectedProject ? `${selectedProject.title} | Projects` : 'Projects | M.Hidayatullah'}</title>
        <meta 
          name="description" 
          content={
            selectedProject 
              ? `${selectedProject.description.substring(0, 160)}...` 
              : "Portfolio projects showcase by M.Hidayatullah - Software Engineer specializing in web development"
          }
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:title" content={selectedProject ? selectedProject.title : 'My Projects Portfolio'} />
        <meta 
          property="og:description" 
          content={selectedProject ? selectedProject.description : "Collection of software development projects and case studies"} 
        />
        <meta property="og:type" content={selectedProject ? "article" : "website"} />
        <meta 
          property="og:url" 
          content={`https://dayatdev.my.id/projects/${selectedProject ? generateSlug(selectedProject.title) : ''}`} 
        />
        <meta 
          property="og:image" 
          content={selectedProject ? selectedProject.image : "https://dayatdev.my.id/og-projects.jpg"} 
        />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={selectedProject ? selectedProject.title : 'My Projects'} />
        <meta 
          name="twitter:description" 
          content={selectedProject ? selectedProject.description.substring(0, 160) : "Explore my technical projects and implementations"} 
        />
        <meta 
          name="twitter:image" 
          content={selectedProject ? selectedProject.image : "https://dayatdev.my.id/og-projects.jpg"} 
        />

        {/* Schema Markup */}
        {selectedProject && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "name": selectedProject.title,
              "description": selectedProject.description,
              "image": selectedProject.image,
              "author": {
                "@type": "Person",
                "name": "M.Hidayatullah"
              },
              "datePublished": "2023-01-01", // Ganti dengan tanggal publish sebenarnya
              "keywords": selectedProject.tags.join(', ')
            })}
          </script>
        )}
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
          transition={{ duration: 0.8 }}
        >
          Projects Portfolio
        </motion.h2>

        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search projects..."
          />
        </motion.div>

        {filteredProjects.length === 0 ? (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center p-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              <svg
                className="flex-shrink-0 w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <span className="sr-only">Info</span>
              <div className="ms-3 text-sm font-medium">
                Sorry, no projects found matching your search.
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => navigate(`/projects/${generateSlug(project.title)}`)}
              >
                <motion.img
                  className="w-full h-48 object-cover"
                  src={project.image}
                  alt={project.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    {project.description.length > 100
                      ? `${project.description.slice(0, 100)}...`
                      : project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        className="px-2 py-1 text-sm font-medium text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 rounded"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full p-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <img
                className="w-full h-64 object-cover rounded-md mb-4"
                src={selectedProject.image}
                alt={`Screenshot of ${selectedProject.title}`}
                loading="lazy"
              />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedProject.title}
              </h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                {selectedProject.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-sm font-medium text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <a
                  href={selectedProject.link}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
                <a
                  href={selectedProject.githubLink}
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source Code
                  <Github className="ml-2 h-4 w-4" />
                </a>
                <button
                  onClick={() => navigate('/projects')}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};