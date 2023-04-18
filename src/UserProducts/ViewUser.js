import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import InventNav from '../UserLayout/InventNav';
import './ViewUser.css';
// import './viewusersfile.css';

function ViewProd() {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [message, setMessage] = useState('');
    const [orderedProducts, setOrderedProducts] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);





    useEffect(() => {
        fetchOrderHistory();
    }, []);



    useEffect(() => {
        axios.get('http://localhost:9876/cart/all', {
            params: {
                userId: 1
            }
        })
            .then(response => setCartItems(response.data))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:9876/products/all')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error(error));
    }, []);

    const addToCart = (productId, quantity) => {
        axios.post('http://localhost:9876/cart/addProduct', {
            productId,
            userId: 1,
            quantity
        })
            .then(response => {
                setMessage('Item added to cart successfully!');
                window.location.reload(false);
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

    const handlePageChange = (event) => {
        setCurrentPage(event.target.value);
    }

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(event.target.value);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCartItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const renderCartItems = currentCartItems.map(item => (
        <tr key={item.id}>
           
            <td>{item.product.price * item.quantity}</td>
            
        </tr>
    ));


    const handleCheckout = () => {
        setLoading(true);
        fetch('http://localhost:9876/cart/checkout?userId=1', {
            method: 'POST',
            //   body: JSON.stringify({ 1}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setMessage('checked out successfully!');
                window.location.reload(false);
            })
            .then(data => {
                setLoading(false);
                console.log(data);
            })
            .catch(error => {
                setLoading(false);
                setError(error);
            });
    }


    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(cartItems.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <option key={number} value={number}>
                {number}
            </option>
        );
    });

    // const proceedToCheckout = (itemId) => {
    //     axios
    //         .post("http://localhost:9876/cart/checkout", {
    //             userId: 1,
    //             itemId: itemId
    //         })
    //         .then(response => {
    //             setMessage('Item checked out successfully!');
    //             setCartItems(cartItems.filter(item => item.id !== itemId));
    //             console.log(response);
    //         })
    //         .catch(error => console.error(error));
    // };

    const handleOrder = (product) => {
        const order = {
            userId: 1,
            productId: product.id,
            productName: product.name,
            productPrice: product.price*quantity,
            quantity: quantity

        };
        axios.post("http://localhost:9876/order/product", order)
            .then(response => {
                setMessage('Order placed successfully!');

                window.location.reload(false);
                fetchOrderHistory();
                console.log(response);
            })
            .catch(error => console.error(error));
    }



    const fetchOrderHistory = () => {
        axios.get(`http://localhost:9876/orders/history/1`)
            .then(response => {
                setOrderedProducts(response.data);
            })
            .catch(error => console.error(error));
    }
    const handleBulkOrder = () => {
             axios.post("http://localhost:9876/order/cart?cartId=1")
               .then(response => {
                 setMessage('Order placed successfully!');
                 window.location.reload(false);
                 fetchOrderHistory();
                 console.log(response);
               })
               .catch(error => console.error(error));
           }
    // const handleBulkOrder = () => {
    //     axios.post("http://localhost:9876/order/cart?cartId=1")
    //       .then(response => {
    //         setMessage('Order placed successfully!');
    //         window.location.reload(false);
    //         fetchOrderHistory();
    //         console.log(response);
    //       })
    //       .catch(error => console.error(error));
    //   }



    return (
        <div>
            <InventNav />
            <div className="container">
           
                <h1>View Products</h1>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>
                                    <form onSubmit={handleSubmit}>
                                        <input type="hidden" name="productId" value={product.id} />
                                        <input type="number" name="quantity" placeholder="Quantity" min="1" required />
                                        <button type="submit">Add to Cart</button>
                                        <button onClick={() => handleOrder(product)}>Order</button>


                                        {/* <button onClick={() => handleOrder(product)}>Order</button> */}
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h1>View Cart Items</h1>
                <button onClick={handleCheckout} disabled={loading}>
                    {loading ? 'Loading...' : 'Checkout'}
                </button><span id='hidden'>Abu</span>
                <button onClick={handleBulkOrder}>Place Bulk Order</button>
                {error && <p>{error.message}</p>}
                {message && <p className="message">{message}</p>}
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {renderCartItems} */}
                        {/* {products.map((product) => ( */}
                        {currentCartItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.product.id}</td>
                                <td>{item.product.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.product.price * item.quantity}</td>
                                <td>
                                    <button onClick={() => handleOrder(item.product)}>Order</button>





                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                {cartItems.length > 0 && (
                    <div>
                        <label>Page:</label>
                        <select value={currentPage} onChange={handlePageChange}>
                            {renderPageNumbers}
                        </select>
                        <label>Items per page:</label>
                        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </div>
                )}

                <h1>View Orders</h1>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Status</th>
                            <th>Orderded Date</th>
                            <th>Price</th>
                            <th>Name</th>
                            {/* <th>Price</th> */}



                        </tr>
                    </thead>
                    <tbody>
                        {orderedProducts.map((product, item) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.status}</td>
                                <td>{product.orderDate}</td>
                                <td>{product.totalPrice}</td>
                                {console.log(product)}
                                <td>{product.orderItems.map(function(prod){
                                    {console.log(prod)}
                                    return(prod.productId.name);
                                })}</td>


                                {/* <td>{product.price * item.quantity}</td> */}




                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link className="btn btn-outline-danger mx-2" to="/userhome">Cancel</Link>
            </div>
        </div>
    );
}

export default ViewProd;