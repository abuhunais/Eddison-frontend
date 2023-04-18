import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditProd() {

     let navigate=useNavigate();

     const {id} = useParams()

    const [addprod, setaddProd]=useState({
        name:"",
        description:"",
        category:"",
        subcategory:"",
        stock:"",
        price:""

    });
    const {name,description,category,subcategory,stock,price}=addprod

    const onInputChange = (e) => {
        setaddProd({...addprod,[e.target.name]:e.target.value});

    };
    useEffect(()=>{
        loadProducts()
    }, []);

    const onSubmit = async (e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:9876/products/${id}`,addprod)
        navigate("/")


    };
    const loadProducts =async ()=>{
        const result = await axios.get(`http://localhost:9876/products/${id}`)
        setaddProd(result.data)
    };

    // const loadProducts = async () => {
    //     const response = await fetch(`http://localhost:9876/products/${id}`);
    //     const data = await response.json();
    //     console.log(data);
    //     setProducts(data);
    //   };
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Edit Products</h2>

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
                            onChange={(e)=>onInputChange(e)}
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
                            onChange={(e)=>onInputChange(e)}
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
                            onChange={(e)=>onInputChange(e)}
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
                            onChange={(e)=>onInputChange(e)}
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
                            onChange={(e)=>onInputChange(e)}
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
                            onChange={(e)=>onInputChange(e)}
                        />

                    </div>
                    <button type="submit" className="btn btn-outline-primary">Submit</button>
                    <Link  className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
                    </form>


                </div>
            </div>
        </div>
    )
}
