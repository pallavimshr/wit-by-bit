
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from "react-router"
import Layout from './components/layout';
import Home from './pages/Home';
import Stores from './pages/Stores';
import Products from './pages/Products';
import Catalogue from './pages/Catalogue';
import Promotions from './pages/Promotions';
import Reports from './pages/Reports';
import Docs from './pages/Docs';
import Settings from './pages/Settings';
import AddProduct from './pages/AddProduct';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout children={undefined} />}>
          <Route path="/" element={<Home />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/products" element={<Products />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Route>
        </Routes>
    </Router>
  );
};

export default App;
