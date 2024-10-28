import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Coupons.css'; // Ensure this CSS file has necessary styles

const Coupon = ({ url }) => {
    const [coupons, setCoupons] = useState([]);
    const [newCoupon, setNewCoupon] = useState({
        code: "",
        discountAmount: 0,
        discountPercentage: 0,
        expiryDate: new Date().toISOString().slice(0, 16),
        isActive: true,
    });
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const response = await axios.get(`https://localhost:7274/api/Coupon/getAll`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCoupons(response.data.$values);
            } catch (error) {
                console.error('Error fetching coupons:', error);
                toast.error('Failed to load coupons.');
            }
        };

        fetchCoupons();
    }, [token]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewCoupon((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (event) => {
        const { checked } = event.target;
        setNewCoupon((prev) => ({ ...prev, isActive: checked }));
    };

    const addCoupon = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`https://localhost:7274/api/Coupon/add`, newCoupon, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCoupons((prev) => [...prev, response.data]);
            resetNewCoupon();
            toast.success('Coupon added successfully!');
        } catch (error) {
            console.error('Error adding coupon:', error);
            toast.error('Failed to add coupon.');
        }
    };

    const resetNewCoupon = () => {
        setNewCoupon({
            code: "",
            discountAmount: 0,
            discountPercentage: 0,
            expiryDate: new Date().toISOString().slice(0, 16),
            isActive: true,
        });
    };

    const toggleActiveStatus = async (id, code, amount, percentage, exDate, active) => {
        const updatedCoupon = {
            code: code,
            discountAmount: amount,
            discountPercentage: percentage,
            expiryDate: exDate,
            isActive: !active
        };
        
        try {
            await axios.put(`https://localhost:7274/api/Coupon/update/${id}`, updatedCoupon, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Update the local state immediately
            setCoupons((prevCoupons) =>
                prevCoupons.map((coupon) =>
                    coupon.id === id ? { ...coupon, isActive: !active } : coupon
                )
            );

            toast.success('Coupon status updated successfully!');
        } catch (error) {
            console.error('Error updating coupon status:', error);
            toast.error('Failed to update coupon status.');
        }
    };

    return (
        <div className="coupon-manager">
            <h1>Coupon Manager</h1>
            <form onSubmit={addCoupon} className="add-coupon-form">
                <label>
                    Coupon Code
                    <input
                        type="text"
                        name="code"
                        value={newCoupon.code}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Discount Amount
                    <input
                        type="number"
                        name="discountAmount"
                        value={newCoupon.discountAmount}
                        placeholder='Discount Amount'
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Discount Percentage
                    <input
                        type="number"
                        name="discountPercentage"
                        value={newCoupon.discountPercentage}
                        placeholder='Discount Percentage'
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Expiry Date
                    <input
                        type="datetime-local"
                        name="expiryDate"
                        value={newCoupon.expiryDate}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <div className="active-checkbox">
                    <label>
                        Active
                        <input
                            type="checkbox"
                            checked={newCoupon.isActive}
                            onChange={handleCheckboxChange}
                        />
                    </label>
                </div>
                <button type="submit">Add Coupon</button>
            </form>

            <h2>Existing Coupons</h2>
            <table className="coupon-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Code</th>
                        <th>Amount</th>
                        <th>Percentage</th>
                        <th>Expiry Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons.map(coupon => (
                        <tr key={coupon.id}>
                            <td>{coupon.id}</td> {/* Display coupon ID */}
                            <td>{coupon.code}</td>
                            <td>{coupon.discountAmount}</td>
                            <td>{coupon.discountPercentage}</td>
                            <td>{new Date(coupon.expiryDate).toLocaleString()}</td>
                            <td>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={coupon.isActive}
                                        onChange={() => toggleActiveStatus(coupon.id, coupon.code, coupon.discountAmount, coupon.discountPercentage, coupon.expiryDate, coupon.isActive)}
                                    />
                                    Active
                                </label>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Coupon;