import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import Navbar from './layout/Navbar';
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import AddProd from './Products/AddProd';
import EditProd from './Products/EditProd';
// import Search from './Products/Search';
// import Category from './Products/Category';
// import UserOrderlist from './UserProducts/UserOrderlist';
// import AddReview from'./Products/AddReview';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Admin from './Pages/Admin';
import UserSearch from './UserProducts/UserSearch';
import UserHome from './UserPages/UserHome';
import UserCategory from './UserProducts/UserCategory';
import UserOrderlist from './UserProducts/UserOrderlist';
import InventReport from './UserProducts/InventReport';
import AddReview from './UserProducts/AddReview';
import AddToCartForm from './UserProducts/AddToCartForm';
import ViewProd from './Products/ViewProd';
import ProductDetails from './Products/ProductDetails';
import ViewUser from './UserProducts/ViewUser';
import OrderedList from './UserProducts/UserOrderlist';
import Cart from './UserProducts/Cart';
import Order from './UserProducts/Order';
import SalesReport from './Products/SalesReport';
import ReviewForm from './UserProducts/ReviewForm';
import ReviewList from './UserProducts/ReviewList';


import SocialMedia from './Pages/SocialMedia';



function App() {





  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/register" element={<Signup />} />
          <Route exact path="/Signin" element={<Signin />} />
          <Route exact path="/Admin" element={<Admin />} />
          <Route exact path="/Social" element={<SocialMedia />} />
        </Routes>

        {/* <Navbar /> */}






        {/* <Sidebar> */}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/addproduct" element={<AddProd />} />
            {/* <Route exact path="/add" element={<AddReview />} /> */}

            <Route exact path="/Inventreport" element={<InventReport />} />
            <Route exact path="/sales" element={<SalesReport />} />
            {/* <Route exact path="/addreview" element={<AddReview/>}/> */}
            {/* <Route exact path="/addcart/:productId" element={<AddToCart/>}/> */}
            <Route exact path="/searchproduct" element={<UserSearch />} />
            {/* <Route exact path="/addreview" element={<AddReview/>}/> */}
            {/* <Route exactpath="/orders" element={OrderList} /> */}
            {/* <Route path="/" exact component={() => <Home history={history} />} /> */}
            <Route exact path="/category" element={<UserCategory />} />
            <Route exact path="/editproducts/:id" element={<EditProd />} />
            <Route exact path="/products/:id" element={<ProductDetails />} />
            <Route exact path="/order-list" element={<UserOrderlist />} />
            <Route exact path="/userhome" element={<UserHome />} />
            <Route exact path="/cart" element={<AddToCartForm />} />
            <Route exact path="/cart" element={<AddToCartForm />} />
            <Route exact path="/view" element={<ViewProd />} />
            <Route exact path="/UserView" element={<ViewUser />} />
            <Route exact path="/ordered-products" component={<OrderedList />} />
            <Route exact path="/cart/cart" element={<Cart />} />
            <Route exact path="/cart/order" element={< Order />} />
            <Route exact path="/review/:id" element={< ReviewForm />} />
            <Route exact path="/reviewlist/:id" element={< ReviewList />} />

            {/* <Route path="/products/:id" render={(props) => <AddToCartForm {...props} product={products.find(product => product.id === parseInt(props.match.params.id))} />} /> */}







          </Routes>
          {/* </Sidebar> */}



      </Router>



    </div>
  );
}

export default App;
