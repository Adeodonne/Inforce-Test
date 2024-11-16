import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/storage/store';
import { Commentary } from '../../../entities/product';
import {
  addComment,
  deleteComment,
  setSelectedProduct,
} from '../../../entities/productList/model/slices/productListSlice';

export const ProductDetails: React.FC = () => {
  const [newComment, setNewComment] = useState('');

  const product = useSelector(
    (state: RootState) => state.products.selectedProduct
  );
  const dispatch = useDispatch();

  if (!product) {
    return <div>No product selected</div>;
  }

  const handleAddComment = () => {
    const newCommentObj: Commentary = {
      id: Date.now(),
      productId: product.id,
      description: newComment,
      date: new Date().toLocaleString(),
    };

    dispatch(addComment({ productId: product.id, comment: newCommentObj }));

    dispatch(
      setSelectedProduct({
        ...product,
        comments: [...product.comments, newCommentObj],
      })
    );

    setNewComment('');
  };

  const handleDeleteComment = (commentId: number) => {
    dispatch(deleteComment({ productId: product.id, commentId }));

    dispatch(
      setSelectedProduct({
        ...product,
        comments: product.comments.filter(
          (comment) => comment.id !== commentId
        ),
      })
    );
  };

  return (
    <div className="p-4 space-y-4">

      <div className="flex justify-between items-center">
        <h2 className="text-xl">{product.name}</h2>
      </div>

      <div>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-auto"
        />
        <p>Count: {product.count}</p>
        <p>
          Size: {product.size.width} x {product.size.height}
        </p>
        <p>Weight: {product.weight}</p>
      </div>

      <div>
        <h3 className="text-lg">Comments</h3>
        {product.comments.length > 0 ? (
          <ul>
            {product.comments.map((comment) => (
              <li
                key={comment.id}
                className="flex justify-between items-center p-2 border-b"
              >
                <p>{comment.description}</p>
                <span className="text-sm text-gray-500">{comment.date}</span>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}

        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleAddComment}
          className="bg-green-500 text-white p-2 rounded mt-2"
        >
          Add Comment
        </button>

      </div>
    </div>
  );
};
