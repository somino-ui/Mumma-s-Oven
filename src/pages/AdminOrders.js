import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/Adminlayout';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch all orders from the backend
        fetch('http://127.0.0.1:8000/api/all-orders/')
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => console.error("Error fetching orders:", err));
    }, []);

    return (
        <AdminLayout>
            <div className="container py-4">
                <h2 className="mb-4">Order Management</h2>
                <div className="card shadow-sm">
                    <div className="card-body">
                        {orders.length === 0 ? (
                            <p>No orders found.</p>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Customer</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Items</th>
                                            <th>Total</th>
                                            <th>Address</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order.id}>
                                                <td>#{order.id}</td>
                                                <td>
                                                    <strong>{order.user_name}</strong>
                                                    <br/>
                                                    <small className="text-muted">ID: {order.user}</small>
                                                </td>
                                                <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                                <td>
                                                    <span className={`badge rounded-pill ${
                                                        order.status === 'Completed' ? 'bg-success' :
                                                        order.status === 'Pending' ? 'bg-warning text-dark' :
                                                        order.status === 'Cancelled' ? 'bg-danger' : 'bg-primary'
                                                    }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <ul className="list-unstyled mb-0 small">
                                                        {order.items.map(item => (
                                                            <li key={item.id}>
                                                                {item.quantity} x {item.cake_name}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td className="fw-bold">₹{order.total_price}</td>
                                                <td><small>{order.address}</small></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminOrders;
