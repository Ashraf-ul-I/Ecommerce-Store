import { motion } from "framer-motion";
import { Loader, PlusCircle, Upload } from "lucide-react";
import React, { useState } from "react";
import { useProductStore } from "../../store/useProductStore";

const categories = ["jeans", "t-shirt", "shoes", "glasses", "jackets", "suits", "bags"];

const CreateProductForm = () => {
    const {createProduct,loading}=useProductStore()
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await createProduct(newProduct);
        setNewProduct({
            name: "",
            description: "",
            price: "",
            category: "",
            image: "",
          })
    } catch (error) {
        console.log("error creating a product")
    }
  };

  const handleImageChange=(e)=>{
    const file=e.target.files[0];
    if(file){
        const reader=new FileReader();
        reader.onloadend=()=>{
            setNewProduct({...newProduct,image:reader.result});
        }

        reader.readAsDataURL(file); //base64
    }
  }

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-emerald-300">
        Create New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-300">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            step='1'
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Image URL */}
<div className="mt-1 flex items-center gap-x-3">
  <input
    type="file"
    id="image"
    name="image"
    accept="image/*"
    className="sr-only"
    onChange={handleImageChange}
  />
  <label
    htmlFor="image"
    className="cursor-pointer bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-sm leading-4 font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 flex items-center gap-x-2"
  >
    <Upload className="h-5 w-5" />
    Upload Image
  </label>
  {newProduct.image && (
    <span className="text-sm text-gray-400">Image uploaded</span>
  )}
</div>


<button type='submit'
       className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none foocus:ring-emerald-500 transition duration-300 ease-in-out disabled:opacity-50' disabled={loading}>
         {loading?(<>
         <Loader className='mr-2 h-5 w-5 animate-spin ' aria-hidden="true"/>
         Loading...
         </>):(<>
         <PlusCircle className='mr-2 h-5 w-5' aria-hidden="true"/>
         Create Product
         </>)}
       </button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;
