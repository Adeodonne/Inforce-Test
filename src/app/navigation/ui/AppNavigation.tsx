import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ProductList } from '../../../views/ProductList';

const About = () => <h2 className="text-2xl">About Page</h2>;

export const AppNavigator = () => {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<ProductList/>}/>
            <Route path="/about" element={<About/>}/>
        </Routes>
      </BrowserRouter>
    );
};