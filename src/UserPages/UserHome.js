import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import UserNavbar from '../UserLayout/UserNavbar';
import AddReview from '../UserProducts/AddReview';
import './UserHome.css';
import Swal from 'sweetalert2';

export default function UserHome() {

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

    const [prod, setProd] = useState([])

    const [selectedProduct, setSelectedProduct] = useState(null);


    const userIdmain = localStorage.getItem('userId');
    const addToCart = (productId, quantity) => {
        axios.post('http://localhost:9876/cart/addProduct', {
            productId,
            // userId: 1,
            userId: userIdmain,
            quantity
        })
            .then(response => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Added to Cart',
                    showConfirmButton: false,
                    timer: 555000
                  })

                // setMessage('Item added to cart successfully!');
                // window.location.reload(false);
                console.log(response);
            })
            .catch(error => console.error(error));
    }

    const navigate = useNavigate();

    useEffect(() => {
        loadProd();

    }, []);
    const loadProd = async () => {
        const result = await axios.get("http://localhost:9876/products/all")
        setProd(result.data);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const productId = formData.get('productId');
        const quantity = formData.get('quantity');
        addToCart(productId, quantity);
        handleOrder(productId, quantity);

    }
    
    const fetchOrderHistory = () => {
        axios.get(`http://localhost:9876/orders/history/` + userIdmain)
            .then(response => {
                setOrderedProducts(response.data);
            })
            .catch(error => console.error(error));
    }

    const handleOrder = (productId, quantity) => {
        axios.post("http://localhost:9876/order/product", {
            productId,
            // userId: 1,
            userId: userIdmain,
            quantity
        })

            .then(response => {
                setMessage('Order placed successfully!');

                window.location.reload(false);
                fetchOrderHistory();
                console.log(response);
            })
            .catch(error => console.error(error));
    }

    const handlePageChange = (event) => {
        setCurrentPage(event.target.value);
    }

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(event.target.value);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProdItems = prod.slice(indexOfFirstItem, indexOfLastItem);


    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(prod.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <option key={number} value={number}>
                {number}
            </option>
        );
    });

    return (
        <div className='container'>
            <UserNavbar />

            <div className='py-4'>

                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Category</th>
                            <th scope="col">SubCategory</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>

                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            currentProdItems.map((product, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.category}</td>
                                    <td>{product.subcategory}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.price}</td>


                                    <td><form onSubmit={handleSubmit}>
                                        <input type="hidden" name="productId" value={product.id} />
                                        <input type="number" id="karunesh" name="quantity" placeholder="Quantity" min="1" required="true" />
                                        <button style={{
                                            backgroundColor: "#64589f"
                                        }} type="submit">Add to Cart</button>
                                        <button style={{
                                            backgroundColor: "#71cede"
                                        }} type="submit" onClick={() => handleOrder(product)}>Order</button>

                                    </form></td>
                                    <td>

                                        <div>
                                            <Link style={{
                                                backgroundColor: "#25295f"
                                            }} className='btn btn-primary mx-2' to="/cart/cart">ViewCart</Link>
                                            <div class="space">
                                            </div>

                                            
                                            <Link style={{
                                                backgroundColor: "#7e7e80"
                                            }} className='btn btn-warning mx-2' to="/cart/order">ViewOrder</Link></div>
                                           
                                        <Link style={{
                                            backgroundColor: "#7e7e80"
                                        }} className='btn btn-warning mx-2' to={`/review/${product.id}`}>Review</Link>

                                        {/* <Link style={{
                                            backgroundColor: "#7e7e80"
                                        }} className='btn btn-warning mx-2' to={`/reviewlist/${product.id}`}>See review</Link> */}

                                    </td>
                                </tr>


                            ))
                        }

                    </tbody>
                </table>
                {prod.length > 0 && (
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
            </div>


        </div >

    )
}
