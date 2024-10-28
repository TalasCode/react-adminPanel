import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const Sidebar = () => {
  const [permissions, setPermissions] = useState([]);
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const token = localStorage.getItem('token');
        const roleId = localStorage.getItem("RoleId");
        const response = await axios.get(`https://localhost:7274/api/UserPermission/getByRoleId/${roleId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Log the response to check its structure
        console.log(response.data);
        
        // Directly set the permissions if it's an array of strings
        setPermissions(response.data.$values); // Assuming the API returns an array of permission strings
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

    fetchPermissions();
  }, []);

  // Updated hasPermission function
  function hasPermission(requiredPermission) {
    return permissions.includes(requiredPermission);
  }

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    localStorage.removeItem('roleId'); // Optionally clear roleId
    navigate('/'); // Navigate to the login page or home page
  };
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
      {hasPermission('/api/Item/getAll') && (
          <NavLink to='/list' className="sidebar-option">
            <img className='icon' src={assets.List} alt="List Items" />
            <p>List Items</p>
          </NavLink>
        )}
        {hasPermission('/api/Item/add') && (
          <NavLink to='/add' className="sidebar-option">
            <img className='icon' src={assets.add_icon} alt="Add Items" />
            <p>Add Items</p>
          </NavLink>
        )}
       
        {hasPermission('/api/Order/getAll') && (
          <NavLink to='/orders' className="sidebar-option">
            <img className='icon' src={assets.order_icon} alt="Orders" />
            <p>Orders</p>
          </NavLink>
        )}
        {hasPermission('/api/Brand/add') && (
          <NavLink to='/add-brand' className="sidebar-option">
            <img className='icon' src={assets.add_brand} alt="Add Brand" />
            <p>Add Brand</p>
          </NavLink>
        )}
        {hasPermission('/api/Category/add') && (
          <NavLink to='/add-category' className="sidebar-option">
            <img className='icon' src={assets.add_category} alt="Add Category" />
            <p>Add Category</p>
          </NavLink>
        )}
        {hasPermission('/api/Offer/add') && (
          <NavLink to='/add-offer' className="sidebar-option">
            <img className='icon' src={assets.offer_icon} alt="Add Offer" />
            <p>Add Offer</p>
          </NavLink>
        )}
        {hasPermission('/api/Coupon/add') && (
          <NavLink to='/coupon-manager' className="sidebar-option">
            <img className='icon' src={assets.add_coupon} alt="Add Coupon" />
            <p>Coupon Manager</p>
          </NavLink>
        )}
        
        {hasPermission('/api/Role/add') && (
          <NavLink to='/add-role' className="sidebar-option">
            <img className='icon' src={assets.add_Role} alt="Add Role" />
            <p>Add Role</p>
          </NavLink>
        )}
        {hasPermission('/api/User/add') && (
          <NavLink to='/add-admin' className="sidebar-option">
            <img className='icon' src={assets.add_admin} alt="Add Admin" />
            <p>Add Admin</p>
          </NavLink>
        )}
      </div>
      <div className="sidebar-footer">
        <div onClick={handleLogout} className={`sidebar-option logout`}>
          <img className='icon' src={assets.Logout} alt="Logout" />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;