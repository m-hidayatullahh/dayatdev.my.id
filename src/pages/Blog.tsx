import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data';

export const Blog: React.FC = () => {
  // Kelompokkan artikel berdasarkan tahun
  const postsByYear = React.useMemo(() => {
    return blogPosts.reduce((acc: Record<string, typeof blogPosts>, post) => {
      const year = new Date(post.date).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    }, {});
  }, []);

  // State untuk topik yang dipilih
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Ambil daftar topik unik dari artikel
  const topics = React.useMemo(() => {
    const allTopics = blogPosts.flatMap((post) => post.tags || []);
    return Array.from(new Set(allTopics)); // Hapus duplikasi
  }, []);

  // Filter artikel berdasarkan topik yang dipilih
  const filteredPostsByYear = React.useMemo(() => {
    if (!selectedTopic) return postsByYear;
    const filteredPosts = blogPosts.filter((post) =>
      post.tags?.includes(selectedTopic)
    );
    return filteredPosts.reduce((acc: Record<string, typeof blogPosts>, post) => {
      const year = new Date(post.date).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    }, {});
  }, [selectedTopic, postsByYear]);

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>Blog - M.Hidayatullah | Artikel Teknologi dan Pemrograman</title>
        <meta
          name="description"
          content="Kumpulan artikel tentang pengembangan web, teknologi terbaru, dan best practices dalam pemrograman oleh M.Hidayatullah"
        />
      </Helmet>

      {/* Kontainer Utama */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-8">
        {/* Daftar Artikel */}
        <div className="flex-1">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
              Blog
            </h1>
            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Kumpulan artikel tentang pengembangan web, teknologi terbaru, dan best practices dalam pemrograman.
            </p>
          </div>

          {/* Tampilkan artikel berdasarkan tahun */}
          <div className="space-y-12">
            {Object.keys(filteredPostsByYear)
              .sort((a, b) => parseInt(b) - parseInt(a)) // Urutkan tahun dari terbaru ke terlama
              .map((year) => (
                <div key={year}>
                  {/* Header Tahun */}
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    {year}
                  </h2>

                  {/* Daftar Artikel */}
                  <div className="space-y-4">
                    {filteredPostsByYear[year].map((post) => (
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
        </div>

        {/* Filter Topik */}
        <aside className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow h-fit">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Filter Topik
          </h3>
          <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setSelectedTopic(null)}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    !selectedTopic
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Semua Topik
                </button>
              </li>
              {topics.map((topic) => (
                <li key={topic}>
                  <button
                    onClick={() => setSelectedTopic(topic)}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      selectedTopic === topic
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {topic}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};