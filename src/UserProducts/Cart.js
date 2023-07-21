import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import InventNav from '../UserLayout/InventNav';
import './ViewUser.css';
function Cart() {
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
                // userId: 1
                userId:userIdmain
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
            // userId: 1,
            userId: userIdmain,
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

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
      let totalPrice = 0;
      for (const item of cartItems) {
        totalPrice += item.quantity * item.product.price;
      }
      setTotalPrice(totalPrice);
    }, [cartItems]);


    const handleCheckout = () => {
        setLoading(true);


        {
         
            if(totalPrice === ""){
            alert("please enter amount");
            }else{
              var options = {
                key: "rzp_test_YkQcxWbf5MBAl7",
                key_secret:"FDjuRH3cabe3I5lfD2SH4v79",
                amount: totalPrice *100,
                currency:"INR",
                name:"Eddison E-commerce",
                description:"for testing purpose",
                callback_url: "http://localhost:3000/ehome",
                handler: function(response){
                  // alert(response.razorpay_payment_id);
                  fetch('http://localhost:9876/cart/checkout?userId='+userIdmain, {
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
                },
                prefill: {
                  name:"abu",
                  email:"abu.com",
                  contact:"9766650629"
                },
                notes:{
                  address:"Razorpay Corporate office"
                },
                theme: {
                  color:"#3399cc"
                }
              };
              var pay = new window.Razorpay(options);
              pay.open();
            }}


        // fetch('http://localhost:9876/cart/checkout?userId='+userIdmain, {
        //     method: 'POST',
        //     //   body: JSON.stringify({ 1}),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        //     .then(response => {
        //         setMessage('checked out successfully!');
        //         window.location.reload(false);
        //     })
        //     .then(data => {
        //         setLoading(false);
        //         console.log(data);
        //     })
        //     .catch(error => {
        //         setLoading(false);
        //         setError(error);
        //     });
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

   
    const userIdmain = localStorage.getItem('userId');
    const handleOrder = (product) => {
        const order = {
            // userId: 1,
            userId: userIdmain,
            productId: product.id,
            productName: product.name,
            productPrice: product.price * quantity,
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

    const handleBulkOrder = () => {
        axios.post("http://localhost:9876/order/cart?cartId=1")
            .then(response => {
                setMessage('Order placed successfully!');
                handleCheckout();
                // window.location.reload(false);
                fetchOrderHistory();
                console.log(response);
            })
            .catch(error => console.error(error));
    }


    // const handleCheckout = () => {
    //     setLoading(true);
        
        














    const fetchOrderHistory = () => {
        axios.get(`http://localhost:9876/orders/history/`+userIdmain)
            .then(response => {
                setOrderedProducts(response.data);
            })
            .catch(error => console.error(error));
    }
    

    
    return (
        <div>
            <InventNav />
            <div className="container">


                <h1>View Cart Items</h1>

                <button style={{
                    backgroundColor:"#b4dcd4"}}  onClick={handleCheckout} disabled={loading}>
                    {loading ? 'Loading...' : 'Checkout'}
                </button><span id='hidden'>Abu</span><button style={{
                                            backgroundColor:"#71cede"}} onClick={handleBulkOrder}>Place Bulk Order</button>
                {error && <p>{error.message}</p>}
                {message && <p className="message">{message}</p>}
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                       
                        {currentCartItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.product.id}</td>
                                <td>{item.product.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.product.price * item.quantity}</td>
                                <td>
                                    




                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="text-center d-inline-block border rounded p-2">
  Total price: {totalPrice}
</div>
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
                )} <Link style={{
                    backgroundColor:"#25295f"}} className='btn btn-primary mx-2' to="/cart/order">ViewOrder</Link>
                <Link style={{
                     backgroundColor:"#aaaad8"}} className="btn btn-outline-danger mx-2" to="/userhome">Cancel</Link>
            </div></div>
    )
}
export default Cart;

