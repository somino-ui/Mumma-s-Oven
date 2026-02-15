import {BrowserRouter ,Routes,Route}  from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AddCategory from './pages/AddCategory';
import ManageCategory from './pages/ManageCategory';
import AddCake from './pages/AddCake';
import ManageFood from './pages/ManageFood';
import Searchpage from './pages/Searchpage';
import Register from './components/Register';
import Login from './components/Login';
import CakeDetail from './pages/CakeDetail';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import MyOrders from './pages/MyOrders';
import OrderDetails from './pages/OrderDetails';


  

function App() {
  return (
  
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/admin-login' element={<AdminLogin/>} />
          <Route path='/admin-dashboard' element={<AdminDashboard/>} />
          <Route path='/add-category' element={<AddCategory/>} />
          <Route path='/manage-category' element={<ManageCategory/>} />
          <Route path='/add-cake' element={<AddCake/>} />
          <Route path='/manage-food' element={<ManageFood/>} />
          <Route path='/search' element={<Searchpage/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/cake/:id' element={<CakeDetail/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/payment' element={<Payment/>} />
          <Route path='/my-orders' element={<MyOrders/>} />
          <Route path='/order-details/:order_number' element={<OrderDetails/>} />
          
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
