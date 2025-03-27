import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ExternalLink, Clock, BookOpen } from 'lucide-react';
import { blogPosts } from '../data';

const getImageUrl = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    
    if (parsedUrl.protocol === 'http:' && window.location.protocol === 'https:') {
      parsedUrl.protocol = 'https:';
    }
    
    if (parsedUrl.hostname === 'images.unsplash.com') {
      parsedUrl.searchParams.set('auto', 'format');
      parsedUrl.searchParams.set('fit', 'crop');
      parsedUrl.searchParams.set('w', '1200');
    }
    
    return parsedUrl.toString();
  } catch (error) {
    console.error('Invalid image URL:', url);
    return '/placeholder.jpg';
  }
};

const useLazyLoading = () => {
  const observer = React.useRef<IntersectionObserver>();

  const imageRef = React.useCallback((node: HTMLImageElement | null) => {
    if (!node || !node.dataset.src) return;

    const rect = node.getBoundingClientRect();
    if (
      rect.top <= window.innerHeight + 500 &&
      rect.bottom >= -500 &&
      node.dataset.src
    ) {
      node.src = node.dataset.src;
      return;
    }

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          observer.current?.unobserve(img);
        }
      });
    };

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(handleIntersection, {
      rootMargin: '500px 0px',
      threshold: 0.01,
    });

    observer.current.observe(node);
  }, []);

  return imageRef;
};

interface BlogPostProps {
  post: typeof blogPosts[0];
  animationVariants: any;
  imageRef: (node: HTMLImageElement | null) => void;
}

const BlogPost = React.memo(({ post, animationVariants, imageRef }: BlogPostProps) => {
  const [hasError, setHasError] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <motion.article
      className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
      variants={animationVariants}
    >
      <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
        <img
          ref={imageRef}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          data-src={getImageUrl(post.image)}
          alt={post.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
        
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 dark:bg-red-900/20 p-4">
            <span className="text-red-500 dark:text-red-300 text-sm text-center">
              Gagal memuat gambar
            </span>
          </div>
        )}
        
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" />
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          <Clock className="mr-2 h-4 w-4" />
          <span>{post.date} • {post.readTime}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {post.title}
          {post.featured && (
            <span className="ml-2 px-2 py-1 text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200 rounded">
              Featured
            </span>
          )}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-sm font-medium text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          to={`/blog/${post.slug}`}
          className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-500 transition-colors"
          preventScrollReset={true}
        >
          Baca selengkapnya
          <ExternalLink className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}, (prev, next) => prev.post.id === next.post.id);

export const Blog: React.FC = () => {
  const [visiblePosts, setVisiblePosts] = React.useState(3);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const imageRef = useLazyLoading();

  const categories = React.useMemo(() => {
    const allTags = blogPosts.flatMap(post => post.tags);
    return ['all', ...Array.from(new Set(allTags))];
  }, []);

  const filteredPosts = React.useMemo(() => {
    return selectedCategory === 'all' 
      ? blogPosts 
      : blogPosts.filter(post => post.tags.includes(selectedCategory));
  }, [selectedCategory]);

  const displayedPosts = filteredPosts.slice(0, visiblePosts);

  const loadMorePosts = () => {
    setIsLoading(true);
    requestAnimationFrame(() => {
      setVisiblePosts(prev => Math.min(prev + 3, filteredPosts.length));
      setIsLoading(false);
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 0.5
      }
    },
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>Blog - M.Hidayatullah | Artikel Teknologi dan Pemrograman</title>
        <meta 
          name="description" 
          content="Kumpulan artikel tentang pengembangan web, teknologi terbaru, dan best practices dalam pemrograman oleh M.Hidayatullah" 
        />
        <meta property="og:image" content={getImageUrl(blogPosts[0].image)} />
      </Helmet>

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center">
          <motion.h1
            className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="block mb-3">Kumpulan Artikel</span>
            <span className="relative inline-block">
              <span className="block text-blue-600 relative z-10 pb-2">
                M.Hidayatullah
                <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-full origin-left scale-x-105 transform transition-transform duration-300 group-hover:scale-x-110" />
              </span>
            </span>
          </motion.h1>
          <motion.p
            className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Artikel tentang pengembangan web, best practices, dan teknologi terkini
          </motion.p>
        </div>
      </motion.div>

      <motion.section
        className="py-20 bg-white dark:bg-gray-800"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12 overflow-x-auto pb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex space-x-3 min-w-max px-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setVisiblePosts(3);
                  }}
                >
                  {category === 'all' ? 'Semua Kategori' : `#${category}`}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">
            {selectedCategory === 'all' ? 'Semua Artikel' : `Kategori: ${selectedCategory}`}
          </h2>
          
          {filteredPosts.length === 0 ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-500 dark:text-gray-400">
                Tidak ada artikel yang ditemukan untuk kategori ini
              </p>
            </motion.div>
          ) : (
            <>
              <motion.div
                className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
              >
                {displayedPosts.map((post) => (
                  <BlogPost 
                    key={post.id}
                    post={post}
                    animationVariants={childVariants}
                    imageRef={imageRef}
                  />
                ))}
              </motion.div>

              {visiblePosts < filteredPosts.length && (
                <div className="text-center mt-8">
                  <button 
                    onClick={loadMorePosts}
                    disabled={isLoading}
                    className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                      isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    } shadow-sm transition-colors`}
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    {isLoading ? 'Memuat...' : 'Muat Artikel Lainnya'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </motion.section>
    </div>
  );
};