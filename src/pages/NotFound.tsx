import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async'; 

export const NotFound = () => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Tambahkan Helmet di sini */}
      <Helmet>
      <title>404 - Halaman Tidak Ditemukan</title>
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="404 - Halaman Tidak Ditemukan" />
        <meta property="og:description" content="Halaman yang Anda coba akses tidak tersedia" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>

      {/* Konten halaman 404 */}
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-400 mb-4">404</h1>
        <p className="text-2xl font-medium text-gray-900 dark:text-white mb-4">
          Oops! Halaman tidak ditemukan
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Halaman yang Anda coba akses tidak ada atau telah dipindahkan
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </motion.div>
  );
};