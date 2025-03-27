import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ExternalLink } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogPreviewProps {
  post: BlogPost;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ post }) => {
  const formatDateInfo = () => {
    return `${post.date} • ${post.readTime}`;
  };

  return (
    <motion.article
      className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.4 }}
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {post.featured && (
          <div className="absolute top-2 right-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-6">
        {/* Metadata */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <Clock className="mr-2 h-4 w-4 flex-shrink-0" />
          <span>{formatDateInfo()}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium text-blue-800 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Read More Link */}
        <Link
          to={`/blog/${post.slug || post.id}`}
          className="inline-flex items-center font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          Baca Selengkapnya
          <ExternalLink className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
};

export default BlogPreview;