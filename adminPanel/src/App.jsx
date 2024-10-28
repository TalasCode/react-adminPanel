import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route, Outlet } from 'react-router-dom'; // Import Outlet here
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login/Login';
import AddRole from './pages/addRole/addRole';
import AddAdmin from './pages/addAdmin/addAdmin';
import AddCategory from './pages/AddCategory/AddCategory';
import AddBrand from './pages/AddBrand/AddBrand';
import Coupon from './pages/Coupons/Coupons';

const App = () => {
  const url = "http://localhost:5174";

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Routes>
          {/* Login route without Sidebar */}
          <Route path="/" element={<Login url={url} />} />

          {/* Routes with Sidebar */}
          <Route element={<Layout />}>
          <Route path="/add-role" element={<AddRole style={{ width: '100%', maxWidth: '2000px', margin: '0 auto' }} />} />
            <Route path="/add" element={<Add url={url} />} />
            <Route path='/add-admin' element={<AddAdmin url={url}/>}/>
            <Route path='/add-category' element={<AddCategory url={url}/>}/>
            <Route path='/add-brand' element={<AddBrand url={url}/>}/>
            <Route path='/coupon-manager' element={<Coupon url={url}/>}/>
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

// Layout component to include Sidebar and children routes
const Layout = () => {
  return (
    <>
      <Sidebar />
      <div className="main-content">
        <Outlet /> {/* This will render the matched child route */}
      </div>
    </>
  );
};

export default App;