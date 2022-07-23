import { useState, useEffect } from 'react';
import Header from './components/Header';
import Products from './components/Products';
import Categories from './components/Categories';
import Offer from './components/Offer';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';
import Account from './components/Account';
import Navbar from './components/Navbar';
import { menutoggle } from './components/Header';
import CatProducts from './components/CatProducts';
import ProductDetails from './components/ProductDetails';
import { AddProduct } from './components/AddProduct';
import About from './components/About';
import AdminProducts from './components/AdminProducts';
import AdminCategories from './components/AdminCategories';
import AdminUsers from './components/AdminUsers';
import AdminRequests from './components/AdminRequests';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };

    getProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch(
      'http://localhost:8080/used_products_store/products/get_all_products'
    );
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchCategories();
      setCategories(categories);
    };

    getCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch(
      'http://localhost:8080/used_products_store/categories/get_all_categories'
    );
    const data = await res.json();
    return data;
  };

  //Add Product
  const addProduct = async (product) => {
    const res = await fetch(
      'http://localhost:8080/used_products_store/products/add_product',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(product),
      }
    );

    const status = await res.status;
    if (status === 200) alert('Product added Succesfully!');
    const data = await res.json();

    setProducts([...products, data]);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Categories categories={categories} />
                <About />
                <Products
                  products={products}
                  set={setProducts}
                  title="Latest Products"
                />
                <Offer />
              </>
            }
          />
          <Route
            path="/account"
            element={
              <>
                <Navbar menutoggle={menutoggle} navstyle="navbar othernav" />
                <Account />
              </>
            }
          />
          <Route
            path="/products"
            element={
              <>
                <Navbar menutoggle={menutoggle} navstyle="navbar" />
                <Products
                  products={products}
                  set={setProducts}
                  title="All Products"
                />
              </>
            }
          />
          <Route
            path="/c/:categoryName"
            element={
              <>
                <Navbar menutoggle={menutoggle} navstyle="navbar" />
                <CatProducts products={products} />
                <Products
                  products={products}
                  set={setProducts}
                  title="All Products"
                />
              </>
            }
          />
          <Route
            path="/p/:productId"
            element={
              <>
                <Navbar menutoggle={menutoggle} navstyle="navbar" />
                <ProductDetails products={products} />
                <Products
                  products={products}
                  set={setProducts}
                  title="All Products"
                />
              </>
            }
          />
          <Route
            path="add"
            element={
              <>
                <Navbar menutoggle={menutoggle} navstyle="navbar" />
                <AddProduct categories={categories} onAdd={addProduct} />
              </>
            }
          />
          <Route
            path="/admin/products"
            element={
              <>
                <Navbar menutoggle={menutoggle} navstyle="navbar othernav" />
                <AdminProducts products={products} set={setProducts} />
              </>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <>
                <Navbar menutoggle={menutoggle} navstyle="navbar othernav" />
                <AdminCategories categories={categories} set={setCategories} />
              </>
            }
          />
          <Route
            path="/admin/users"
            element={
              <>
                <Navbar menutoggle={menutoggle} navstyle="navbar othernav" />
                <AdminUsers />
              </>
            }
          />
          <Route
            path="/admin/requests"
            element={
              <>
                <Navbar menutoggle={menutoggle} navstyle="navbar othernav" />
                <AdminRequests products={products} set={setProducts} />
              </>
            }
          />
        </Routes>
        <Outlet />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
