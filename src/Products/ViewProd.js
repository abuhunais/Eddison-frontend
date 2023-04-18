import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import InventNav from '../UserLayout/InventNav';

function ViewProd() {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (userId) {
            axios.get('http://localhost:9876/cart/all', {
                params: {
                    userId: userId
                }
            })
                .then(response => setCartItems(response.data))
                .catch(error => console.error(error));
        }
    }, [userId]);

    useEffect(() => {
        fetch('http://localhost:9876/products/all')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error(error));
    }, []);

    const addToCart = (productId, quantity) => {
        axios.post('http://localhost:9876/cart/addProduct', {
            productId,
            userId,
            quantity
        })
            .then(response => {
                setMessage(`Added ${quantity} ${response.data.product.name} to cart`);
                console.log(response);
            })
            .catch(error => console.error(error));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const productId = formData.get('productId');
        const quantity = formData.get('quantity');
        addToCart(productId, quantity);
    }

    return (
        <div>
            <InventNav />
            <h1>Products</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>
                                <form onSubmit={handleSubmit}>
                                    <input type="hidden" name="productId" value={product.id} />
                                    <input type="number" name="quantity" placeholder="Quantity" />
                                    <button type="submit">Add to Cart</button>
                                </form>
                                <Link to={`/products/${product.id}`}>View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <label htmlFor="userId">Enter User ID: </label>
                <input type="text" name="userId" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
            </div>
            <h2>Cart Items</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>

                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.product.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.product.price * item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <style jsx>{`
                table {
                    border-collapse: collapse;
                    margin-top: 1rem;
                    width: 100%;
                }
                th, td {
                    border: 1px solid black;
                    padding: 0.5rem;
                    text-align: left;
                }
                th {
                    background-color: lightgray;
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
}

export default ViewProd;
