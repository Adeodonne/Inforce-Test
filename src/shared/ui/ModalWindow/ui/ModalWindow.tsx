import React from 'react';

interface ModalWindowProps {
  children: React.ReactNode;
}
export const ModalWindow: React.FC<ModalWindowProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      {children}
    </div>
  );
};
