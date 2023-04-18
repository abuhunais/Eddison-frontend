import React from 'react'
import { Link } from 'react-router-dom'

export default function UserNavbar() {
    return (
        <div>


            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Eddison</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    
                    {/* <Link className="btn btn-outline-light"  to="/addproduct" >Add Product</Link> */}
                    {/* <Link className="btn btn-outline-light"  to="/addreview" >Add Review</Link> */}
                    <Link className="btn btn-outline-light" to="/searchproduct">Search</Link>
                    <Link className="btn btn-outline-light" to="/category">Category search</Link>.
                    <Link className="btn btn-outline-light" to="/Signin">Signout</Link>
                    {/* <Link className="btn btn-outline-light" to="/add">Add review</Link> */}
                    {/* <Link className="btn btn-outline-light" to="/addreview">Review</Link> */}
                    {/* <Link className="btn btn-outline-light" to="/searchproduct">Cart Item</Link> */}

                </div>
            </nav>
        </div>
    )
}
