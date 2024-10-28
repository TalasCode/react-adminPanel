import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AddAdmin.css'; // Ensure you create this CSS file for styles

const AddAdmin = ({ url }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        passwordHash: '',
        streetAddress: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        roleId: 0,
    });
    
    const [roles, setRoles] = useState([]);
const token = localStorage.getItem("token");
    useEffect(() => {
        // Fetch roles from the API
        const fetchRoles = async () => {
            try {
                const response = await axios.get(`https://localhost:7274/api/Role/getAll`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  console.log(response.data.$values);
                setRoles(response.data.$values);
            } catch (error) {
                console.error('Error fetching roles:', error);
                toast.error('Failed to fetch roles.');
            }
        };

        fetchRoles();
    }, [url]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`https://localhost:7274/api/User/add`, formData, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            if (response.data) {
                toast.success('Admin added successfully!');
                // Reset form
                setFormData({
                    username: '',
                    email: '',
                    passwordHash: '',
                    streetAddress: '',
                    city: '',
                    state: '',
                    postalCode: '',
                    country: '',
                    roleId: 0,
                });
            } else {
                toast.error('Failed to add admin.');
            }
        } catch (error) {
            console.error('Error adding admin:', error.response);
            toast.error('Error adding admin.');
        }
    };

    return (
        <div className="add-admin">
            <h2>Add Admin</h2>
            <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordHash">Password:</label>
                    <input
                        type="password"
                        id="passwordHash"
                        name="passwordHash"
                        value={formData.passwordHash}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="streetAddress">Street Address:</label>
                    <input
                        type="text"
                        id="streetAddress"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State:</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">Postal Code:</label>
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="roleId">Role:</label>
                    <select 
                        id="roleId" 
                        name="roleId" 
                        value={formData.roleId} 
                        onChange={handleChange}
                        required
                    >
                        <option value={0} disabled>Select a role</option>
                        {roles.map(role => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="add-btn">Add Admin</button>
            </form>
        </div>
    );
};

export default AddAdmin;