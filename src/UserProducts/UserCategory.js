import axios from 'axios';
import React, { useState } from 'react'
import { Link} from 'react-router-dom';
// import './UserCategory.css';

export default function UserCategory() {
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  const categoryTypes = ['Electronics','Tech', 'Clothing', 'Home', 'Beauty'];
  const subcategoryTypes = {
    Electronics: ['Mobiles', 'Laptops', 'Accessories','Mobile'],
    Clothing: ['Men', 'Women', 'Kids'],
    Home: ['Furniture', 'Appliances', 'Decor'],
    Beauty: ['Makeup', 'Skincare', 'Haircare'],
  };

  const onCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubcategory('');
  };

  const onSubcategoryChange = (e) => {
    setSubcategory(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:9876/products/${category}/${subcategory}`);
      setProducts(response.data);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Error occurred while fetching products.');
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Search Products by Category and Subcategory</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb-3'>
              <label htmlFor='category' className='form-label'>
                Category
              </label>
              <select
                className='form-select'
                aria-label='Select category'
                value={category}
                onChange={(e) => onCategoryChange(e)}
              >
                <option value=''>Select category</option>
                {categoryTypes.map((categoryType) => (
                  <option key={categoryType} value={categoryType}>
                    {categoryType}
                  </option>
                ))}
              </select>
            </div>
            {category && (
              <div className='mb-3'>
                <label htmlFor='subcategory' className='form-label'>
                  Subcategory
                </label>
                <select
                  className='form-select'
                  aria-label='Select subcategory'
                  value={subcategory}
                  onChange={(e) => onSubcategoryChange(e)}
                >
                  <option value=''>Select subcategory</option>
                  {subcategoryTypes[category].map((subcategoryType) => (
                    <option key={subcategoryType} value={subcategoryType}>
                      {subcategoryType}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button type='submit' className='btn btn-primary' disabled={!subcategory}>
              Search
            </button>
            <Link  className="btn btn-outline-danger mx-2" to="/UserHome">Cancel</Link>
          </form>
          {error && <div className='alert alert-danger mt-3'>{error}</div>}
          {products.length > 0 && (
            <div className='mt-3'>
              <h4>Results:</h4>
              <table className='table table-striped'>
                <thead>
                  <tr>
                    <th scope='col'>Product Name</th>
                    <th scope='col'>Description</th>
                    <th scope='col'>Price</th>
                <th scope='col'>Category</th>
                <th scope='col'>Subcategory</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.subcategory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
</div>
);
}