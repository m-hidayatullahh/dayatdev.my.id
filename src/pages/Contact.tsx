import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    subject: '',
    pesan: '',
  });

  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi form
    if (!formData.nama.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.pesan.trim()) {
      setModalMessage('Semua field harus diisi!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setModalMessage('Format email tidak valid!');
      return;
    }

    // Proses pengiriman form
    const form = document.querySelector<HTMLFormElement>('form[name="submit-to-google-sheet"]');
    if (!form) {
      setModalMessage('Form tidak ditemukan!');
      return;
    }

    const formDataToSend = new FormData(form);
    fetch('https://script.google.com/macros/s/AKfycbyowcSkKdMZbeVrdzlCLiHAqoZA2IezQqusYDRwKfxOkmdDK1iHxhkltcMA2aHseejSjw/exec', {
      method: 'POST',
      body: formDataToSend,
      headers: { Accept: 'application/json' },
    })
    .then((response) => {
      if (response.ok) {
        setModalMessage('Pesan berhasil dikirim! Saya akan segera menghubungi Anda.');
        setFormData({ nama: '', email: '', subject: '', pesan: '' });
      } else {
        setModalMessage('Terjadi kesalahan saat mengirim pesan.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      setModalMessage('Terjadi kesalahan pada jaringan.');
    });
  };

  const closeModal = () => {
    setModalMessage(null);
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      {/* SEO Metadata */}
      <Helmet>
        <title>Contact - M.Hidayatullah | Software Engineer</title>
        <meta 
          name="description" 
          content="Hubungi M.Hidayatullah untuk kolaborasi proyek, pertanyaan, atau kesempatan kerja sama dalam pengembangan web profesional." 
        />
        <meta property="og:title" content="Contact - M.Hidayatullah | Software Engineer" />
        <meta 
          property="og:description" 
          content="Form kontak profesional untuk menghubungi M.Hidayatullah terkait pengembangan web dan kolaborasi proyek" 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dayatdev.my.id/contact" />
      </Helmet>

      {/* Modal Notification */}
      {modalMessage && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full mx-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-gray-900 dark:text-white mb-4">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Tutup
            </button>
          </motion.div>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Hubungi Saya
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Mari berdiskusi tentang proyek atau kolaborasi Anda
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">dayattdev@gmail.com</p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Respon waktu kerja: 24 jam</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Telepon/WhatsApp</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">+62 877 1588 2995</p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Senin - Jumat, 08:00 - 17:00 WITA</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Lokasi</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">Lombok, Nusa Tenggara Barat</p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Terbuka untuk kerja remote maupun onsite</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            name="submit-to-google-sheet"
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="nama" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Masukkan nama Anda"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Alamat Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="email@contoh.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subjek
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Tentang apa yang ingin dibahas?"
                />
              </div>

              <div>
                <label htmlFor="pesan" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pesan Detail
                </label>
                <textarea
                  id="pesan"
                  name="pesan"
                  rows={4}
                  value={formData.pesan}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Deskripsikan kebutuhan Anda..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
              >
                Kirim Pesan
                <Mail className="ml-2 h-5 w-5" />
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};