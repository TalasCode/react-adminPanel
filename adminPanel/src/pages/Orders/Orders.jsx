import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://localhost:7274/api/Order/getAll', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(response.data.$values);
            } catch (error) {
                console.error('Error fetching orders:', error);
                toast.error('Failed to load orders.');
            }
        };

        fetchOrders();
    }, [token]);

    const handleStatusChange = async (orderId, newStatus) => {
        // Find the current order
        const orderToUpdate = orders.find(order => order.id === orderId);
        if (!orderToUpdate) return; // Ensure the order exists

        // Create a new order object with the updated status
        const updatedOrder = {
            ...orderToUpdate,
            orderStatus: newStatus, // Update the orderStatus
        };

        try {
            // Send the entire object to the API
            await axios.put(`https://localhost:7274/api/Order/update/${orderId}`, updatedOrder, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Update local state with the new status
            setOrders(prevOrders =>
                prevOrders.map(order => order.id === orderId ? updatedOrder : order)
            );

            toast.success('Order status updated successfully!');
        } catch (error) {
            console.error('Error updating order status:', error.response ? error.response.data : error);
            toast.error('Failed to update order status.');
        }
    };

    return (
        <div className="orders-manager">
            <h1 className="page-title">Orders List</h1>
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Order Status</th>
                        <th>Order Date</th>
                        <th>Coupon ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.userId}</td>
                            <td>
                                <select
                                    value={order.orderStatus}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    className="status-select"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </td>
                            <td>{new Date(order.orderDate).toLocaleString()}</td>
                            <td>{order.couponId}</td>
                            <td>{order.firstName} {order.lastName}</td>
                            <td>{order.email}</td>
                            <td>{order.street}, {order.city}, {order.country}</td>
                            <td>{order.phone}</td>
                            <td>${order.amount.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;