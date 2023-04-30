import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Swal from 'sweetalert2';



export default function AddProd() {

    let navigate = useNavigate()

    const [addprod, setaddProd] = useState({
        name: "",
        description: "",
        category: "",
        subcategory: "",
        stock: "",
        price: ""

    });

    const [error, setError] = useState('');

    const { name, description, category, subcategory, stock, price } = addprod

    const onInputChange = (e) => {
        setaddProd({ ...addprod, [e.target.name]: e.target.value });

    };

    const onSubmit = async (e) => {
        e.preventDefault();

        //check if the product already exits

        const products = await axios.get("http://localhost:9876/products/all");
        const existingProduct = products.data.find(
            (product) => product.name === addprod.name && product.category === addprod.category
        );
        if (existingProduct) {
            setError("Product already exits!");
            return;
        };


        try {
            await axios.post("http://localhost:9876/products", addprod)
            Swal.fire({

                position: 'top',

                icon: 'success',

                title: 'Added Successfully',

                showConfirmButton: false,

                timer: 1000

            })
            navigate("/");
        } catch (error) {
            setError('Error occured in the form');
        }



    };
    return (
        <div className="container">
            <Navbar />
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Register Products</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your product"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="Description" className="form-label">
                                Description
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your Description"
                                name="description"
                                value={description}
                                onChange={(e) => onInputChange(e)}
                            />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="Category" className="form-label">
                                Category
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your category"
                                name="category"
                                value={category}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="SubCategory" className="form-label">
                                SubCategory
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your Subcategory"
                                name="subcategory"
                                value={subcategory}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Stock" className="form-label">
                                Stock
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your Stock"
                                name="stock"
                                value={stock}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Price" className="form-label">
                                Price
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your price"
                                name="price"
                                value={price}
                                onChange={(e) => onInputChange(e)}
                            />


                        </div>
                        <button type="submit" className="btn btn-outline-primary">Submit</button>
                        <Link className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
                    </form>
                    {error && <div className='alert alert-danger'>{error}</div>}


                </div>
            </div>
        </div>
    );
}
