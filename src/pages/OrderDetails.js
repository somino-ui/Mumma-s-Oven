import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import {useNavigate ,useParams} from "react-router-dom"

const OrderDetails = () => {
    

    const userId = localStorage.getItem("userId");
        const [orderItems, setOrderItems] = useState([]);
        const [orderAddress, setOrderAddress] = useState(null);
        const [Total,setTotal] = useState(0);
        const navigate = useNavigate();
    
        const { order_number}= useParams();
          useEffect(() => {
            if(!userId){
                navigate('/login');
                return;
            }
            fetch(`http://127.0.0.1:8000/api/orders/by_order_number/${order_number}/`)
              .then((response) => response.json())
              .then((data) => {
                  setOrderItems(data);
                  const totalAmount = data.reduce(( sum,item)=> sum + item.cake.item_price * item.quantity,0 );
            setTotal(totalAmount);
                    
              })


              fetch(`http://127.0.0.1:8000/api/orders/order_address/${order_number}/`)
              .then((response) => response.json())
              .then((data) => {
                  setOrderAddress(data);
                          })
        
            }, [order_number]);


  return (
    <PublicLayout>
      <div className="py-5 container ">
          <h3 className="mb-4 text-primary "> <i className="fas fa-receipt me-2"></i>  Order # {order_number} Details </h3>

          <div className="row"> 
            <div className="col-md-8"> 
                  {orderItems.map((item,index)=>(
                    <div key={index} className="card mb-3 shadow-sm border-0">
                         <div className="row"> 
                    <div className=" col-md-4">  
                         <img src={`http://127.0.0.1:8000${item.cake.image}`} alt="#"
                                                className="img-fluid rounded-start" style={{minHeight:'150px' ,height:'250px',width:'100%'}}/>
                    </div>
                     <div className=" col-md-8">  
                              <h5>  {item.cake.item_name}  ({item.cake.item_quantity})</h5>
                              <p> {item.cake.item_description}</p>
                              <p> <strong>Price:</strong> ₹{item.cake.item_price} </p>
                              <p> <strong>Quantity:</strong> ₹{item.quantity} </p>
                    </div>

                    </div>
                  </div>
                  ) )}
             </div>

             <div className="col-md-4"> 

            </div>
          </div>
      </div>
      </PublicLayout>
  )
}

export default OrderDetails;
