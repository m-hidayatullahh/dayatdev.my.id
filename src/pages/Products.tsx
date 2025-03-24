import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import { digitalProducts } from '../data';
import { SearchBar } from '../components/SearchBar';
import { MessageCircle } from 'lucide-react';

// Utility function to validate URLs
const isValidUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    // Allow only specific protocols (e.g., http, https)
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch (error) {
    return false; // Invalid URL
  }
};

export const Products: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<(typeof digitalProducts[0] & { demoLink?: string }) | null>(null);

  const filteredProducts = digitalProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleWhatsAppCheckout = (product: typeof digitalProducts[0]) => {
    const formatRupiah = (value: number) =>
      new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);

    const message = encodeURIComponent(
      `Hi Dayat, Saya Mau Membeli Produk Berikut ${product.name} Total Harga = ${formatRupiah(product.price)}`
    );
    window.open(`https://wa.me/6287715882995?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Animated Heading */}
        <motion.h2
          className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Digital Products
        </motion.h2>

        {/* Animated Search Bar */}
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search products..."
          />
        </motion.div>

        {/* Animated Product Cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.img
                className="w-full h-48 object-cover"
                src={product.image}
                alt={product.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {product.name}
                </h3>
                {/* Shortened Product Description */}
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  {product.description.length > 50
                    ? `${product.description.slice(0, 50)}...`
                    : product.description}
                </p>
                {/* Price and View Details Link */}
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {`Rp.${new Intl.NumberFormat('id-ID', { style: 'decimal' }).format(product.price)}`}
                  </p>
                  <span
                    onClick={() => setSelectedProduct(product)}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    View Details
                  </span>
                </div>
                <button
                  onClick={() => handleWhatsAppCheckout(product)}
                  className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Buy
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated Modal */}
      {selectedProduct && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-full p-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              {/* Product Image */}
              <img
                className="w-full h-48 object-cover rounded-md mb-4"
                src={selectedProduct.image}
                alt={selectedProduct.name}
              />
              {/* Product Name */}
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedProduct.name}</h2>
              {/* Scrollable Product Description */}
              <div className="mt-4 max-h-32 overflow-y-auto text-gray-500 dark:text-gray-400">
                <p>{selectedProduct.description}</p>
              </div>
              {/* Product Price */}
              <p className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                {`Rp.${new Intl.NumberFormat('id-ID', { style: 'decimal' }).format(selectedProduct.price ?? 0)}`}
              </p>
              {/* Demo Link */}
              {selectedProduct.demoLink && isValidUrl(selectedProduct.demoLink) && (
                <a
                  href={selectedProduct.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-blue-600 hover:underline"
                >
                  View Demo Products
                </a>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};