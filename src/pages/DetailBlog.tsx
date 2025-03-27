import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, Clock, BookOpen, Copy,
  Facebook, Twitter, Linkedin, Link as LinkIcon 
} from 'lucide-react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import php from 'react-syntax-highlighter/dist/esm/languages/prism/php';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import { blogPosts, BlogPost } from '../data';

// Custom WhatsApp Icon
const WhatsAppIcon = () => (
  <svg 
    viewBox="0 0 32 32" 
    className="w-5 h-5 fill-current text-white"
    aria-hidden="true"
  >
    <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39-.406 0-.782-.682-2.068-.682-1.288 0-1.686.682-2.068.682-.434 0-1.148-1.39-1.518-1.39-.372 0-.785.62-.785 1.634 0 .684.312 1.465.682 2.134.372.664.84 1.248 1.352 1.73.682.682 1.518 1.248 2.48 1.248.963 0 1.8-.566 2.48-1.248.514-.482.98-1.066 1.352-1.73.37-.67.682-1.45.682-2.134 0-1.014-.413-1.634-.785-1.634zm-3.65-12.7c-5.258 0-9.523 4.265-9.523 9.523 0 1.73.47 3.42 1.353 4.89L6.3 25.075l4.32-1.416a9.47 9.47 0 0 0 4.522 1.16c5.258 0 9.523-4.265 9.523-9.523S20.718 4.505 15.46 4.505zm0 16.32a6.79 6.79 0 0 1-3.42-.916l-.245-.146-2.55.836.683-2.49-.16-.254a6.797 6.797 0 0 1-1.067-3.64c0-3.75 3.05-6.8 6.8-6.8 3.75 0 6.8 3.05 6.8 6.8s-3.05 6.8-6.8 6.8z"/>
  </svg>
);

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('sql', sql);

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

