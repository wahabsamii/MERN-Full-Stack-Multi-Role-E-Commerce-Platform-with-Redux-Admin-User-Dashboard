import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Dashboard from './pages/Admin/Dashboard';
import Products from './pages/Admin/Products';
import AddProducts from './pages/Admin/AddProduct';
import Users from './pages/Admin/Users';
import Categories from './pages/Admin/Categories';
import AddCategory from './pages/Admin/AddCategory';
import Allorders from './pages/Admin/Allorders';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import UserDashboard from './pages/User/UserDashboard';
import MyOrders from './pages/User/MyOrders';
import MyProfile from './pages/User/MyProfile';
import ProductSearch from './pages/ProductSearch';
import Wishlist from './pages/Wishlist';
import AdminLayout from './pages/Admin/AdminLayout';
import ProtectedUserRoute from './components/ProtectedUserRoute';
import CategoryDetails from './pages/CategoryDetails';
import ProductDetails from './pages/ProductDetails';
import AdminProtected from './components/AdminProtected';

// Custom wrapper to detect route
function LayoutWrapper({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ToastContainer />
      {!isAdminRoute && <Header />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/search' element={<ProductSearch />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/category/:name' element={<CategoryDetails />} />
          <Route path='/product/:name' element={<ProductDetails />} />
          <Route path='*' element={<NotFound />} />

          {/* Protected Admin Routes */}
          <Route
            path='/admin'
            element={
              <AdminProtected>
                <AdminLayout />
              </AdminProtected>
            }
          >
            <Route index path='dashboard' element={<Dashboard />} />
            <Route path='products' element={<Products />} />
            <Route path='add-product' element={<AddProducts />} />
            <Route path='categories' element={<Categories />} />
            <Route path='add-category' element={<AddCategory />} />
            <Route path='users' element={<Users />} />
            <Route path='orders' element={<Allorders />} />
          </Route>

          {/* Protected User Routes */}
          <Route path='/user' element={<ProtectedUserRoute />}>
            <Route path='dashboard' element={<UserDashboard />} />
            <Route path='orders' element={<MyOrders />} />
            <Route path='profile' element={<MyProfile />} />
          </Route>
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
}

export default App;
