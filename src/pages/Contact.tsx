import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import { Mail, Phone, MapPin } from 'lucide-react';

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

    // Validation logic
    if (!formData.nama.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.pesan.trim()) {
      setModalMessage('All fields are required!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setModalMessage('Please enter a valid email address!');
      return;
    }

    const form = document.querySelector<HTMLFormElement>('form[name="submit-to-google-sheet"]');
    if (!form) {
      setModalMessage('Form not found!');
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
          setModalMessage('Pesan Anda Berhasil Saya Terima, Saya Akan Menghubungi Anda Kembali!');
          setFormData({
            nama: '',
            email: '',
            subject: '',
            pesan: '',
          });
        } else {
          setModalMessage('An error occurred while sending the message!');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setModalMessage('An error occurred while sending the message!');
      });
  };

  const closeModal = () => {
    setModalMessage(null);
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      {/* Modal Animation */}
      {modalMessage && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-900 dark:text-white">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Animated Heading */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Have a question or want to work together?
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {/* Animated Contact Details */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="px-6 py-8">
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Email</p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">dayattdev@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Phone</p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">+62 877 1588 2995</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Location</p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Lombok West Nusa Tenggara</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Animated Form */}
          <motion.form
            name="submit-to-google-sheet"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="px-6 py-8">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    name="nama"
                    id="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="pesan" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    name="pesan"
                    id="pesan"
                    rows={4}
                    value={formData.pesan}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Message
                </button>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};