export const DetailBlog: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = React.useState<BlogPost | undefined>();
  const [relatedPosts, setRelatedPosts] = React.useState<BlogPost[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);
  const [copiedLink, setCopiedLink] = React.useState(false);

  React.useEffect(() => {
    const foundPost = blogPosts.find(p => p.slug === slug);
    if (foundPost) {
      setPost(undefined);
      setTimeout(() => {
        setPost(foundPost);
        const related = blogPosts.filter(p => 
          foundPost.relatedPosts?.includes(p.id) && p.id !== foundPost.id
        );
        setRelatedPosts(related);
      }, 50);
    }
    setLoading(false);
  }, [slug]);

  const handleCopy = (code: string, language: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(language);
      setTimeout(() => setCopiedCode(null), 2000);
    });
  };

  const handleSocialShare = (platform: string) => {
    const shareUrl = window.location.href;
    const title = post?.title || '';
    const hashtags = post?.tags.join(',') || '';

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}&hashtags=${hashtags}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + shareUrl)}`
    };

    window.open(urls[platform as keyof typeof urls], '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const parseContent = (content: string) => {
    const codeBlockRegex = /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g;
    return content.split('\n').map((line, index) => {
      const matches = [...line.matchAll(codeBlockRegex)];
      
      if (matches.length > 0) {
        return matches.map((match, matchIndex) => {
          const [fullMatch, language, code] = match;
          const formattedCode = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>');

          return (
            <div key={`${index}-${matchIndex}`} className="relative my-6 group">
              <div className="flex justify-between items-center bg-gray-800 px-4 py-2 rounded-t-lg">
                <span className="text-sm text-gray-300">{language}</span>
                <button
                  onClick={() => handleCopy(formattedCode, language)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <SyntaxHighlighter
                language={language}
                style={atomDark}
                showLineNumbers
                customStyle={{
                  margin: 0,
                  borderRadius: 0,
                  borderBottomLeftRadius: '0.5rem',
                  borderBottomRightRadius: '0.5rem',
                  background: '#2d2d2d',
                  fontSize: '0.875rem',
                  padding: '1rem'
                }}
                codeTagProps={{
                  style: {
                    fontFamily: 'Fira Code, monospace',
                    lineHeight: '1.5',
                  }
                }}
              >
                {formattedCode}
              </SyntaxHighlighter>
              {copiedCode === language && (
                <motion.div
                  className="absolute right-4 top-14 bg-green-500 text-white px-3 py-1 rounded-md text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  Copied!
                </motion.div>
              )}
            </div>
          );
        });
      }

      return (
        <div
          key={index}
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ 
            __html: line
              .replace(/<pre>/g, '<div class="code-block">')
              .replace(/<\/pre>/g, '</div>')
          }}
        />
      );
    });
  };

  const ShareButton = ({ platform, color, icon }: { 
    platform: string, 
    color: string, 
    icon: React.ReactNode 
  }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
      style={{ backgroundColor: color }}
      onClick={() => handleSocialShare(platform)}
      aria-label={`Share to ${platform}`}
    >
      {icon}
      <span className="text-white font-medium capitalize">{platform}</span>
    </motion.button>
  );

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse text-gray-500 dark:text-gray-400">
          Loading article...
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            404 - Article Not Found
          </h1>
          <Link
            to="/blogs"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>{`M.Hidayatullah's Blog - ${post.title}`}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="M.Hidayatullah" />
      </Helmet>

      {/* Floating Share Buttons (Desktop) */}
      <motion.div 
        className="hidden md:flex flex-col gap-3 fixed left-4 top-1/3 z-10"
        initial={{ x: -20 }}
        animate={{ x: 0 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full shadow-lg bg-[#1877F2]"
          onClick={() => handleSocialShare('facebook')}
        >
          <Facebook className="h-5 w-5 text-white" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full shadow-lg bg-[#1DA1F2]"
          onClick={() => handleSocialShare('twitter')}
        >
          <Twitter className="h-5 w-5 text-white" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full shadow-lg bg-[#0A66C2]"
          onClick={() => handleSocialShare('linkedin')}
        >
          <Linkedin className="h-5 w-5 text-white" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full shadow-lg bg-[#25D366]"
          onClick={() => handleSocialShare('whatsapp')}
        >
          <WhatsAppIcon />
        </motion.button>
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          to="/blogs"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          All Articles
        </Link>

        <motion.article
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
            <Clock className="mr-2 h-4 w-4" />
            <span>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
              {' • '}
              {post.readTime}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {post.title}
            {post.featured && (
              <span className="ml-4 px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full">
                Featured
              </span>
            )}
          </h1>

          <img
            src={getImageUrl(post.image)}
            alt={post.title}
            className="w-full h-64 object-cover rounded-xl mb-8 shadow-lg"
            loading="lazy"
          />

          {/* Share Section */}
          <motion.div 
            className="mb-8 py-6 border-y border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex flex-col space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Bagikan Artikel
              </h3>
              
              <div className="flex flex-wrap gap-3">
                <ShareButton 
                  platform="facebook" 
                  color="#1877F2" 
                  icon={<Facebook className="h-5 w-5" />}
                />
                <ShareButton
                  platform="twitter"
                  color="#1DA1F2"
                  icon={<Twitter className="h-5 w-5" />}
                />
                <ShareButton
                  platform="linkedin"
                  color="#0A66C2"
                  icon={<Linkedin className="h-5 w-5" />}
                />
                <ShareButton
                  platform="whatsapp"
                  color="#25D366"
                  icon={<WhatsAppIcon />}
                />
                
                <motion.button
                  onClick={handleCopyLink}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <LinkIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <span className="text-gray-700 dark:text-gray-300">Salin Tautan</span>
                  {copiedLink && (
                    <motion.span
                      className="text-green-500 ml-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Tersalin!
                    </motion.span>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="prose dark:prose-invert max-w-none">
            {parseContent(post.content)}
          </div>
        </motion.article>

        {relatedPosts.length > 0 && (
          <motion.div 
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Related Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <motion.div
                  key={relatedPost.id}
                  whileHover={{ y: -5 }}
                  className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link 
                    to={`/blog/${relatedPost.slug}`}
                    className="block"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    <div className="relative h-40 bg-gray-200 dark:bg-gray-700">
                      <img
                        src={getImageUrl(relatedPost.image)}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>{relatedPost.date}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 line-clamp-2 text-sm">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link
            to="/blogs"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <BookOpen className="mr-2 h-5 w-5" />
            View More Articles
          </Link>
        </div>
      </motion.div>
    </div>
  );
};