import React from 'react';
import { ModalWindow } from '../../../shared/ui/ModalWindow';

interface DeleteConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteModal: React.FC<DeleteConfirmationModalProps> = ({ onClose, onConfirm }) => {
  return (
    <ModalWindow>
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this product?</p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </ModalWindow>
  );
};