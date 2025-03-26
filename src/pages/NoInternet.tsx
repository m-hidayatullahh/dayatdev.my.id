import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { WifiOff, RefreshCw } from "lucide-react";

export const NoInternet = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Koneksi Terputus</title>
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="Koneksi Terputus" />
        <meta property="og:description" content="Anda sedang offline. Periksa kembali koneksi internet Anda." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>

      {/* Ikon & Animasi */}
      <motion.div
        className="bg-red-100 dark:bg-red-800 p-6 rounded-full mb-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, type: "spring" }}
      >
        <WifiOff className="h-16 w-16 text-red-600 dark:text-red-300" />
      </motion.div>

      {/* Judul & Deskripsi */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Anda Sedang Offline
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Periksa koneksi internet Anda dan coba lagi.
      </p>

      {/* Tombol Reload */}
      <motion.button
        onClick={() => window.location.reload()}
        className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-red-700 transition"
        whileHover={{ scale: 1.05 }}
      >
        <RefreshCw className="h-5 w-5" />
        Coba Lagi
      </motion.button>
    </motion.div>
  );
};

export default NoInternet;
