import React, { useState } from 'react';
import { ModalWindow } from '../../../shared/ui/ModalWindow';
import { useDispatch } from 'react-redux';
import { addProduct, Product } from '../../../entities/productList';

interface ProductModalProps {
  onClose: () => void;
}

export const AddProductModal: React.FC<ProductModalProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    count: 0,
    imageUrl: '',
    width: 0,
    height: 0,
    weight: '',
  });

  const isFormValid = formData.name && formData.count > 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === 'count' || name === 'width' || name === 'height'
          ? +value
          : value,
    });
  };

  const handleSubmit = () => {
    if (isFormValid) {
      const newProduct: Product = {
        id: Date.now(),
        name: formData.name,
        count: formData.count,
        imageUrl: formData.imageUrl,
        size: { width: formData.width, height: formData.height },
        weight: formData.weight,
        comments: [],
      };

      dispatch(addProduct(newProduct));

      onClose();
    }
  };

  return (
    <ModalWindow>
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleInputChange}
            className="border w-full p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="count" className="block font-medium mb-2">
            Count
          </label>
          <input
            type="number"
            id="count"
            name="count"
            placeholder="Count"
            value={formData.count}
            onChange={handleInputChange}
            className="border w-full p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="imageUrl" className="block font-medium mb-2">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="border w-full p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="width" className="block font-medium mb-2">
            Width
          </label>
          <input
            type="number"
            id="width"
            name="width"
            placeholder="Width"
            value={formData.width}
            onChange={handleInputChange}
            className="border w-full p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="height" className="block font-medium mb-2">
            Height
          </label>
          <input
            type="number"
            id="height"
            name="height"
            placeholder="Height"
            value={formData.height}
            onChange={handleInputChange}
            className="border w-full p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="weight" className="block font-medium mb-2">
            Weight
          </label>
          <input
            type="text"
            id="weight"
            name="weight"
            placeholder="Weight"
            value={formData.weight}
            onChange={handleInputChange}
            className="border w-full p-2 rounded-md"
          />
        </div>

        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className={`px-4 py-2 rounded-md ${isFormValid ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </ModalWindow>
  );
};
