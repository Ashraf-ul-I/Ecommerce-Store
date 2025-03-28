import React from 'react';
import { useProductStore } from '../../store/useProductStore';
import { motion } from 'framer-motion';
import { Star, Trash } from 'lucide-react';

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();
  console.log("products =", products);

  return (
    <motion.div
      className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className='min-w-full divide-y divide-gray-700'>
        <thead className='bg-gray-700'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Product</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Price</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Category</th>
            {/* <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>In Stock</th> */}
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Featured</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Actions</th>
          </tr>
        </thead>

        <tbody className='bg-gray-800 divide-y divide-gray-700'>
          {products.map((product) => (
            <tr key={product._id || product.id} className='hover:bg-gray-700'>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0 h-10 w-10'>
                    <img className='h-10 w-10 rounded-full object-cover' src={product.image} alt={product.productName} />
                  </div>
                  <div className='ml-4'>
                    <div className='text-sm font-medium text-white'>{product.productName}</div>
                  </div>
                </div>
              </td>
              <td className='px-6 py-4  whitespace-nowrap'>Tk. {Number(product.price).toFixed(2)}</td>
              <td className='px-6 py-4  whitespace-nowrap'>{product.category || 'N/A'}</td>
              {/* <td className='px-6 py-4  whitespace-nowrap'>{product.countInStock ? 'Yes' : 'No'}</td> */}
              <td className='px-6 py-4  whitespace-nowrap'>
                <button
                  onClick={() => toggleFeaturedProduct(product._id)}
                  className={`p-1 rounded-full ${product.isFeatured ? 'bg-yellow-400 text-gray-900' : 'bg-gray-600 text-gray-300'} hover:bg-yellow-500 transition-colors duration-200`}
                >
                  <Star className='h-5 w-5'></Star>
                </button>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className='bg-red-500 hover:text-red-300 px-3 py-1 rounded'
                >
                  <Trash className='h-5 w-5'/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ProductsList;
