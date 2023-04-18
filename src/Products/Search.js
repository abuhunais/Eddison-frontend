// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link} from 'react-router-dom';



// export default function Search() {

//     const [products, setProducts] = useState([]);
//     const [keyword, setKeyword] = useState('');
  
//     useEffect(() => {
//       loadProducts();
//     }, [keyword]);
  
//     function loadProducts() {
//       axios.get('http://localhost:9876/products/search', { params: { keyword: keyword } })
//         .then(response => {
//             const filteredProducts = response.data.filter(product =>{
//                 return product.name.toLowerCase().includes(keyword.toLowerCase()) ||
//                 product.description.toLowerCase().includes(keyword.toLowerCase());
//             });
//           setProducts(filteredProducts);
//         })
//         .catch(error => {
//           console.error(error);
//         });
//     }
  
//     function handleSearch(event) {
//       event.preventDefault();
//       loadProducts();
//     }
  
//     return (
//       <div>
//         <form onSubmit={handleSearch}>
//           <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} />
//           <button type="submit">Search</button>
//           <Link  className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
//         </form>
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Category</th>
//               <th>Subcategory</th>
//               <th>Stock</th>
//               <th>Price</th>

//             </tr>
//           </thead>
//           <tbody>
//             {products.filter(product =>{
//                 return product.name.toLowerCase().includes(keyword.toLowerCase()) || product.description.toLowerCase().includes(keyword.toLowerCase());
//             }).map(product =>
//               <tr key={product.id}>
//                 <td>{product.id}</td>
//                 <td>{product.name}</td>
//                 <td>{product.description}</td>
//                 <td>{product.category}</td>
//                 <td>{product.subcategory}</td>
//                 <td>{product.stock}</td>
//                 <td>{product.price}</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     );
//     }
