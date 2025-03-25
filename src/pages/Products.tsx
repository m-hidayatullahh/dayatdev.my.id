import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { digitalProducts } from '../data';
import { SearchBar } from '../components/SearchBar';
import { MessageCircle } from 'lucide-react';

const isValidUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch (error) {
    return false;
  }
};

export const Products: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof digitalProducts[0] & { demoLink?: string }) | null
  >(null);

  const filteredProducts = digitalProducts.filter(
    (product) =>
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
        <motion.h2
          className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Digital Products
        </motion.h2>

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

        {filteredProducts.length === 0 ? (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center p-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              <svg
                className="flex-shrink-0 w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <span className="sr-only">Info</span>
              <div className="ms-3 text-sm font-medium">
              Sorry, the product you are looking for is not available.
              </div>
            </div>
          </motion.div>
        ) : (
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
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    {product.description.length > 50
                      ? `${product.description.slice(0, 50)}...`
                      : product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <del className="text-red-500 text-lg">
                          {`Rp.${new Intl.NumberFormat('id-ID', { style: 'decimal' }).format(
                            product.originalPrice
                          )}`}
                        </del>
                      )}
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {`Rp.${new Intl.NumberFormat('id-ID', { style: 'decimal' }).format(
                          product.price
                        )}`}
                      </p>
                    </div>
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
        )}
      </div>

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
              <img
                className="w-full h-48 object-cover rounded-md mb-4"
                src={selectedProduct.image}
                alt={selectedProduct.name}
              />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedProduct.name}
              </h2>
              <div className="mt-4 max-h-32 overflow-y-auto text-gray-500 dark:text-gray-400">
                <p>{selectedProduct.description}</p>
              </div>
              <p className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                {selectedProduct.originalPrice && (
                  <del className="text-red-500 text-xl">
                    {`Rp.${new Intl.NumberFormat('id-ID', { style: 'decimal' }).format(
                      selectedProduct.originalPrice
                    )}`}
                  </del>
                )}
                <span className="ml-2">
                  {`Rp.${new Intl.NumberFormat('id-ID', { style: 'decimal' }).format(
                    selectedProduct.price
                  )}`}
                </span>
              </p>
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