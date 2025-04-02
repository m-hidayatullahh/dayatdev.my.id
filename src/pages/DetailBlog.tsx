import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Import tema Prism.js
import 'prismjs/components/prism-typescript'; // Dukungan untuk TypeScript
import { blogPosts, BlogPost } from '../data';

export const DetailBlog: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = React.useState<BlogPost | undefined>();
  const [relatedPosts, setRelatedPosts] = React.useState<BlogPost[]>([]);
  const [copiedLink, setCopiedLink] = React.useState(false);

  React.useEffect(() => {
    const foundPost = blogPosts.find((p) => p.slug === slug);
    setPost(foundPost);

    if (foundPost) {
      const related = blogPosts.filter(
        (p) => foundPost.relatedPosts?.includes(p.id) && p.id !== foundPost.id
      );
      setRelatedPosts(related);
    }
  }, [slug]);

  React.useEffect(() => {
    // Highlight all code blocks after content is rendered
    Prism.highlightAll();
  }, [post?.content]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  // Add Utterances script for comments
  React.useEffect(() => {
    const commentsSection = document.getElementById('comments');
    if (commentsSection) {
      commentsSection.innerHTML = ''; // Hapus skrip sebelumnya jika ada
      const script = document.createElement('script');
      script.src = 'https://utteranc.es/client.js';
      script.setAttribute('repo', 'm-hidayatullahh/comment'); // Ganti dengan repo GitHub Anda
      script.setAttribute('issue-term', 'pathname'); // Gunakan pathname untuk menghubungkan komentar ke halaman
      script.setAttribute('theme', 'github-dark'); // Tema komentar
      script.crossOrigin = 'anonymous';
      script.async = true;
      commentsSection.appendChild(script);
    }
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Artikel tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <Helmet>
        <title>{`M.Hidayatullah Blog - ${post.title}`}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        {/* Konten Utama */}
        <div className="flex-1 max-h-[80vh] overflow-y-auto pr-4">
          <Link
            to="/blogs"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Articles
          </Link>

          <article>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{post.title}</h1>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
              <Clock className="mr-2 h-4 w-4" />
              <span>{post.date} • {post.readTime}</span>
            </div>

            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg mb-8 shadow-lg"
            />

            <div className="prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bagikan Artikel:</h3>
              <div className="flex items-center space-x-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?url=${window.location.href}&title=${post.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-900"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <button
                  onClick={handleCopyLink}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <LinkIcon className="h-6 w-6" />
                </button>
                {copiedLink && (
                  <span className="text-sm text-green-500">Link copied!</span>
                )}
              </div>
            </div>
          </article>

          {/* Comments Section */}
          <div id="comments" className="mt-12"></div>
        </div>

        {/* Artikel Terkait */}
        <aside className="w-full lg:w-1/3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Artikel Terkait</h3>
          <div className="space-y-4">
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                to={`/blog/${related.slug}`}
                className="block p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition"
              >
                <h4 className="text-md font-semibold text-gray-900 dark:text-white">{related.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{related.excerpt}</p>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};