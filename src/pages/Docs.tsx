import React from 'react';

interface DocsProps {
  onClose: () => void; // Function to handle closing the modal
}

const Docs: React.FC<DocsProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-4xl w-full p-6 overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
        >
          ✖
        </button>

        <h1 className="text-3xl font-bold mb-4 text-center md:text-left">Panduan Bertanya</h1>
        <p className="mb-4 text-center md:text-left">
          Berikut adalah panduan untuk bertanya kepada asisten virtual agar mendapatkan jawaban yang relevan:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Tanyakan tentang <strong>nama</strong>, <strong>profesi</strong>, atau <strong>kontak</strong>.</li>
          <li>Tanyakan tentang <strong>keahlian</strong>, <strong>pendidikan</strong>, atau <strong>pengalaman kerja</strong>.</li>
          <li>Tanyakan tentang <strong>proyek</strong> atau <strong>organisasi</strong> yang pernah diikuti.</li>
          <li>Gunakan bahasa yang jelas dan spesifik untuk mendapatkan jawaban yang akurat.</li>
        </ul>
        <p className="mb-4 text-center md:text-left">
          Contoh pertanyaan yang dapat diajukan:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>"Siapa nama Anda?"</li>
          <li>"Apa saja keahlian Anda?"</li>
          <li>"Ceritakan tentang pengalaman kerja Anda."</li>
          <li>"Apa saja proyek yang pernah Anda kerjakan?"</li>
          <li>"Pengalaman Karir?"</li>
        </ul>
        <p className="mb-4 text-center md:text-left">
          Jika Anda bertanya di luar topik yang tersedia, asisten akan memberikan jawaban default.
        </p>
        <p className="text-center md:text-left">
          Kembali ke halaman utama dengan mengklik <a href="/" className="text-blue-600 hover:underline">di sini</a>.
        </p>
      </div>
    </div>
  );
};

export default Docs;