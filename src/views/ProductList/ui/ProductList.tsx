import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddProductModal } from '../../../widgets/AddProductModal';
import { DeleteModal } from '../../../widgets/DeleteModal';
import SortProducts from '../../../shared/lib/SortProduct/SortProducts';

import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../app/storage/store';
import {
  deleteProduct,
  setSelectedProduct,
} from '../../../entities/productList/model/slices/productListSlice';
import { Product } from '../../../entities/productList';

export const ProductList: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pickedProduct, setPickedProduct] = useState<Product | null>(null);
  const [sortOption, setSortOption] = useState<'alphabetical' | 'numeric'>(
    'alphabetical'
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sortedProducts = SortProducts(products, sortOption);

  const handleDeleteProduct = () => {
    if (pickedProduct) {
      dispatch(deleteProduct(pickedProduct.id));
      setDeleteModalOpen(false);
    }
  };

  const handleSelectProduct = (product: Product) => {
    dispatch(setSelectedProduct(product));
    navigate('/details');
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <div>
          <select
            className="border rounded-md px-2 py-1 mr-2"
            value={sortOption}
            onChange={(e) =>
              setSortOption(e.target.value as 'alphabetical' | 'numeric')
            }
          >
            <option value="alphabetical">Alphabetical</option>
            <option value="numeric">By Count</option>
          </select>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => setProductModalOpen(true)}
          >
            Add Product
          </button>
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <li
            key={product.id}
            className="border rounded-md p-4 shadow-md flex flex-col items-center"
            onClick={() => handleSelectProduct(product)}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-32 w-32 object-cover mb-2"
            />
            <h2 className="font-bold text-lg">{product.name}</h2>
            <p>Count: {product.count}</p>
            <p>
              Size: {product.size.width}x{product.size.height}
            </p>
            <p>Weight: {product.weight}</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
              onClick={(e) => {
                e.stopPropagation();
                setPickedProduct(product);
                setDeleteModalOpen(true);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {isProductModalOpen && (
        <AddProductModal onClose={() => setProductModalOpen(false)} />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteProduct}
        />
      )}
    </div>
  );
};
