import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';


export default function Home() {





    const [prod, setProd] = useState([])





    const navigate = useNavigate();


    useEffect(() => {
        loadProd();


    }, []);
    const loadProd = async () => {
        const result = await axios.get("http://localhost:9876/products/all")
        setProd(result.data);
    };




    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:9876/products/${id}`);
        // Reload the product list after deleting a product
        loadProd();
    };















    return (
        <div className='container'>
            <Navbar />
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


                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            prod.map((pro, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{pro.name}</td>
                                    <td>{pro.description}</td>
                                    <td>{pro.category}</td>
                                    <td>{pro.subcategory}</td>
                                    <td>{pro.stock}</td>
                                    <td>{pro.price}</td>

                                    <td>

                                        <Link className='btn btn-primary mx-2' to="/view">View</Link>
                                        <Link className="btn btn-outline-primary mx-2" z
                                            to={`/editproducts/${pro.id}`}
                                        >Edit</Link>

                                        <button className='btn btn-danger mx-2'
                                            onClick={() => deleteProduct(pro.id)}

                                        >Delete</button>

                                    </td>
                                </tr>


                            ))
                        }


                    </tbody>
                </table>
            </div>

        </div>
    )
}
