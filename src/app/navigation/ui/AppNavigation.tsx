import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ProductList } from '../../../views/ProductList';
import { ProductDetails } from '../../../views/ProductDetails';


export const AppNavigator = () => {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<ProductList/>}/>
            <Route path="/details" element={<ProductDetails/>}/>
        </Routes>
      </BrowserRouter>
    );
};
