import React, { useState } from 'react';
import { digitalProducts } from '../data';
import { SearchBar } from '../components/SearchBar';
import { MessageCircle } from 'lucide-react';

export const Products: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

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
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Digital Products
          </h2>
          <div className="mt-8 flex justify-center">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search products..."
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <img
                className="w-full h-48 object-cover"
                src={product.image}
                alt={product.name}
              />
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {product.name}
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  {product.description}
                </p>
                <p className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}
                </p>
                <button
                  onClick={() => handleWhatsAppCheckout(product)}
                  className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Buy via WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};